var express = require("express");
var router = express.Router();
const {connection} = require('../utils/MySQL')
const multer =require('multer')
const axios = require("axios");
// 设置上传的目录文件夹
const upload = multer({dest:__dirname+'/static/upload'})
const upload_maintain = multer({dest:__dirname+'/static/maintain'})


router.get("/", function (req, res, next) {
    // 查询筛选条件下的审核单 "+req.query['area'] +"
    console.log(req.query['area'],req.query['status'])
    if (req.query['area']==='undefined'){ req.query['area']=undefined }
    if (req.query['status']==='undefined'){ req.query['status']=undefined }
    var sql
    if (req.query['area']!==undefined && req.query['status']!==undefined){
        sql = "SELECT information.id,area.area,floor.floor,number,check.check_name,`character`.`character`,username,sex,idcard,phone,checkindate,checkoutdate,material,if(status,'已审核','未审核') as `status`\n" +
            "from information,area,floor,apartment,`check`,`character`\n" +
            "where area.id=area_id and floor.id=floor_id and check.id=check_id and `character`.id=character_id and apartment.id=number_id and area_id=(SELECT id from area where area.area='"+req.query['area'] +"') and information.`status`="+req.query['status'] +"\n" +
            "ORDER BY area,floor,number\n" +
            "asc"
    } else if (req.query['area']!==undefined && req.query['status']===undefined){
        sql = "SELECT information.id,area.area,floor.floor,number,check.check_name,`character`.`character`,username,sex,idcard,phone,checkindate,checkoutdate,material,if(status,'已审核','未审核') as `status`\n" +
            "from information,area,floor,apartment,`check`,`character`\n" +
            "where area.id=area_id and floor.id=floor_id and check.id=check_id and `character`.id=character_id and apartment.id=number_id and area_id=(SELECT id from area where area.area='"+req.query['area'] +"')\n" +
            "ORDER BY area,floor,number\n" +
            "asc"
    } else if (req.query['area']===undefined && req.query['status']!==undefined){
        sql = "SELECT information.id,area.area,floor.floor,number,check.check_name,`character`.`character`,username,sex,idcard,phone,checkindate,checkoutdate,material,if(status,'已审核','未审核') as `status`\n" +
            "from information,area,floor,apartment,`check`,`character`\n" +
            "where area.id=area_id and floor.id=floor_id and check.id=check_id and `character`.id=character_id and apartment.id=number_id and information.`status`="+req.query['status'] +"\n" +
            "ORDER BY area,floor,number\n" +
            "asc"
    } else {
        sql = "SELECT information.id,area.area,floor.floor,number,check.check_name,`character`.`character`,username,sex,idcard,phone,checkindate,checkoutdate,material,if(status,'已审核','未审核') as `status`\n" +
            "from information,area,floor,apartment,`check`,`character`\n" +
            "where area.id=area_id and floor.id=floor_id and check.id=check_id and `character`.id=character_id and apartment.id=number_id\n" +
            "ORDER BY area,floor,number\n" +
            "asc"
    }

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        var dataString = JSON.stringify(result)
        var dataJson = JSON.parse(dataString)
        // for(var i=0;i<dataJson.length;i++){
        //     dataJson[i]['checkoutdate']=dataJson[i]['checkoutdate'].substring(0,10)
        //     dataJson[i]['checkindate']=dataJson[i]['checkindate'].substring(0,10)
        // }
        res.send(dataJson);
    })
});

router.get("/maintain", function (req, res, next) {
    // 查询筛选条件下的维修单 "+req.query['area'] +"
    console.log(req.query['area'],req.query['status'])
    if (req.query['area']==='undefined'){ req.query['area']=undefined }
    if (req.query['status']==='undefined'){ req.query['status']=undefined }
    var sql
    if (req.query['area']!==undefined && req.query['status']!==undefined){
        sql = "SELECT *\n" +
            "from maintain\n" +
            "where status="+req.query['status'] +" and area='"+req.query['area'] +"'"
    } else if (req.query['area']!==undefined && req.query['status']===undefined){
        sql = "SELECT *\n" +
            "from maintain\n" +
            "where area='"+req.query['area'] +"'"
    } else if (req.query['area']===undefined && req.query['status']!==undefined){
        sql = "SELECT *\n" +
            "from maintain\n" +
            "where status="+req.query['status'] +""
    } else {
        sql = "SELECT *\n" +
            "from maintain"
    }

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        var dataString = JSON.stringify(result)
        var dataJson = JSON.parse(dataString)
        // for(var i=0;i<dataJson.length;i++){
        //     dataJson[i]['checkoutdate']=dataJson[i]['checkoutdate'].substring(0,10)
        //     dataJson[i]['checkindate']=dataJson[i]['checkindate'].substring(0,10)
        // }
        res.send(dataJson);
    })
});

router.get("/update", function (req, res, next) {
    // 更新审核单的状态 "+req.query['area'] +"
    var sql = "UPDATE information\n" +
        "SET information.`status`="+req.query['status'] +"\n" +
        "where username='"+req.query['username'] +"' and idcard='"+req.query['idcard'] +"' and phone='"+req.query['phone'] +"'"

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        res.send('update success');
    })
});

router.get("/updatemaintain", function (req, res, next) {
    // 更新维修单的状态 "+req.query['area'] +"
    var sql = "UPDATE maintain\n" +
        "SET status=1\n" +
        "where applicant='"+req.query['username'] +"' and area='"+req.query['area'] +"' and number ='"+req.query['number'] +"'"
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        res.send('update success');
    })
});

