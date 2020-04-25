// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');
//
//
// //schema
// // const Schema = mongoose.Schema;
// // const UserDetail = new Schema({
// //     username: String,
// //     password: String
// // });
//
//
// //auth
// var dbHost = 'localhost';
// var dbPort = 27017;
// // var dbName = 'jobshare';
// // mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName,
// //     { useNewUrlParser: true, useUnifiedTopology: true });
// // UserDetail.plugin(passportLocalMongoose);
// //const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');
//
// /* PASSPORT LOCAL AUTHENTICATION */
// // passport.use(UserDetails.createStrategy());
// // passport.serializeUser(UserDetails.serializeUser());
// // passport.deserializeUser(UserDetails.deserializeUser());
//
//
// /* GET users listing. */
//
//
// router.get('/login', function(req, res, next) {
//     res.render('login');
// });
//
// router.get('/register', function(req, res, next) {
//     res.render('register');
// });
//
// router.post('/register', function(req, res, next){
//     const name = req.body.name;
//     const email = req.body.email;
//     const psw = req.body.psw;
//     const psw2 = req.body.psw2;
//
//     req.checkbody('name', 'Name is required.').notEmpty();
//     req.checkbody('email', 'email is not valid.').isEmail();
//     req.checkbody('psw', 'password is required.').notEmpty();
//     req.checkbody('psw2', 'confirm password do not match.').equals(req.body.psw);
//
//     let errors = req.validationErrors();
//     if (errors){
//         res.render('register', {
//             errors: errors
//         })
//     } else{
//         let newUser = new User({
//             name: name,
//             email: email,
//             password: password
//         });
//         bcrypt.getSalt(10, function(err, salt){
//             bcrypt.hash(newUser.password, salt, function(err, hash){
//                 if (err){
//                     console.log(err);
//                 }
//                 newUser.password = hash;
//                 newUser.save()
//             });
//         })
//     }
// });
//
// router.get('/user',
//     connectEnsureLogin.ensureLoggedIn(),
//     (req, res) => res.send({user: req.user})
// );
// router.get('/',
//     connectEnsureLogin.ensureLoggedIn(),
//     (req, res) => res.render()
// );
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
// module.exports = router;


var express = require('express');
var router = express.Router();

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

module.exports = router;