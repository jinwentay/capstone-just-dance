#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

const danceMove = ['zigzag', 'elbow', 'hair', 'pushback', 'rocket', 'scarecrow', 'shrug', 'windows', 'waving', 'rest'];
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
        move: danceMove[Math.ceil(Math.random() * 10) - 1],
        id: 1, //device id
      });
      channel.publish(EXCHANGE, 'dance', Buffer.from(msg1), {
        persistent: true
      });
      let msg2 = JSON.stringify({
        time: new Date(),
        move: danceMove[Math.ceil(Math.random() * 10) - 1],
        id: 2, //device id
      });
      channel.publish(EXCHANGE, 'dance', Buffer.from(msg2), {
        persistent: true
      });
      let msg3 = JSON.stringify({
        time: new Date(),
        move: danceMove[Math.ceil(Math.random() * 10) - 1],
        id: 3, //device id
      });
      channel.publish(EXCHANGE, 'dance', Buffer.from(msg3), {
        persistent: true
      });
    }, 3000);
  });
  // setTimeout(function() {
  //   connection.close();
  //   process.exit(0)
  // }, 10000);
})