router.get("/delete", function (req, res, next) {
    // 删除对应审核单 "+req.query['area'] +"
    var sql = "DELETE \n" +
        "from information\n" +
        "where username='"+req.query['username'] +"' and idcard='"+req.query['idcard'] +"' and phone='"+req.query['phone'] +"'"

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        res.send('delete success');
    })
});

router.get("/deletemaintain", function (req, res, next) {
    // 删除对应维修单 "+req.query['area'] +"
    var sql = "DELETE FROM maintain\n" +
        "WHERE applicant='"+req.query['username'] +"' and area='"+req.query['area'] +"' and number ='"+req.query['number'] +"'"
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        res.send('delete success');
    })
});

router.get("/single", function (req, res, next) {
    // 获取单个审核单信息 "+req.query['area'] +"
    var sql = "SELECT information.id,area.area,floor.floor,number,check.check_name,`character`.`character`,username,sex,idcard,phone,checkindate,checkoutdate,material,if(status,'已审核','未审核') as `status`\n" +
        "from information,area,floor,apartment,`check`,`character`\n" +
        "where area.id=area_id and floor.id=floor_id and check.id=check_id and `character`.id=character_id and apartment.id=number_id and username='"+req.query['username'] +"' and idcard='"+req.query['idcard'] +"' and phone='"+req.query['phone'] +"'"

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        var dataString = JSON.stringify(result)
        var dataJson = JSON.parse(dataString)
        res.send(dataJson);
    })
});

router.get("/download",function (req, res, next) {
    // 获取图片
    console.log(__dirname+'/static/upload'+req.query['picture'])
    res.sendFile(req.query['picture'],{root:__dirname+'/static/upload'})
});

router.post("/upload",upload.single('file'), function (req, res, next) {
    // 上传图片
    console.log(req.file)
    res.setHeader('Content-Type', 'multipart/form-data');
    var fileString = JSON.stringify(req.file)
    var fileJson = JSON.parse(fileString)
    // 获取表单传递的参数
    //let title = req.body.title
    //let description = req.body.description
    res.send(fileString)
});

router.get("/downloadMaintain",function (req, res, next) {
    // 获取图片，维修
    console.log(req.query['picture'])
    res.sendFile(req.query['picture'],{root:__dirname+'/static/maintain'})
});

router.post("/uploadMaintain",upload_maintain.single('file'), function (req, res, next) {
    // 上传图片，维修
    console.log(req.file)
    res.setHeader('Content-Type', 'multipart/form-data');
    var fileString = JSON.stringify(req.file)
    var fileJson = JSON.parse(fileString)
    // 获取表单传递的参数
    //let title = req.body.title
    //let description = req.body.description
    res.send(fileString)
});

router.post("/", function (req, res, next) {
    // 插入入住人员信息 "+req.query['username']+"
    // console.log(req.query)
    var sql = "INSERT into information (area_id,floor_id,number_id,check_id,character_id,username,sex,idcard,phone,checkindate,checkoutdate,material,status)\n" +
        "VALUES (\n" +
        "(SELECT id from area where area='"+req.query['area']+"'),\n" +
        "(SELECT id from floor where floor='"+req.query['floor']+"'),\n" +
        "(SELECT apartment.id from area,floor,apartment \n" +
        "where apartment.area=area.id and apartment.floor=floor.id and apartment.number='"+req.query['number']+"' and floor.floor='"+req.query['floor']+"' and area.area='"+req.query['area']+"'),\n" +
        "(SELECT id from `check` where `check`.check_name='"+req.query['check_name']+"'),\n" +
        "(SELECT id from `character` where `character`.character='"+req.query['character']+"'),\n" +
        "'"+req.query['username']+"','"+req.query['sex']+"','"+req.query['idcard']+"','"+req.query['phone']+"',CURDATE(),'2099/1/1','"+req.query['material']+"',"+req.query['status']+"\n" +
        ")"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Insert error', err.message)
            return;
        }
        res.end('Insert success.');
    })
});

router.post("/maintain", function (req, res, next) {
    // 插入维修信息 "+req.query['username']+"
    // console.log(req.query)
    var sql = "INSERT INTO maintain(applicant,area,number,apartment,phone,details,picture_url,status)\n" +
        "VALUES ('"+req.query['username']+"','"+req.query['area']+"','"+req.query['number']+"','"+req.query['apartment']+"','"+req.query['phone']+"','"+req.query['detail']+"','"+req.query['pictures']+"',0)"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Insert error', err.message)
            return;
        }
        res.end('Insert success.');
    })
});

router.post("/stubcheck", function (req, res, next) {
    // 添加审核存根信息
    var sql = "INSERT INTO stubcheck (area,floor,number,username,sex,phone,checktype,`status`,checkindate,checkoutdate,checkdeletedate)\n" +
        "values ('"+req.query['area']+"','"+req.query['floor']+"','"+req.query['number']+"','"+req.query['username']+"','"+req.query['sex']+"','"+req.query['phone']+"','"+req.query['checktype']+"','"+req.query['status']+"','"+req.query['checkindate']+"','"+req.query['checkoutdate']+"',CURRENT_DATE)"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Update error', err.message)
            return;
        }
        res.end('insert success.');
    })
});

router.post("/stubmaintain", function (req, res, next) {
    // 添加维修存根信息
    var sql = "INSERT INTO stubmaintain(applicant,area,number,apartment,phone,details,picture_url,status,deletedate)\n" +
        "VALUES ('"+req.query['username']+"','"+req.query['area']+"','"+req.query['number']+"','"+req.query['apartment']+"','"+req.query['phone']+"','"+req.query['detail']+"','"+req.query['pictures']+"',"+req.query['status']+",CURRENT_TIMESTAMP)"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Update error', err.message)
            return;
        }
        res.end('insert success.');
    })
});

module.exports = router;