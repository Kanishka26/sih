
import { Server } from 'socket.io';
import { chatWithDietician, type ChatWithDieticianInput } from './ai/flows/chat-with-dietician';

export const initializeSocketIO = (httpServer: any) => {
    const io = new Server(httpServer, {
        path: "/api/socket_io",
        addTrailingSlash: false,
    });

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

    return io;
};
