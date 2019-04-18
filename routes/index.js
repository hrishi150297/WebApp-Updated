var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var express = require('express');
var router = express.Router();
var dburl = "mongodb://localhost:27017/webapp";



//Get Index Page
router.get('/', function(req, res){
    res.render('index');
});

//Get Home Page
router.get('/home', function(req, res){
    res.render('home');
});


//Get Services Page
router.get('/services', function(req, res){
    res.render('services');
});

//Get About Us Page
router.get('/aboutus', function(req, res){
    res.render('aboutus');
});

//Get Gallery Page
router.get('/gallery', function(req, res){
    res.render('gallery');
});

//Get Sponsorship Page
router.get('/sponsorship', function(req, res){
    res.render('sponsorship');
});

function authCheck(req, res, next){
    if(!req.user){
        //user is not logged in
        req.flash('error_msg', 'Please sign in first');
        res.redirect('/users/signin');
    } else{
        next();
    }
}

//Get Application Form
router.get('/application', authCheck, function(req, res){
    res.render('application', {user: req.user});
});

//Get Higher Education Form
router.get('/higheredu', authCheck, function(req, res){
    res.render('higheredu', {user: req.user});
});

//Documents Form
router.get('/documents', authCheck, function(req, res){
    res.render('documents', {user: req.user});
});

//Standard Result
router.get('/stnd', authCheck, function(req, res){
    res.render('stnd', {user: req.user});
});

//Checking Standard Wise Result
router.get('/afterstnd', authCheck, function(req, res){
    res.render('afterstnd', {user: req.user});
});

//Material Requirement
// router.get('/material', function(req, res){
//     if isadmin{
//         res.render('material');
//     }
//     else{
//         res.render('/');
//     }
// });

function isAuthenticated(req, res, next){
    if(!req.user){
        //admin is not logged in
        req.flash('error_msg', 'Please sign in first');
        res.redirect('/users/adminsignin');
    } else{
        next();
    }
}
  
router.get('/material', isAuthenticated, function(req, res){
    res.render('material', {user: req.user});
});

//Phase Result
router.get('/phase',isAuthenticated, function(req, res){
    res.render('phase', {user: req.user});
});

//Checking Phase Wise Result
router.get('/afterphase',isAuthenticated, function(req, res){
    res.render('afterphase', {user: req.user});
});

//Report Page
router.get('/report', isAuthenticated, function(req, res){
    res.render('report', {user: req.user});
});

//To check total no. of students
router.get('/stdtscount', function(req, res){
    res.render('stdtscount');
});

//To check phase wise marks of all students
router.get('/phsmks', function(req, res){
    res.render('phsmks');
});

//To check std. wise marks of all students
// router.get('/stdmks', function(req, res){
//     res.render('stdmks');
// });

router.get('/stdmks', function(req, res, next) {
    MongoClient.connect(dburl, function(err, db) {
      if(err) {  console.log(err); throw err;  }
      data = '';
      db.collection('user').find().toArray(function(err, docs){
        if(err) throw err;
        res.render('stdmks.handlebars', {data: docs});
        db.close();
      });
    });
  });

//var models = require('./user');


module.exports = router; 