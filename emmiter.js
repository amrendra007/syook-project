const socket = require('socket.io-client')('http://localhost:3000');
const encryptedStrGen = require('./helper/encryptedStrGen');

socket.on('connect', () => {
    console.log('connected to server');

    // setInterval(() => {
    encryptedStrGen()
        .then((finalString) => {
            socket.emit('data', finalString);
        })
        .catch((err) => {
            console.log(err);
        });
    // }, 1000);
});
