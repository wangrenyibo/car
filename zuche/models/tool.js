var Course = require("./kehu.js");
var Student = require("./che.js");
var _ = require("underscore");

exports.zuche=function (carname, kehu, day, callback) {
    Course.find({"name" : kehu},function(err,results1){
        Student.find({"name":carname},function(err,results2){
            var thecourse = results1[0];
            var thestudent = results2[0];
            console.log(thestudent);
            //通过5关，实现报名
            console.log(thecourse.zuche.length);
            if(thecourse.zuche.length==0){
                thecourse.zuche.push(thestudent.name);
                thecourse.days=day;
                thecourse.qian=thestudent.money*day;
                thecourse.jg=thestudent.money;
                thecourse.sfzc=1;
                thestudent.sheizuta.push(thecourse.name);
                thecourse.number--;
                thecourse.save();
                thestudent.save();
                callback("1");
            }else{
                callback("2");
                return;
            }

        });
    });
}

exports.guihuan=function (all,callback) {
    console.log(all);
    for(var i=0;i<all.length/2;i++){
        var zbr=[];
        for(var j=i*2;j<(i+1)*2;j++){
            zbr.push(all[j]);
        }
        Course.find({"name" : zbr[0]},function(err,results1){
            Student.find({"name":zbr[1]},function(err,results2) {
                var thecourse = results1[0];
                var thestudent = results2[0];
                if(thecourse.zuche.length==0){
                    // callback(-1);
                    return;
                }else{
                    thecourse.zuche = _.without(thecourse.zuche,thestudent.name);
                    thecourse.days="";
                    thecourse.qian="";
                    thecourse.jg="";
                    thecourse.sfzc=0;
                    thestudent.sheizuta = _.without(thestudent.sheizuta,thecourse.name);
                    thecourse.number++;

                    thecourse.save();
                    thestudent.save();
                    console.log("成功归还");
                    // callback(1);
                    // return;
                }
            });
        });
    }

}