import express from 'express';
import path from 'path';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server);
// app.get('/', (request, response) => response.json({ message: 'Hello world' }));

let connectedUsers = [] as string[];

io.on('connection', (socket: Socket) => {
  console.log('Connectado novo');

  socket.on('join-request', userName => {
    // eslint-disable-next-line no-param-reassign
    socket.userName = userName;
    connectedUsers.push(userName);
    console.log(connectedUsers);

    socket.emit('user-ok', connectedUsers);
    socket.broadcast.emit('list-update', {
      joined: userName,
      list: connectedUsers,
    });
  });

  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter(user => user !== socket.userName);
    console.log(connectedUsers);

    socket.broadcast.emit('list-update', {
      left: socket.userName,
      list: connectedUsers,
    });
  });

  socket.on('send-msg', txt => {
    const obj = {
      userName: socket.userName,
      message: txt,
    };

    // socket.emit('show-msg', obj);
    socket.broadcast.emit('show-msg', obj);
  });
});

server.listen(3333, () => {
  console.log('Server started on port 3333 !');
});

app.use(express.static(path.join(__dirname, '../public')));
