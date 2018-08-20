const bcrypt = require('bcrypt');

const saltRounds = 10;

const obj = {
    name: 'Ravizeem',
    origin: 'Delhi',
    destination: 'Mumbai',
};

bcrypt.hash(`name:${obj.name}${obj.origin}${obj.destination}`, saltRounds)
    .then((hash) => {
        // console.log(hash);
        obj.secret_key = hash;
        console.log(obj);
    })
    .catch((err) => {
        console.log(err);
    });
