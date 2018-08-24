const socket = require('socket.io-client')('http://localhost:3000');
const encryptedStrGen = require('./helper/encryptedStrGen');

// emmiting each encrypted str every 10s
socket.on('connect', () => {
  console.log('connected to server');

  setInterval(() => {
    encryptedStrGen()
      .then(finalString => {
        socket.emit('data', finalString);
      })
      .catch(err => {
        console.log(err);
      });
  }, 10000);
});
