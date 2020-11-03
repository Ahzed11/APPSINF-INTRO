const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const consolidate = require('consolidate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const reportRouter = require('./routes/report');

const app = express();
app.engine ( 'html', consolidate.hogan )
app.use(logger('dev'));
app.use(session({
    secret: '!ChangeMe!',
    resave: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/report', { useNewUrlParser: true });
const db = mongoose.connection;

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/report', reportRouter);

module.exports = app;
