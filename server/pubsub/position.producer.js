#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connError, connection) => {
  if (connError) {
    throw connError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    const EXCHANGE = 'logs';
    channel.assertExchange(EXCHANGE, 'topic', {
      durable: false
    });

    setInterval(() => {
      let msg1 = JSON.stringify({
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 1, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg1), {
        persistent: true
      });
      let msg2 = JSON.stringify({
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 2, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg2), {
        persistent: true
      });
      let msg3 = JSON.stringify({
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 3, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg3), {
        persistent: true
      });
    }, 6000);
  });
  // setTimeout(function() {
  //   connection.close();
  //   process.exit(0)
  // }, 10000);
})