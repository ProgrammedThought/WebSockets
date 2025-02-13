import express, { Application } from "express"
import { Socket } from "socket.io";


// create express app
const app: Application = express();

// Create Http server
const http = require('http').createServer(app);

// Import socket io
const io  = require('socket.io')(http, {
    cors:{origin:'*'}
});

// Accept connection from a client
io.on('connection', (socket: Socket) =>{
    console.log('a user connected');

    // Set up a socket with a custom event named message
    socket.on('message', (message: string) => {
        console.log(message);
        
        // re-emit message to all users as it is a group chat
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
    })
})

// Server should listen on a specific port
http.listen(8080, () => console.log('listening on http://localhost:8080'))



