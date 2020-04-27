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


/*log in and register */
router.get('/login', function(req, res, next) {
    res.render('main/login');
});

router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: "/users/userprofile",
        failureRedirect: "/users/login",
        failureFlash: true,
    })
);

router.get('/register', function(req, res, next) {
    res.render('main/register');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/users/your-profile', // redirect to the secure profile section
    failureRedirect : '/users/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/companyregister', function(req, res, next) {
    res.render('main/company-register');
});

router.get('/userprofile',isLoggedIn,(req,res)=>{
    console.log("req user",req.user);
    console.log("profile");
    res.render('main/your-profile',{
        user : req.user
    });
});

var PubContent = require("../models/Pubcontent");

router.post('/PubContent/add',function (req,res) {
    if(req.body.title == '')
    {
        res.render({
            message: 'The title cannot be blank.'
        })
    }

    new PubContent({
        title:req.body.title,
        description:req.body.description,
        content:req.body.content
    }).save().then(function () {
        res.render({message: 'content published'})

    })

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    console.log(req.session);
    console.log(req.user);
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()){
        console.log("req.user.email");
        console.log("authenticated");
        return next();}

    // if they aren't redirect them to the home page
    console.log("not log in");
    res.redirect('/users/login');
}

module.exports = router;