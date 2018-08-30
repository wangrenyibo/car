var mongoose = require("mongoose");
var crypto = require("crypto");
var adminSchema = mongoose.Schema({
    "username" : String,
    "password" : String
});
adminSchema.statics.findusername = function(username,callback){
    this.find({"username":username},function(err,results){
        callback(err,results);
    });
}
adminSchema.statics.findBySid = function(sid,callback){
    this.find({"sid" : sid} , function(err,results){
        callback(err,results);
    })
}
var Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;