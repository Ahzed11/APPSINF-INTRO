const express = require('express');
const router = express.Router();

const Report = require('../models/report');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //TODO: Add searchTerm
  const reports = await Report.find().populate('author');

  res.render('index.html', {reports: reports, userName: req.session.userName});
});

module.exports = router;
