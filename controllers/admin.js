var admin = require('../models/admin');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.adminreg = function(req, res) {
    var name = req.body.name;
    var birthdate = req.body.birthdate;
    var bloodgroup = req.body.bloodgroup;
    var email = req.body.email;
    var mobilenumber = req.body.mobilenumber;
    var address = req.body.address;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;              

    //Validation
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('adminreg',{
            errors:errors
        });
    } else{
        var newAdmin = new admin.Admin({
            name: name,
            birthdate: birthdate,
            bloodgroup: bloodgroup,
            email: email,
            mobilenumber: mobilenumber,
            address: address,
            username: username,
            password: password
        });

        AdminController.createAdmin(newAdmin, function(err, admin){
            if(err) throw err;
            console.log(admin);
        });

        req.flash('success_msg', 'You are registered and can now sign in');

        res.redirect('/admins/adminsignin');
    }
}

passport.use(new LocalStrategy(
    function(username, password, done) {
        admin.getAdminByUsername(username, function(err, admin){
            if(err) throw err;
            if(!admin){
                console.log(admin);
                console.log("Hello");
                return done(null, false, {message: 'Unknown Admin'});
            }

            admin.comparePassword(password, admin.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, admin);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(admin, done) {
    done(null, admin.id);
});
      
passport.deserializeUser(function(id, done) {
    admin.getAdminById(id, function(err, admin) {
        done(err, admin);
    });
});    

exports.createAdmin = function(newAdmin, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newAdmin.password, salt, function(err, hash){
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

exports.getAdminByUsername = function(username, callback){
    var query = {username: username};
    Admin.findOne(query, callback);
}

exports.getAdminById = function(id, callback){
    Admin.findById(id, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

exports.adminsignin = function(req, res) {
    passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/admins/adminsignin', failureFlash: true}),
    function(req, res) {
      res.redirect('/home');     
    }    
}

exports.adminlogout = function(req, res){
    req.logout();

    req.flash('success_msg', 'You are signed out');

    res.redirect('/admins/adminsignin');
}
