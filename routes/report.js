const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Report = require('../models/report');

/* GET report page. */
router.get('/', (req, res, next) => {
  res.render('report.html', {userName: req.session.userName});
});

/* POST report page. */
router.post('/', (req, res) => {
  //TODO: Add verification on fields
  User.findOne({userName: req.session.userName}, (err, user) => {
    if (user){
      const report = new Report();

      report.description = req.body.description;
      report.address = req.body.address;
      report.author = user;

      report.save();
      res.redirect('/');
      return;
    }

    res.redirect('/report');
  });
});

module.exports = router;
