#!/usr/bin/env node
var app = require('../index');
var redis = app.redis_client;
var { DateTime } = require('luxon');

const amqp = require('amqplib/callback_api');
function connectRabbitMQ(io, data_type) {
  amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
      throw connError;
    }
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }
      const exchange = 'logs';
      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
      }, function(error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        channel.bindQueue(q.queue, exchange, data_type);
        channel.prefetch(1);
        channel.consume(q.queue, function(msg) {
          let data = JSON.parse(msg.content);
          io.emit(data_type, data);

          //save in redis
          console.log('redis msg', data);
          if (data_type === 'dance') {
            data['time'] = DateTime.fromJSDate(new Date(data.time)).toFormat('yyyy-MM-dd hh:mm:ss.SSS');
          } else {
            data['time'] = DateTime.fromJSDate(new Date(data.time)).toFormat('yyyy-MM-dd hh:mm:ss');
          }
          
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
                data['value'].split(' ').forEach((id, index) => {
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
          channel.ack(msg);
        }, {
          noAck: false
        });
      });
    })
  })
}

module.exports = connectRabbitMQ;
