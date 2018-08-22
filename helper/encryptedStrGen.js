const bcrypt = require('bcrypt');
const util = require('./util');

const saltRounds = 10;

module.exports = function () {
    const encrArray = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 10; i += 1) {
            const obj = util.objCreator();

            // Hashing to add secret_key
            bcrypt.hash(JSON.stringify(obj), saltRounds)
                .then((hash) => {
                    obj.secretKey = hash;

                    // Encrypting whole stringified obj
                    const raw = util.encryptor(JSON.stringify(obj));
                    encrArray.push(raw);
                    if (encrArray.length === 10) {
                        resolve(encrArray.join('|'));
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        }
    });
};
