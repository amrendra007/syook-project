const express = require('express');
const Person = require('../models/person');

const router = express.Router();

// rendering data to ui
router.get('/', async (req, res, next) => {
  const personData = await Person.find({});
  res.render('person', { personData });
});

module.exports = router;
