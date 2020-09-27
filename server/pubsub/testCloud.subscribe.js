#!/usr/bin/env node
const amqp = require('amqplib/callback_api');
var amqpConn = null;
function connectRabbitMQ() {
  amqp.connect('amqps://dwefosfy:tG0-C5PgWUQPfIEYySgBP1se9ISS0P5T@peacock.rmq.cloudamqp.com/dwefosfy', (err, conn) => {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(connectRabbitMQ, 1000);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      console.error("[AMQP] reconnecting");
      return setTimeout(connectRabbitMQ, 1000);
    });
    console.log("[AMQP] connected");
    amqpConn = conn;
    startWorker();
  })
}

function startWorker() {
  amqpConn.createChannel((err, ch) => {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });

    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    ch.prefetch(10);
    ch.assertQueue("hello", { durable: false }, function(err, _ok) {
      if (closeOnErr(err)) return;
      ch.consume("hello", processMsg, { noAck: false });
      console.log("Worker is started");
    });

    function processMsg(msg) {
      work(msg, function(ok) {
        try {
          if (ok)
            ch.ack(msg);
          else
            ch.reject(msg, true);
        } catch (e) {
          closeOnErr(e);
        }
      });
    }
  })
}

function work(msg, cb) {
  console.log("Got msg ", msg.content.toString());
  cb(true);
}

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

connectRabbitMQ();