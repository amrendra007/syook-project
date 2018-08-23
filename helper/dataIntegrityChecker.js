const bcrypt = require('bcrypt');
const moment = require('moment');
const util = require('./util');

module.exports = function (arrayOfEncrStr) {
    // console.log(arrayOfEncrStr);
    const array = [];
    const lengthOfEncArray = arrayOfEncrStr.length;

    return new Promise((resolve, reject) => {
        arrayOfEncrStr.map((item, index) => { // eslint-disable-line
            const decryptedStr = util.decryptor(item);
            const decryptedObj = util.parseJsonSafely(decryptedStr);

            const { secretKey, ...originalObj } = decryptedObj;
            bcrypt.compare(JSON.stringify(originalObj), secretKey)
                .then((res) => {
                    if (res === true) {
                        originalObj.timestamp = moment().format();
                        array.push(originalObj);
                    }
                    if (lengthOfEncArray === index + 1) {
                        resolve(array);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    });
};
