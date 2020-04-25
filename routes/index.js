var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
//const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
require('../config/passport')(passport);
//const connectEnsureLogin = require('connect-ensure-login');


// //schema
// const Schema = mongoose.Schema;
// const UserDetail = new Schema({
//     username: String,
//     password: String
// });

//auth
var dbHost = 'localhost';
var dbPort = 27017;
var dbName = 'jobshare';
mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName,
    { useNewUrlParser: true, useUnifiedTopology: true });
// UserDetail.plugin(passportLocalMongoose);
// const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

/* PASSPORT LOCAL AUTHENTICATION */
// passport.use(UserDetails.createStrategy());
// passport.serializeUser(UserDetails.serializeUser());
// passport.deserializeUser(UserDetails.deserializeUser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*log in and register */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: "/userprofile",
        failureRedirect: "/login",
        failureFlash: true,
    })
);
//
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local',
//         (err, user, info) => {
//             if (err) {
//                 return next(err);
//             }
//             if (!user) {
//                 return res.redirect('/login?info=' + info);
//             }
//             req.logIn(user, function(err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 return res.redirect('/');
//             });
//         })(req, res, next);
// });

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/userprofile', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// router.get('/userprofile',
//     isLoggedIn,
//     (req, res) => {
//     console.log("req user", req.user);
//     res.render("userprofile", {user: req.user});
// }
// );

router.get('/userprofile',isLoggedIn,(req,res)=>{
    console.log("req user",req.user);
    console.log("profile");
    res.render('userprofile',{
        user : req.user
    });
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
    res.redirect('/login');
}

module.exports = router;
