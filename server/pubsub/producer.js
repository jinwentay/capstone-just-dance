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
      let msg = JSON.stringify({
        sensor: 'accelerometer',
        time: Date.now(),
        value: Math.ceil(Math.random() * 64),
        id: 1,
        session: 1
      });
      channel.publish(EXCHANGE, 'accelerometer', Buffer.from(msg), {
        persistent: true
      });
      console.log(`Message sent ${EXCHANGE}: ${msg}`);
    }, 100);
    
    // const QUEUE = 'test'
    // channel.assertQueue(QUEUE, {durable: true});

    // let msg = process.argv.slice(2).join('') || "Hello World";
    // channel.sendToQueue(QUEUE, Buffer.from(msg), {
    //   persistent: true
    // });
  });
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 10000);
})