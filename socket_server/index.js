const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
require('dotenv').config();
var cors = require('./config/cors');

const io = new Server(server, cors);

server.listen(process.env.SOCKET_SERVER_PORT, () => {
  console.log('sever start', process.env.SOCKET_SERVER_PORT);
});

const getClientRoom = () => {
  let index = 0;
  console.log('getClientRoom', index);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (
      !io.sockets.adapter.rooms[index] ||
      io.sockets.adapter.rooms[index].length < 2
    ) {
      return index;
    }
    index++;
  }
};

io.on('connection', (socket) => {
  console.log('A client connected');
  /**
   * Receive room from client -> create room in socket
   */
  socket.on('joinRoom', function (data) {
    console.log('joinRoom', data);
    const clientRoom = getClientRoom();
    socket.join(clientRoom);
    if (data.kind == 1) {
      socket.chatRoom = clientRoom;
    }
  });
  /**
   * Listen signal from client
   */
  socket.on('sendSignal', function (data) {
    console.log('sendSignal', data);
    if (data.kind == 1) {
      io.to(socket.chatRoom).emit('signal', data);
    }
  });
  /**
   * Receive room user socket leave from client
   */
  socket.on('leaveRoom', function (data) {
    socket.leave(data.room);
  });
});
