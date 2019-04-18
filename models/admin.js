var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Admin Schema
var AdminSchema = mongoose.Schema({
    isAdmin:{
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        index: true
    },
    birthdate: {
        type: String    
    },
    bloodgroup: {
        type: String
    },
    email: {
        type: String,
        //required: true
    },
    mobilenumber: {
        type: String,
        //required: true
    },
    address: {
        type: String,
        //required: true
    },
    username: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    }
});
      
// var Admin = module.exports = mongoose.model('Admin', AdminSchema);
var Admin = mongoose.model('Admin', AdminSchema);

module.export = Admin;


// // var createAdmin = function(newUser, callback){
// //     bcrypt.genSalt(10, function(err, salt){
// //         bcrypt.hash(newUser.password, salt, function(err, hash){
// //             newUser.password = hash;
// //             newUser.save(callback);
// //         });
// //     });
// // }

// // // module.exports.isadmin = function(username, callback){
// // //     User.getUserByUsername(username).isadmin;
// // // }
 
// // var getAdminByUsername = function(username, callback){
// //     var query = {username: username};
// //     console.log(query);
// //     User.findOne(query, callback);
// //     console.log(User.findOne(query, callback));
// // }

// // var getUserById = function(id, callback){
// //     User.findById(id, callback);
// // }

// // var comparePassword = function(candidatePassword, hash, callback){
// //     bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
// //         if(err) throw err;
// //         callback(null, isMatch);
// //     });
// // }