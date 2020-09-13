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
    channel.assertQueue(QUEUE, {durable: true});

    let msg = process.argv.slice(2).join('') || "Hello World";
    channel.sendToQueue(QUEUE, Buffer.from(msg), {
      persistent: true
    });
    console.log(`Message sent ${QUEUE}: ${msg}`);
  })
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
})