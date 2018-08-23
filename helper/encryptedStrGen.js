const bcrypt = require('bcrypt');
const util = require('./util');

const saltRounds = 10;

/*  This function creates obj, add secretKey to it and encrypt the obj
    push that obj to array and join array using '|' form one main encrypted str
*/
module.exports = function () {
    const encrArray = [];
    return new Promise((resolve, reject) => {
        // const n = util.random(49, 499);
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
