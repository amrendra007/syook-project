const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const moment = require('moment');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// requiring files
const dataIntegrityChecker = require('./helper/dataIntegrityChecker');
const Person = require('./models/person');
const personRoutes = require('./routes/main');

// app configuration
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use('/', personRoutes);

// Database conn
mongoose
  .connect(
    `${process.env.CONN_STRING}`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to db');
  })
  .catch(err => {
    console.log(err);
  });

io.on('connection', socket => {
  console.log('client connected');

  socket.on('data', encryptedStr => {
    console.log(encryptedStr);
    dataIntegrityChecker(encryptedStr.split('|')).then(data => {
      data.map(async item => {
        const momentIns = moment();
        const updatedDoc = await Person.findOneAndUpdate(
          {
            $and: [{ name: item.name }, { time: momentIns.second(0).format() }],
          },
          { $push: { stream: item } },
          { upsert: true, new: true }
        ).exec();
        console.log(updatedDoc);
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server runnning');
});
