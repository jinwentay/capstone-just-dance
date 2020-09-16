const express = require('express');
const cors = require('cors');
var connectRabbitMQ = require('./pubsub/subscriber');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//connect routes
const usersRouter = require('./routes/users');
app.use('/', usersRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let socketIO;
io.on('connection', (socket) => {
  socketIO = socket;
  socket.emit('hello', 'socket is connected');
  connectRabbitMQ(socket, 'accelerometer');
  connectRabbitMQ(socket, 'position');
  connectRabbitMQ(socket, 'dance');
})

exports.app = app;
exports.io = io;
// exports.socket = socketIO;
