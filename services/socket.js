import {Server as SocketServer} from 'socket.io';

class Socket {
    static init = (server) => {
        this.io = new SocketServer(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        this.io.on('connection', (client) => {
            console.log('Client connected:', client.id);

            client.on('disconnect', () => {
                console.log('Client disconnected:', client.id);
            });
        });
    };

    static emit = (event, data) => {
        try {
            this.io.emit(event, data);
        } catch (e) {
            console.error('Error while emitting event:', e);
        }
    };
}

export default Socket;
