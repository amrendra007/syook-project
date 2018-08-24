const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
  },
  stream: [],
});

module.exports = mongoose.model('Person', PersonSchema);
