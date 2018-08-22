const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const dataIntegrityChecker = require('./helper/dataIntegrityChecker');

io.on('connection', (socket) => {
    console.log('client connected');

    socket.on('data', (encryptedStr) => {
        dataIntegrityChecker(encryptedStr.split('|'));
        // console.log(encryptedStr);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server runnning');
});
