const app = require('./index');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

module.exports = io;