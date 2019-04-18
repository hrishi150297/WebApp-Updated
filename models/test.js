var test= require('./user').test;
var getUserByUsername= require('./user').getUserByUsername;


test("tesst");
getUserByUsername("ROHIT2006", function(data){
    console.log(data);
});