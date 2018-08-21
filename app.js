const encryptedStringGen = require('./helper/encryptedStrGen');


encryptedStringGen()
    .then((finalString) => {
        console.log(finalString);
    })
    .catch((err) => {
        console.log(err);
    });
