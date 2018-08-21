const net = require('net');

const encryptedStrGen = require('./helper/encryptedStrGen');

const server = net.createServer((socket) => {
    console.log('client connected');
    socket.setEncoding('utf8');

    // socket.on('data', (chunk) => {
    //     // socket.write(chunk,'utf8');
    //     console.log(chunk);
    // });

    // socket.on('end', () => {
    //     console.log('disconnected');
    // });

    function ping() {
        encryptedStrGen()
            .then((finalString) => {
                // console.log(finalString);
                socket.write(finalString, 'utf8');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    setInterval(ping, 1000);
});

server.listen(5000, () => {
    console.log('server started');
});
