const bcrypt = require('bcrypt');
const moment = require('moment');

const util = require('./util');

/*  This function takes encrypted array of str, loop over each item, decrypt it parse to json
    compare integrity of each obj and return array of original obj with timestamp
*/
module.exports = function (arrayOfEncrStr) {
    const momentIns = moment();
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
                        originalObj.timestamp = momentIns.format();
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
