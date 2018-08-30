var path = require("path");
var xlsx = require('node-xlsx');
var formidable = require("formidable");
var Admin = require("../models/admin.js");
var Student = require("../models/che.js");
var Course = require("../models/kehu.js");
var tool = require("../models/tool.js");
var lishi = require("../models/lishi.js");
var crypto = require("crypto");
var fs = require("fs");
var nodeExcel = require('excel-export');
var url = require("url");
exports.showAdmin = function(req,res){
    //使用这个页面需要登录！
    if(!(req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/>登录</a>");
        return;
    }
    res.sendFile(path.join(__dirname , "../views/admin.html"));
}

exports.addkh=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        Course.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
}

exports.deletekh=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var needToDelete = JSON.parse(fields.needToDelete);
        Course.delete(needToDelete,function(err,n){
            if(err){
                res.send("-1");
            }else{
                res.send(n.toString());
            }
        });
    });
}

exports.allkh=function (req, res) {
    Course.getAll(function(results){
        res.json({"results" : results});
    })
}

exports.changekh=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        Course.change(fields,function(err,r){
            res.send("");
        });
    });
}

exports.admintodo = function(req,res){
    res.sendFile(path.join(__dirname , "../views/admin-glytodo.html"));
}

exports.showuploadform = function(req,res){
    res.sendFile(path.join(__dirname , "../views/uploadform.html"));
}

exports.doexcelpost = function(req,res){
    // if(!(req.session.login && req.session.type == "admin")){
    //     res.send("本页面需要登录，请<a href=/>登录</a>");
    //     return;
    // }
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname , "../uploads");
    form.parse(req, function(err, fields, files) {
        fs.rename(files.wenjian.path,files.wenjian.path+".xlsx",function(err){
            if(err){
                res.send("上传文件发生了错误");
                return;
            }

            var obj = xlsx.parse(files.wenjian.path + ".xlsx");
            console.log(obj);
            var count = 0;
            Student.removeAllStudent(function(){
                //遍历这个对象中的data数组，data数组长度是6，是6个表的信息。
                for(var i = 0 ; i < 6 ; i++){
                    //命令模型分别将6个年级的学生信息持久化！
                    Student.createStudent(obj[i].data,obj[i].name,function(length,grade){
                        res.write(grade + "系列车辆成功插入" + length + "辆\n");

                        count++;
                        if(count == 6){
                            res.end("所有数据成功插入，请去车辆类型查看！！！");
                        }
                    });
                }
            });
        });
    });
}

exports.showallcar=function (req, res) {
    res.sendFile(path.join(__dirname , "../views/allcar.html"));
}

exports.getche=function (req, res) {
    var name=url.parse(req.url,true).query;
    var carname=name.chexi;
    Student.getzhiding(carname,function (data) {
        res.json({"results" : data});
    })
}

exports.zuche=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var carname=fields.carname;
        var kehu=fields.kehu;
        var day=fields.day;
        var json={"carname":fields.carname};
        tool.zuche(carname,kehu,day,function(resultnumber){
            res.json({"jieguo":resultnumber});
        });
        lishi.add(json,function (err, r) {
            console.log(r);
        })

    })

}

exports.guihuan=function (req, res) {
    var arr=[];
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var all=JSON.parse(fields.zong);
        console.log(all);
        tool.guihuan(all,function(resultnumber){
            // arr.push(resultnumber);
            // console.log(arr);
            res.json({"jieguo":1});
        });
    })
}

exports.showghlb=function (req, res) {
    res.sendFile(path.join(__dirname , "../views/guihuan.html"));
}

exports.allgh=function (req, res) {
    Course.getzucheall(1,function(results){
        res.json({"results" : results});
    })
}

exports.showtongji=function (req, res) {
    res.sendFile(path.join(__dirname , "../views/tongji.html"));
}

exports.getlishi=function (req, res) {
    lishi.all(function (data) {
        res.json({"all":data})
    })
}

