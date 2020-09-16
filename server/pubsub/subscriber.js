#!/usr/bin/env node
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
          io.emit(data_type, JSON.parse(msg.content));
          //send to postgresql db
          channel.ack(msg);
          console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        }, {
          noAck: false
        });
      });
      // const QUEUE = 'test'
      // channel.assertQueue(QUEUE, {
      //   durable: true
      // });
      // channel.prefetch(1); //won't get assigned a task if already preoccupied with one
      // //receive message
      // channel.consume(QUEUE, (msg) => {
      //   var secs = msg.content.toString().split('.').length - 1;
      //   setTimeout(() => {
      //     console.log("Task done");
      //     channel.ack(msg);//allow message to be deleted from queue once task is complete
      //   }, secs * 1000);
      //   console.log(`Message received: ${msg.content}`);
      // }, {
      //   noAck: false
      // })
    })
  })
}

module.exports = connectRabbitMQ;
