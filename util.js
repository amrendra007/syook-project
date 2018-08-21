const Crypto = require('crypto');
require('dotenv').config();

// Random function Generator be
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
module.exports.random = random;

// Generating random obj
const names = ['Jack', 'Mack', 'wack', 'Rocky', 'Tuckker', 'Bang', 'sack', 'zeem', 'jhdfkjd', 'cddd'];
const origins = ['New york', 'delhi', 'mumbai', 'chennai', 'New boston', 'LA', 'Ca', 'Sa', 'ma', 'gtsy'];
const destinations = [' Delhi', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Bangalore ', 'Kolkata', 'Surat', 'Pune', 'Jaipu', 'Lucknow'];
module.exports.objCreator = function() {
    return {
        name: names[random(0, 9)],
        origin: origins[random(0, 9)],
        destination: destinations[random(0, 9)],
    };
};

// Encrypting string
module.exports.encryptor = function(text) {
    const iv = Crypto.randomBytes(16);
    const cipher = Crypto.createCipheriv(process.env.ALGO, Buffer.from(process.env.PSWD), iv);
    const encrypted = cipher.update(text);
    const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${finalBuffer.toString('hex')}`;
};
