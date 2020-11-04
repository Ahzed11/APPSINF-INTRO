const express = require('express');
const router = express.Router();

const Report = require('../models/report');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let reports;
  const searchTerm = req.query.searchTerm;
  if(searchTerm){
    reports = await Report.find({$text: {$search: searchTerm}}).populate('author').sort('-createdAt');

    //reports = await Report.find( { $text: { $search: searchTerm } } ).populate('author').sort('-createdAt');
  } else {
    reports = await Report.find().populate('author').sort('-createdAt');
  }

  res.render('index.html', {reports: reports, userName: req.session.userName, searchTerm:searchTerm});
});

module.exports = router;
