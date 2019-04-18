var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var messagebird = require('messagebird')('                  ');  
var UserController = require('../controllers/user');
var user = require('../models/user');
var User = require('../models/user');


//Register
router.get('/register',function(req, res){
    res.render('register');
});

//Signin
router.get('/signin',function(req, res){
    res.render('signin');
});

//Register user
router.post('/register',function(req, res){
    UserController.register(req, res);
});

//Register user
router.post('/signin',function(req, res){
    UserController.signin(req, res);
});

//End User's Session
router.get('/users/signin',function(req, res){
    UserController.userlogout(req, res);
});

// router.post('/register',function(req, res){
//     var name = req.body.name;
//     var birthdate = req.body.birthdate;
//     var bloodgroup = req.body.bloodgroup;
//     var email = req.body.email;
//     var mobilenumber = req.body.mobilenumber;
//     var address = req.body.address;
//     var schoolname = req.body.schoolname;
//     var schooladdress = req.body.schooladdress;
//     var standard = req.body.standard;
//     var username = req.body.username;
//     var password = req.body.password;
//     var confirmpassword = req.body.confirmpassword;              

//     //Validation
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

//     var errors = req.validationErrors();

//     if(errors){
//         res.render('register',{
//             errors:errors
//         });
//     } else{
//         var newUser = new user.User({
//             name: name,
//             birthdate: birthdate,
//             bloodgroup: bloodgroup,
//             email: email,
//             mobilenumber: mobilenumber,
//             address: address,
//             schoolname: schoolname,
//             schooladdress: schooladdress,
//             standard: standard,
//             username: username,
//             password: password
//         });

//         UserController.createUser(newUser, function(err, user){
//             if(err) throw err;
//             console.log(user);
//         });

//         req.flash('success_msg', 'You are registered and can now sign in');

