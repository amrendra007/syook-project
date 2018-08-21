const encryptedStringGen = require('./encryptedStrGen');

encryptedStringGen()
    .then((finalString) => {
        console.log(finalString);
    })
    .catch((err) => {
        console.log(err);
    });
