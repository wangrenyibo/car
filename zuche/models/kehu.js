var mongoose = require("mongoose");
var courseSchema = mongoose.Schema({
    "name" : String,
    "phone" : String,
    "address" : String,
    "card" : String,
    "car" : String,
    "zuche":[String],
    "days":Number,
    "qian":Number,
    "jg":Number,
    "sfzc":Number
});
courseSchema.statics.add = function(json,callback){
    this.create(json,function(err,r){
        callback(err,r);
    });
}
courseSchema.statics.getAll = function(callback){
    this.find({}).exec(function(err,results){
        callback(results);
    });
}


courseSchema.statics.change = function(newJSON){
    this.find({"name" : newJSON["name"]},function(err,results){
        results[0].name = newJSON.name;
        // results[0].phone = newJSON.phone;
        results[0].address = newJSON.address;
        results[0].card = newJSON.card;
        results[0].jg=newJSON.jg;
        results[0].car = newJSON.car;
        results[0].save();
    })
}

courseSchema.statics.delete = function(arr,callback){
    var _arr = [];
    arr.forEach(function(item){
        _arr.push({"name" : item});
    });
    this.remove({$or : _arr},function(err,r){
        callback(err,r.n);
    });
};

courseSchema.statics.getzucheall=function (sfzc,callback) {
    this.find({"sfzc":sfzc}).exec(function(err,results){
        callback(results);
    });
}

var Course = mongoose.model("kehu",courseSchema);

module.exports = Course;