//         res.redirect('/users/signin');
//     }
// });

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         user.getUserByUsername(username, function(err, user){
//             if(err) throw err;
//             if(!user){
//                 console.log(user);
//                 console.log("Hello");
//                 return done(null, false, {message: 'Unknown User'});
//             }

//             user.comparePassword(password, user.password, function(err, isMatch){
//                 if(err) throw err;
//                 if(isMatch){
//                     return done(null, user);
//                 } else {
//                     return done(null, false, {message: 'Invalid Password'});
//                 }
//             });
//         });
//     }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
      
// passport.deserializeUser(function(id, done) {
//     user.getUserById(id, function(err, user) {
//         done(err, user);
//     });
// });    
      
// router.post('/signin',
//   passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/users/signin', failureFlash: true}),
//   function(req, res) {
//     res.redirect('/home');     
//   });

// router.get('/logout', function(req, res){
//     req.logout();

//     req.flash('success_msg', 'You are signed out');

//     res.redirect('/users/signin');
// });

//Display page to ask the user for its phone number
// router.get('/forgot',function(req, res){
//     res.render('forgot');
// });

//Handle phone number submission
// router.post('/reset', function(req, res){
//     var mobilenumber = req.body.mobilenumber;

//     //Make request to verify API
//     messagebird.verify.create(mobilenumber, {
//         template: 'Your OTP is %token'
//     }, function(err, response){
//         if (err) {
//             //Request has failed
//             console.log(err);
//             res.render('forgot', {
//                 error : err.errors[0].description
//             });
//         } else {
//             //Request was successful
//             console.log(response);
//             res.render('reset', {
//                 id : response.id
//             });
//         }
//     });
// });

//Verify whether the token is correct
// router.post('/update', function(req, res){
//     var id = req.body.id;
//     var token = req.body.token;

//     //Make request to verify API
//     messagebird.verify.verify(id, token, function(err, response){
//         if (err) {
//             //Verification has failed
//             res.render('reset', {
//                 error: err.errors[0].description,
//                 id : id
//             });
//         } else {
//             //Verification was successful
//             res.render('update');
//         }
//     });
// });


//Application Form
router.post('/application', function(req, res){
    var name = req.body.name;
    var address = req.body.address;
    var mobilenumber = req.body.mobilenumber;
    var date = req.body.date;
    var options = req.body.options;
    var locationname = req.body.locationname;
    var birthdate = req.body.birthdate;
    var schoolname = req.body.schoolname;
    var standard = req.body.standard;
    // res.redirect('/application');
});
  
//Higher Education Form
router.post('/higheredu', function(req, res){
    var name = req.body.name;
});

//Documents Form
router.post('/documents', function(req, res){
    var filenumber = req.body.filenumber;
    var file = req.body.file;
});
 
//Standard Result
router.post('/stnd', function(req, res){
    var info = {
        name : req.body.name,
        date : req.body.date,
        standard : req.body.standard,
        std1 : req.body.std1,
        std2 : req.body.std2,
        std3 : req.body.std3,
        std4 : req.body.std4,
        std5 : req.body.std5,
        std6 : req.body.std6,
        std7 : req.body.std7,
        std8 : req.body.std8,
        std9 : req.body.std9,
        std10 : req.body.std10,
        std11 : req.body.std11,
        std12 : req.body.std12,
        marks : req.body.marks,
        file : req.body.file
    };
    res.redirect('/users/afterstnd');
});


//Admin Side

//Register
// router.get('/adminreg',function(req, res){
//     res.render('adminreg');
// });
        
//Signin
// router.get('/adminsignin',function(req, res){
//     res.render('adminsignin');
// });

//Register admin
// router.post('/adminreg',function(req, res){
//     var name = req.body.name;
//     var birthdate = req.body.birthdate;
//     var bloodgroup = req.body.bloodgroup;
//     var email = req.body.email;
//     var mobilenumber = req.body.mobilenumber;
//     var address = req.body.address;
//     var username = req.body.username;
//     var password = req.body.password;
//     var confirmpassword = req.body.confirmpassword;              

//     //Validation
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

//     var errors = req.validationErrors();

//     if(errors){
//         res.render('adminreg',{
//             errors:errors
//         });
//     } else{
//         var newUser  = new User({
//             name: name,
//             birthdate: birthdate,
//             bloodgroup: bloodgroup,
//             email: email,
//             mobilenumber: mobilenumber,
//             address: address,
//             username: username,
//             password: password,
//             // isadmin: true
//         });

//         User.createUser(newUser, function(err, admin){
//             if(err) throw err;
//             console.log(admin);
//         });
 
        // if(req.body.username == 'admin001' && req.body.password == 'qwerty1234' || req.body.username == 'admin002' && req.body.password == 'vinod@123' || req.body.username == 'admin003' && req.body.password == 'sabby@111'){
        //     newUser.isAdmin = true;
        //     req.flash('success_msg', 'You are registered as an admin and can now sign in');
        //     res.redirect('/users/adminsignin');
        // }
        // else {
        //     req.flash('error_msg', 'Username and Password do no match');

        //     res.redirect('back');
        // }    
        
//         req.flash('success_msg', 'You are registered as an admin and can now sign in');
//         res.redirect('/users/adminsignin');
//     }
// });
   
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         User.getUserByUsername(username, function(err, admin){
//             if(err) throw err;
//             if(!admin){
//                 console.log(admin);
//                 console.log("Hello");
//                 return done(null, false, {message: 'Unknown User'});
//             }

//             User.comparePassword(password, admin.password, function(err, isMatch){
//                 if(err) throw err;
//                 if(isMatch){
//                     return done(null, admin);
//                 } else {
//                     return done(null, false, {message: 'Invalid Password'});
//                 }
//             });
//         });
//     }
// ));

// passport.serializeUser(function(admin, done) {
//     done(null, admin.id);
// });
      
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function(err, admin) {
//         done(err, admin);
//     });
// });    
    
// router.post('/adminsignin',
//   passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/users/adminsignin', failureFlash: true}),
//   function(req, res) {
    // if(req.isAuthenticated()){
    //     res.redirect('/');
    // }
    // else{
    //     return done(null, false, {message: 'You are not an admin'});
    // } 

    // if(req.body.username != 'admin005' && req.body.password != 'abcd'){
    //     return done(null, false, {message: 'You are not an admin'});
    // } 
    // else{
    //     res.render('/');
    // }



//     res.redirect('/home');
//   });

// router.get('/logout', function(req, res){
//     req.logout();

//     req.flash('success_msg', 'You are signed out');

//     res.redirect('/users/adminsignin');
// });


router.post('/report',function(req, res){
    var srno = req.body.srno;
    var reportname = req.body.reportname;
    var date = req.body.date;
    var file = req.body.file;
    res.redirect('/report');
});



router.post('/phase',function(req, res){
    var filenumber = req.body.filenumber;
    var phase = req.body.phase;
    var marks = req.body.marks;
    var phase1_1 = req.body.phase1_1;
    var phase1_2 = req.body.phase1_2;
    var phase1_3 = req.body.phase1_3;
    var phase1_4 = req.body.phase1_4;
    var phase1_5 = req.body.phase1_5;
    var phase2_1 = req.body.phase2_1;
    var phase2_2 = req.body.phase2_2;
    var phase2_3 = req.body.phase2_3;
    var phase3_1 = req.body.phase3_1;
    var phase3_2 = req.body.phase3_2;
    var phase3_3 = req.body.phase3_3;
    var phase3_4 = req.body.phase3_4;
    var phase3_5 = req.body.phase3_5;
    var phase3_6 = req.body.phase3_6;
    var phase3_7 = req.body.phase3_7;
    var phase4_1 = req.body.phase4_1;
    var phase4_2 = req.body.phase4_2;
    var phase4_3 = req.body.phase4_3;
    var result = req.body.result;
    res.redirect('/users/afterphase');
});



router.post('/material',function(req, res){
    var filenumber = req.body.filenumber;
    var name = req.body.name;
    var date = req.body.date;
    var standard = req.body.standard;
    var hpgsbook = req.body.hpgsbook;
    var tpgsbook = req.body.tpgsbook;
    var hpgsregister = req.body.hpgsregister;
    var artsbook = req.body.artsbook;
    var longbook = req.body.longbook;
    var compassbox = req.body.compassbox;
    var pencil68 = req.body.pencil68;
    var pencil910 = req.body.pencil910;
    var bluepen = req.body.bluepen;
    var calculator = req.body.calculator;
    var postercolor = req.body.postercolor;
    var projectfile = req.body.projectfile;
});     


module.exports = router;   


