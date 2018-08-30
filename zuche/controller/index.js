var path=require("path");
var formidable = require("formidable");
var admin = require("../models/admin.js");
var crypto = require("crypto");
var fs = require("fs");
exports.showIndex=function (req, res) {
    res.sendFile(path.join(__dirname , "../views/index.html"));
}
exports.checklogin=function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        if(err){
            res.json({"result":-1});
            return;
        }
        if(!username || !password){
            res.json({"result":-4});
            return;
        }
        if(Number.isInteger(Number(username))){
        //是一个数字，我们倾向于他是一个学生
        console.log("学生",username,password);
        Admin.findBySid(username,function(err,results){
            if(err){
                res.json({"result" : -1});
                return;
            }
            //用户名不存在
            if(results.length == 0){
                res.json({"result" : -2});
                return;
            }
            //判断密码是否正确，将用户输入的密码加密只有和results[0].password进行比较即可
            var sha256 = crypto.createHash("sha256");
            password = sha256.update(password).digest("hex").toString();
            if(password == results[0].password){

                res.json({"result":1 , "type" : "student"});
            }else{
                //-3就是密码错误！
                res.json({"result":-3});
            }
        });
        }else{
        //用户名不是一个数字，此时我们倾向于他是管理员
        //首先检查这个人是不是存在
        admin.findusername(username,function(err,results){
            if(err){
                //-1表示数据库错误
                res.json({"result":-1});
                return;
            }
            if(results.length == 0){
                //用户名不存在！
                res.json({"result":-2});
                return;
            }
            //直接检查密码是否输入正确！！
                var theadmin = results[0];
                //加密密码
                var sha256 = crypto.createHash("sha256");
                password = sha256.update(password).digest("hex").toString();
                if(theadmin.password == password){
                    //登录成功，下发session
                    req.session.username = username;
                    req.session.type = "admin";
                    req.session.login = true;

                    res.json({"result":1 , "type" : "admin"});
                }else{
                    res.json({"result":-3});
                }
            });
        }
    });
}
