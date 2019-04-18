var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var messagebird = require('messagebird')('                  ');  
var AdminController = require('../controllers/admin');
var admin = require('../models/admin');

//Register
router.get('/adminreg',function(req, res){
    res.render('adminreg');
});

//Signin
router.get('/adminsignin',function(req, res){
    res.render('adminsignin');
});
 
//Register admin
router.post('/adminreg',function(req, res){
    AdminController.adminreg(req, res);
});

//Register admin
router.post('/adminsignin',function(req, res){
    AdminController.adminsignin(req, res);
});

//End Admin's Session
router.get('/admins/adminsignin',function(req, res){
    AdminController.adminlogout(req, res);
});

module.exports = router;   
