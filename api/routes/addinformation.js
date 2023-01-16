var express = require("express");
var router = express.Router();
const {connection} = require('../utils/MySQL')
const multer =require('multer')
// 设置上传的目录文件夹
const upload = multer({dest:__dirname+'/static/upload'})

router.get("/", function (req, res, next) {
    // 查询单个房间入住情况
    var sql="SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,username,sex,phone,checkoutdate,checkindate from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and  area.area='"+req.query['area'] +"' and floor.floor='"+req.query['floor'] +"' and apartment.number='"+req.query['number'] +"' "
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('select error!!', err.message)
            return;
        }
        var dataString = JSON.stringify(result)
        var dataJson = JSON.parse(dataString)
        for(var i=0;i<dataJson.length;i++){
            dataJson[i]['checkoutdate']=dataJson[i]['checkoutdate'].substring(0,10)
            dataJson[i]['checkindate']=dataJson[i]['checkindate'].substring(0,10)
        }
        // console.log(dataString)
        res.send(dataJson);
    })
    // res.end('from getGoodsFunction finished.')
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
    res.end(fileJson)
});

router.post("/", function (req, res, next) {
    // 插入入住人员信息
    var sql = "INSERT into information (area_id,floor_id,number_id,username,sex,idcard,phone,checkindate,checkoutdate)\n" +
        "VALUES (\n" +
        "(SELECT id from area where area='"+req.query['area']+"'),\n" +
        "(SELECT id from floor where floor='"+req.query['floor']+"'),\n" +
        "(SELECT apartment.id from area,floor,apartment \n" +
        "where apartment.area=area.id and apartment.floor=floor.id and apartment.number='"+req.query['number']+"' and floor.floor='"+req.query['floor']+"' and area.area='"+req.query['area']+"'),\n" +
        "'"+req.query['username']+"','"+req.query['sex']+"','"+req.query['idcard']+"','"+req.query['phone']+"','"+req.query['checkindate']+"','"+req.query['checkoutdate']+"'\n" +
        ")"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Insert error', err.message)
            return;
        }
        res.end('Insert success.');
    })
});

router.post("/update", function (req, res, next) {
    // 更新入住人员信息
    var sql = "UPDATE information\n" +
        "SET username='"+req.query['newusername']+"',sex='"+req.query['sex']+"',idcard='"+req.query['idcard']+"',phone='"+req.query['phone']+"',checkindate='"+req.query['checkindate']+"',check_id=(SELECT id from `check` WHERE `check`.check_name='"+req.query['checkname']+"'),area_id=(SELECT id from area where area.area='"+req.query['area']+"'),floor_id=(SELECT id from floor where floor.floor='"+req.query['floor']+"'),number_id=(SELECT apartment.id FROM apartment,area,floor WHERE area.id=apartment.area and floor.id=apartment.floor and area.area='"+req.query['area']+"' and number='"+req.query['number']+"')\n" +
        "WHERE username='"+req.query['oldusername']+"'"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Update error', err.message)
            return;
        }
        res.end('Update success.');
    })
});


module.exports = router;