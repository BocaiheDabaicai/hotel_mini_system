var express = require("express");
const axios = require('axios');
var router = express.Router();

router.get("/", async function (req, res, next) {
    var data
    console.log(req.query['code'])
    await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
        params:{
            grant_type:'client_credential',
            appid:'wx68196c2e769c61aa',
            secret:'a64aa42755c5878450bdbc64cf20f160'
        }
    }).then(async res => {
        // console.log(typeof res, res)
        console.log(res.data['access_token'])
        // console.log('Then '+dataString)
        await axios.post('https://api.weixin.qq.com/wxa/business/getuserphonenumber', {
                "code":req.query['code'],
        },{
            params:{
                access_token:res.data['access_token']
            }
        }).then(res => {
            console.log(typeof res, res.data)
            data=res.data
        })

    })
    res.send(data['phone_info']['phoneNumber'])
});

router.post("/", function (req, res, next) {
    // 插入入住人员信息
    // console.log(req.query)
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
        // var dataString = JSON.stringify(result)
        // var dateJson = JSON.parse(dataString)
        res.end('Insert success.');
    })
    // res.end('from addGoodsFunction finished.')
});

module.exports = router;