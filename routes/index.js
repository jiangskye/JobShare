var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
require('../config/passport')(passport);




//auth
var dbHost = 'localhost';
var dbPort = 27017;
var dbName = 'jobshare';
mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName,
    { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});




module.exports = router;