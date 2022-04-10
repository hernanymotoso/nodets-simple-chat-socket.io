import express from 'express';
import path from 'path';
import http from 'http';

const app = express();

const server = http.createServer(app);

// app.get('/', (request, response) => response.json({ message: 'Hello world' }));

server.listen(3333, () => {
  console.log('Server started on port 3333 !');
});

app.use(express.static(path.join(__dirname, '../public')));
