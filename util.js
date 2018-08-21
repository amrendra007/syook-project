const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';

const names = ['Jack', 'Mack', 'wack', 'Rocky', 'Tuckker', 'Bang', 'sack', 'zeem', 'jhdfkjd', 'cddd'];
const origins = ['New york', 'delhi', 'mumbai', 'chennai', 'New boston', 'LA', 'Ca', 'Sa', 'ma', 'gtsy'];
const destinations = [' Delhi', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Bangalore ', 'Kolkata', 'Surat', 'Pune', 'Jaipu', 'Lucknow'];

module.exports.objCreator = function() {
    return {
        name: names[Math.floor(Math.random() * 10)],
        origin: origins[Math.floor(Math.random() * 10)],
        destination: destinations[Math.floor(Math.random() * 10)],
    };
};


module.exports.encryptor = function(text) {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};
