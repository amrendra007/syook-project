const express = require('express');
const moment = require('moment');
const Person = require('../models/person');

const router = express.Router();

// rendering data to ui
router.get('/', async (req, res, next) => {
  const personData = await Person.find({});
  res.render('person', { personData });
});

// filtering data
router.get('/filter', async (req, res, next) => {
  const startTime = moment('2018-08-24T12:00:00+05:30')
    .second(0)
    .toISOString();
  const endTime = moment('2018-08-24T14:00:00+05:30')
    .second(0)
    .toISOString();

  const filteredData = await Person.find({
    name: 'Rocky',
    // time: { $in: [startTime, endTime] },
    time: { $gt: startTime, $lt: endTime },
  });

  console.log(JSON.stringify(filteredData, null, 4));

  res.render('query', { filteredData });
});

module.exports = router;
