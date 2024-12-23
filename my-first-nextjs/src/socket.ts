"use strict";

import express from 'express';
import { Server } from 'socket.io';
import next from 'next';

// Create the Next.js app instance
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the Next.js app
app.prepare().then(() => {
    const server = express();

    // Create an HTTP server using Express and integrate with Socket.IO
    const io = new Server(server);

    // Handle WebSocket connections
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle incoming message event
        socket.on('sendMessage', (message: string) => {
            console.log('Message received:', message);
            // Broadcast the message to all connected clients
            io.emit('receiveMessage', message);
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    // Handle all Next.js routes with Next.js request handler
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start the server on port 3000
    server.listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
});
