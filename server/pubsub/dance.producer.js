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

    let msgOrder = 1;
    setInterval(() => {
      // var date = new Date();
      // date.setMilliseconds(Math.random() * 999);
      // let msg1 = JSON.stringify({
      //   index: msgOrder,
      //   time: date,
      //   move: danceMove[Math.ceil(Math.random() * 10) - 1],
      //   id: 1, //device id
      // });
      // channel.publish(EXCHANGE, 'dance', Buffer.from(msg1), {
      //   persistent: true
      // });
      var date1 = new Date();
      date1.setMilliseconds(Math.random() * 999);
      let msg2 = JSON.stringify({
        index: msgOrder,
        time: date1,
        move: danceMove[Math.ceil(Math.random() * 10) - 1],
        id: 2, //device id
      });
      channel.publish(EXCHANGE, 'dance', Buffer.from(msg2), {
        persistent: true
      });
      var date2 = new Date();
      date2.setMilliseconds(Math.random() * 999);
      let msg3 = JSON.stringify({
        index: msgOrder,
        time: date2,
        move: danceMove[Math.ceil(Math.random() * 10) - 1],
        id: 3, //device id
      });
      channel.publish(EXCHANGE, 'dance', Buffer.from(msg3), {
        persistent: true
      });
      msgOrder += 1;
    }, 1500);
  });
  // setTimeout(function() {
  //   connection.close();
  //   process.exit(0)
  // }, 10000);
})