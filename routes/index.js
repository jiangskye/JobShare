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
    res.render('main/index', { title: 'Express' });
});

router.get('/employeesharing', function(req, res, next) {
    res.render('main/employee-sharing', { title: 'Express' });
});

router.get('/jobrecruitment', function(req, res, next) {
    res.render('main/job-recruitment', { title: 'Express' });
});

router.get('/availableindi', function(req, res, next) {
    res.render('main/available-individual', { title: 'Express' });
});

router.get('/availabletaskdoer', function(req, res, next) {
    res.render('main/available-task-doer', { title: 'Express' });
});

router.get('/publishedtask', function(req, res, next) {
    res.render('main/published-tasks', { title: 'Express' });
});

router.get('/recruitingcompany', function(req, res, next) {
    res.render('main/recruiting-company', { title: 'Express' });
});
router.get('/shorttermborrow', function(req, res, next) {
    res.render('main/short-term-borrowing', { title: 'Express' });
});
router.get('/shorttermlend', function(req, res, next) {
    res.render('main/short-term-lending', { title: 'Express' });
});
router.get('/taskfinding', function(req, res, next) {
    res.render('main/task-finding', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
    res.render('main/contactus', { title: 'Express' });
});
module.exports = router;