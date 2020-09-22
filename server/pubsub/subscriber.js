#!/usr/bin/env node
var app = require('../index');
var redis = app.redis_client;
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
          //send to postgresql db
          console.log('redis msg', data.id);
          redis.HMGET('session', 'id', `device${data.id}`, 'isStart', function (err, reply) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('Start session: ', reply[2]);
            if (reply[2] === 'true') {
              console.log('Redis session', reply);
              data['sid'] = Number(reply[0]);
              data['id'] = reply[1];
              console.log('Redis modified data', data);
              redis.RPUSH(data_type, JSON.stringify(data));
            }
          });
          // }
          channel.ack(msg);
          // console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        }, {
          noAck: false
        });
      });
    })
  })
}

module.exports = connectRabbitMQ;
