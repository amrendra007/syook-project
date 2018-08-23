const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const moment = require('moment');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const dataIntegrityChecker = require('./helper/dataIntegrityChecker');

// Database conn
mongoose.connect(`${process.env.CONN_STRING}`, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err);
    });

io.on('connection', (socket) => {
    console.log('client connected');

    socket.on('data', (encryptedStr) => {
        dataIntegrityChecker(encryptedStr.split('|'))
            .then((data) => {
                console.log(data);
            });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server runnning');
});
