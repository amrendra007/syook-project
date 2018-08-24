const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  stream: [],
});

module.exports = mongoose.model('Person', PersonSchema);
