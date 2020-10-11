#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

const positions = [
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,2,1],
  [3,1,2]
];
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
      let msg1 = JSON.stringify({
        index: msgOrder,
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 1, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg1), {
        persistent: true
      });
      let msg2 = JSON.stringify({
        index: msgOrder,
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 2, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg2), {
        persistent: true
      });
      let msg3 = JSON.stringify({
        index: msgOrder,
        time: new Date(),
        value: Math.ceil(Math.random() * 3),
        id: 3, //device id
      });
      channel.publish(EXCHANGE, 'position', Buffer.from(msg3), {
        persistent: true
      });
      let msg4 = JSON.stringify({
        time: new Date(),
        value: positions[Math.ceil(Math.random() * 3) - 1],
        index: msgOrder, 
      });
      channel.publish(EXCHANGE, 'correct_position', Buffer.from(msg4), {
        persistent: true
      });
      msgOrder += 1;
    }, 3000);

    // let order = 1;
    // setInterval(() => {
    //   let msg = JSON.stringify({
    //     time: new Date(),
    //     value: positions[Math.ceil(Math.random() * 3) - 1],
    //     index: order, //device id
    //   });
    //   channel.publish(EXCHANGE, 'correct_position', Buffer.from(msg), {
    //     persistent: true
    //   });
    //   order += 1;
    // }, 6500);
  });
  // setTimeout(function() {
  //   connection.close();
  //   process.exit(0)
  // }, 30000);
})