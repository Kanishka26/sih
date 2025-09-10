
import { initializeSocketIO } from '@/server';
import { Server } from 'http';

export const GET = (req: any, res: any) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.IO");
        const httpServer = res.socket.server as any;
        initializeSocketIO(httpServer);
        res.socket.server.io = true;
    }
    res.end();
};
