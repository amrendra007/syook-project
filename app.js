const bcrypt = require('bcrypt');
const util = require('./util');

const saltRounds = 10;
const encrArray = [];

for (let i = 0; i < 10; i += 1) {
    const obj = util.objCreator();
    const stringifiedObj = JSON.stringify(obj);

    bcrypt.hash(stringifiedObj, saltRounds)
        .then((hash) => {
            obj.secret_key = hash;
            const raw = util.encryptor(stringifiedObj);
            encrArray.push(raw);
            console.log(encrArray);
        }).then(() => {
            console.log('done');
        })
        .catch((err) => {
            console.log(err);
        });
}
