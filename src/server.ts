import express from 'express';
import path from 'path';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server);
// app.get('/', (request, response) => response.json({ message: 'Hello world' }));

io.on('connection', (socket: Socket) => {
  console.log('Connectado novo');
});

server.listen(3333, () => {
  console.log('Server started on port 3333 !');
});

app.use(express.static(path.join(__dirname, '../public')));
