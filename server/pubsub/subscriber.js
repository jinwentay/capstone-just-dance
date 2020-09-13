const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connError, connection) => {
  if (connError) {
    throw connError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    const QUEUE = 'test'
    channel.assertQueue(QUEUE, {
      durable: true
    });
    channel.prefetch(1); //won't get assigned a task if already preoccupied with one
    //receive message
    channel.consume(QUEUE, (msg) => {
      var secs = msg.content.toString().split('.').length - 1;
      setTimeout(() => {
        console.log("Task done");
        channel.ack(msg);//allow message to be deleted from queue once task is complete
      }, secs * 1000);
      console.log(`Message received: ${msg.content}`);
    }, {
      noAck: false
    })
  })
})