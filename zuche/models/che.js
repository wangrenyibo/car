var mongoose = require("mongoose");
var crypto = require("crypto");

var studentSchema = mongoose.Schema({
    "leixing" : String,
    "name" : String,
    "tu" :String,
    "money":Number,
    "sheizuta" : [String]
});

studentSchema.statics.createStudent = function(array,grade,callback){
    var studentARR = [];
    for(var i = 1 ; i < array.length ; i++){
        studentARR.push({
            "tu" : array[i][1],
            "name" : array[i][0],
            "money":array[i][2],
            "leixing" : grade
        })
    }
    this.create(studentARR,function(err,r){
        callback(r.length,grade);
    });
}

studentSchema.statics.removeAllStudent = function(callback){
    this.remove({},function(err,r){
        callback();
    });
}

studentSchema.statics.getAllStudents = function(callback){
    this.find({},function(err,results){
        var arr = [];
        results.forEach(function(item){
            arr.push([item.name , item.tu,item.money]);
            // arr.push(["车名","介绍图","价格"]);
        });
        callback(arr);
    });
}

studentSchema.statics.getzhiding = function(leixing,callback){
    this.find({"leixing":leixing},function(err,results){
        callback(results);
    });
}

studentSchema.statics.findByname = function(name,callback){
    this.find({"name" : name} , function(err,results){
        callback(err,results);
    })
}

studentSchema.statics.getcoursesbysid = function(sid,callback){
    this.find({"name" : name} , function(err,results){
        if(err || results.length == 0){
            callback([]);
            return;
        }
        callback(results[0].sheizuta);
    });
}



var Student = mongoose.model("che",studentSchema);


module.exports = Student;