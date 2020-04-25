const LocalStrategy = require('passport-local').Strategy;
var flash=require("connect-flash");
//app.use(flash());
let User = require('../models/user');

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(
        "local-login",
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with email
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                // callback with email and password from our form
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ email: email }, function(err, user) {
                    // if there are any errors, return the error before anything else
                    if (err){
                        console.log(err);
                        console.log("login err1");
                        return done(err);
                    }
                    console.log("user", user);
                    console.log("password1", password);
                    // if no user is found, return the message
                    if (!user) {
                        console.log("no usr");
                        return done(null, false, req.flash("loginMessage", "No user found.")) // req.flash is the way to set flashdata using connect-flash
                        // if the user is found but the password is wrong
                    }
                    console.log("here");
                    if (!user.validPassword(password)){
                        console.log("pw wrong");
                        return done(
                            null,
                            false,
                            req.flash("loginMessage", "Oops! Wrong password.")
                        ) }// create the loginMessage and save it to session as flashdata
                    // all is well, return successful user
                    console.log("log in successful")
                    return done(null, user)
                })
            }
        )
    )

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log(email);
            console.log(password);

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        console.log("That email is already taken.");
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log("create the user.");
                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials

                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                console.log("save user error.");
                                console.log(err);
                                throw err;
                            return done(null, newUser);
                        });
                        console.log("save user.");
                    }

                });

            });

        }));
};