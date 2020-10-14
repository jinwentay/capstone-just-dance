#!/usr/bin/env node
var app = require('../index');
var redis = app.redis_client;
var { DateTime } = require('luxon');

const amqp = require('amqplib/callback_api');
var amqpConn = null;
function connectRabbitMQ(io) {
  amqp.connect('amqps://dwefosfy:tG0-C5PgWUQPfIEYySgBP1se9ISS0P5T@peacock.rmq.cloudamqp.com/dwefosfy', (err, conn) => {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(connectRabbitMQ, 1000);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      console.error("[AMQP] reconnecting");
      return setTimeout(connectRabbitMQ, 1000);
    });
    console.log("[AMQP] connected");
    amqpConn = conn;
    startWorker(io);
  })
}

const rkey = ['position', 'correct_position', 'dance'];
function startWorker(io) {
  amqpConn.createChannel((err, ch) => {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });

    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    ch.prefetch(10);
    
    const exchange = 'direct_logs';
    ch.assertExchange(exchange, 'direct', { durable: false });
    ch.assertQueue("", { exclusive: true }, function(err, q) {
      if (closeOnErr(err)) return;
      rkey.forEach((key) => {
        ch.bindQueue(q.queue, exchange, key);
      });
      // ch.consume(q.queue, function(msg) {
      //   console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      // }, {
      //   noAck: true
      // });
      ch.consume(q.queue, function(msg) {
        let data = JSON.parse(msg.content);
        let data_type = msg.fields.routingKey;
        if (data_type === 'dance') {
          if (data['move'] === 'rest') {
            data['time'] = new Date(); 
          } else {
            data['time'] = new Date(Number(data.time));
            console.log("raw time: ", data['time']);
          }
          if (data.id !== 1) {
            data['time'].setMilliseconds(Math.random() * 999);
          }
        }
        io.emit(data_type, data);

        //save in redis
        console.log('redis msg', data_type, data);
        if (data_type === 'dance') {
          data['time'] = DateTime.fromJSDate(data.time).toFormat('yyyy-MM-dd hh:mm:ss.SSS');
        } else {
          data['time'] = DateTime.fromJSDate(data.time).toFormat('yyyy-MM-dd hh:mm:ss');
        }
        // console.log('datatime', data['time']);
        
        redis.HMGET('session', 'id', `device${data.id}`, 'isStart', function (err, reply) {
          if (err) {
            console.log(err);
            return;
          }
          // console.log('Start session: ', reply[2]);
          if (reply[2] === 'true') {
            console.log('Redis session', reply);
            data['sid'] = Number(reply[0]);
            if (data_type !== 'correct_position') {
              data['id'] = reply[1];
              console.log('Redis modified data', data);
              if (data['sid'] && data['id'])
                redis.RPUSH(data_type, JSON.stringify(data));
            } else {
              data['value'].forEach((id, index) => {
                redis.HGET('session', `device${id}`, function (err, res) {
                  let correctPosition = {
                    id: res,
                    sid: data['sid'],
                    index: data['index'],
                    value: index + 1,
                  }
                  console.log('Storing correct position: ', correctPosition);
                  redis.RPUSH(data_type, JSON.stringify(correctPosition));
                })
              })
            }
          }
        });
        //acknowledge that message has been processed
        ch.ack(msg);
      }, {
        noAck: false
      });
      // ch.consume(q.queue, processMsg, { noAck: false });
      console.log("Worker is started");
    });

    function processMsg(msg) {
      work(msg, function(ok) {
        try {
          if (ok)
            ch.ack(msg);
          else
            ch.reject(msg, true);
        } catch (e) {
          closeOnErr(e);
        }
      });
    }
  })
}

function work(msg, cb) {
  console.log("Got msg ", msg.content.toString());
  cb(true);
}

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}
// connectRabbitMQ();
module.exports = connectRabbitMQ;