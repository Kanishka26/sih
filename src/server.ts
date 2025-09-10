
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import { chatWithDietician, type ChatWithDieticianInput } from './ai/flows/chat-with-dietician';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 9002;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on('sendMessage', async (data: ChatWithDieticianInput & {history: any[]}) => {
        const stream = await chatWithDietician(data);
        
        let response = '';
        for await (const chunk of stream) {
            response += chunk;
            socket.emit('chunk', { chunk });
        }
        socket.emit('chunkEnd');
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
