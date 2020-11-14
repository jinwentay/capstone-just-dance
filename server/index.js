const express = require('express');
const redis = require('redis');
const bodyParser = require("body-parser");
const cors = require('cors');

//connect express
const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;
const port_redis = 6379;

//connect redis
const redis_client = redis.createClient(port_redis);
exports.redis_client = redis_client;


app.use(cors());
app.use(express.json());

//connect socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//connect rabbitMQ subscriber
//fake data subscriber
// var connectFakeRabbitMQ = require('./pubsub/subscriber'); 
//real data subscriber
var connectRabbitMQ = require('./pubsub/testCloud.subscribe');

//connect routes
const usersRouter = require('./routes/users');
app.use('/', usersRouter);

const danceRouter = require('./routes/danceSession');
app.use('/', danceRouter);

const offlineRouter = require('./routes/offline');
app.use('/', offlineRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let socketIO;
io.on('connection', (socket) => {
  socketIO = socket;
  socket.emit('hello', 'socket is connected');
  socket.on('user_joined', (msg) => {
    console.log(msg.username, msg.id);
    io.emit('update_joined', msg);
    redis_client.HSET('session', `device${msg.deviceId}`, msg.id);
  })
  socket.on('stop_session', (msg) => {
    console.log("SESSION STOPPED", msg);
    io.emit('session_stopped', msg);
  })
  socket.on('restart_session', (msg) => {
    console.log("SESSION STOPPED", msg);
    io.emit('session_restarted', msg);
  })
  socket.on('created_session', (msg) => {
    io.emit('new_sessions', msg);
  })
})
connectRabbitMQ(io);
//streaming fake data
// connectFakeRabbitMQ(io, 'position');
// connectFakeRabbitMQ(io, 'dance');
// connectFakeRabbitMQ(io, 'correct_position');

exports.app = app;
exports.io = io;
