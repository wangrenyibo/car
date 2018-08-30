var mongoose = require("mongoose");
var crypto = require("crypto");

var lishi = mongoose.Schema({
    "carname" : String,
});

lishi.statics.add = function(json,callback){
    this.create(json,function(err,r){
        callback(err,r);
    });
}
lishi.statics.all=function (callback) {
    this.find({}).exec(function(err,results){
        callback(results);
    });
}

var ls = mongoose.model("lishi",lishi);
module.exports = ls;
