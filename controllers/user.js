//var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user');
var bcrypt = require('bcryptjs');


exports.register = function(req, res) {
    var name = req.body.name;
    var birthdate = req.body.birthdate;
    var bloodgroup = req.body.bloodgroup;
    var email = req.body.email;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var schoolname = req.body.schoolname;
    var schooladdress = req.body.schooladdress;
    var standard = req.body.standard;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;              

    //Validation
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else{
        var newUser = new user.User({
            name: name,
            birthdate: birthdate,
            bloodgroup: bloodgroup,
            email: email,
            mobilenumber: mobilenumber,
            address: address,
            schoolname: schoolname,
            schooladdress: schooladdress,
            standard: standard,
            username: username,
            password: password
        });

        createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        newUser.save(function(err, user){
            if(err){
                console.log(err);
                throw err;
            } 
            else{
                console.log("success user");
                console.log(user);
            }
            
        });
        // bcrypt.genSalt(10, function(err, salt){
        //     bcrypt.hash(newUser.password, salt, function(err, hash){
        //         newUser.password = hash;
        //         newUser.save(function(err, user){
        //                 if(err) throw err;
        //                 console.log(user);
        //             });
        //         console.log("saved");
        //     });
        // });

        req.flash('success_msg', 'You are registered and can now sign in');

        res.redirect('/users/signin');
    }
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        user.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                console.log(user);
                console.log("Hello");
                return done(null, false, {message: 'Unknown User'});
            }

            user.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
      
passport.deserializeUser(function(id, done) {
    user.getUserById(id, function(err, user) {
        done(err, user);
    });
});    

var createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
            console.log("saved");
        });
    });
}

exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

exports.signin = function(req, res) {
    passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/users/signin', failureFlash: true}),
    function(req, res) {
      res.redirect('/home');     
    }    
}

exports.userlogout = function(req, res){
    req.logout();

    req.flash('success_msg', 'You are signed out');

    res.redirect('/users/signin');
}
