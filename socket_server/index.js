const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
require('dotenv').config();
var cors = require('./config/cors');
const { SOCKET } = require('./config/constant');

const io = new Server(server, cors);

server.listen(process.env.VUE_APP_SOCKETIO_PORT, () => {
  console.log('sever start', process.env.VUE_APP_SOCKETIO_PORT);
});

const getClientRoom = () => {
  let index = 0;
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
  /**
   * Receive room from client -> create room in socket
   */
  socket.on('joinRoom', function (data) {
    const clientRoom = getClientRoom();
    socket.join(clientRoom);
    if (data.kind == SOCKET.COMMENT) {
      socket.commentRoom = clientRoom;
    } else if (data.kind == SOCKET.REPLY_COMMENT) {
      socket.replyCommentRoom = clientRoom;
    } else if (data.kind == SOCKET.NOTIFY_BLOG) {
      socket.notifyBlog = clientRoom;
    } else if (data.kind == SOCKET.REPORT) {
      socket.report = clientRoom;
    }
  });
  /**
   * Listen signal from client
   */
  socket.on('sendSignal', function (data) {
    if (data.kind == SOCKET.COMMENT) {
      io.to(socket.commentRoom).emit('signal', data);
    } else if (data.kind == SOCKET.REPLY_COMMENT) {
      io.to(socket.replyCommentRoom).emit('reply', data);
    } else if (data.kind == SOCKET.REPLY_COMMENT) {
      io.to(socket.notifyBlog).emit('notify', data);
    } else if (data.kind == SOCKET.REPORT) {
      io.to(socket.report).emit('report', data);
    }
  });
  /**
   * Receive room user socket leave from client
   */
  socket.on('leaveRoom', function (data) {
    socket.leave(data.room);
  });
});
