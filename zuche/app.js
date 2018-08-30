var express = require("express");
var session = require('express-session');
var mongoose = require("mongoose");
var con=require("./controller/index.js");
var adm=require("./controller/kzadmin.js");
mongoose.connect('mongodb://localhost:27017/xuanxiukebaoming');
var app = express();
app.set("view engine","ejs");
app.set("views","public");
app.set('trust proxy', 1) ;
app.use(session({
    secret: 'kaola',
    resave: false,
    saveUninitialized: true
}));
//首页对租车用户的增删改查
app.get ("/",con.showIndex);
app.post("/checklogin",con.checklogin);
app.get ("/admin",adm.showAdmin);
app.post("/admin/addkh",adm.addkh);
app.post("/admin/deletekh",adm.deletekh);
app.get("/admin/allkh",adm.allkh);
app.post("/admin/changekh",adm.changekh);

//把管理员提交的车辆数据，显示到页面，提供给用户挑选
app.get("/admin/allqiche",adm.showallcar);
app.get("/admin/getzhidingcar",adm.getche);

//租车与还车
app.post("/admin/zuche",adm.zuche);
app.post("/admin/guihuan",adm.guihuan);
app.get("/admin/ghlb",adm.showghlb);
app.get("/admin/allguihuan",adm.allgh);

//管理员在管理员操作里面提交公司车辆数据
app.get("/admin/todosome",adm.admintodo);
app.get ("/admin/uploadform",adm.showuploadform);
app.post("/admin/doexcelpost",adm.doexcelpost);

//历史记录
app.get("/admin/tongji",adm.showtongji);
app.get("/admin/lishi",adm.getlishi);

app.use ("/public"                          ,express.static("./public"));
app.listen(3200);

