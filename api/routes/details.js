var express = require("express");
var router = express.Router();
const {connection} = require('../utils/MySQL')
router.get("/", function (req, res, next) {
    // 具体入住人员
    var sql="SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,username,sex,phone,checkoutdate,checkindate from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and username='"+req.query['username'] +"'"
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
        res.send(dataJson);
    })
});
router.get("/number", function (req, res, next) {
    // 查询房间入住人数及可用床位
    var sql = "SELECT apartment.id,area.area,floor.floor,apartment.number,count(*) as present,apartment.available from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and  area.area='"+req.query['area'] +"' and floor.floor='"+req.query['floor'] +"'\n" +
        "GROUP BY apartment.id,area.area,floor.floor,apartment.number,apartment.available"
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
router.get("/area", function (req, res, next) {
    // 查询区域及具体楼层
    var sql = "SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,username,sex,phone,checkindate,checkoutdate from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and\n" +
        "area.area='"+req.query['area'] +"' and floor.floor='"+req.query['floor'] +"'\n" +
        "ORDER BY number\n" +
        "asc"
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
router.get("/all", function (req, res, next) {
    // 查询所有入住信息
    var sql = "SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,username,sex,phone,checkoutdate,checkindate from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id\n" +
        "ORDER BY number\n" +
        "asc"
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
router.get("/phone", function (req, res, next) {
    // 查询用户住宿情况
    var sql = "SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,check.check_name,`character`.`character`,username,sex,phone,idcard,checkindate,checkoutdate,status from area,floor,apartment,information,`check`,`character`\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and   information.check_id=`check`.id and information.character_id=`character`.id and phone='"+req.query['phone'] +"'\n" +
        "LIMIT 1"
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

router.get("/dormitory", function (req, res, next) {
    // 查询用户宿舍情况
    var sql = "SELECT information.id,area.area,floor.floor,apartment.number,apartment.available,username,sex,phone,checkindate,checkoutdate from area,floor,apartment,information\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and information.number_id=apartment.id and  area.area=(SELECT area.area FROM information,area where phone='"+req.query['phone'] +"' and information.area_id=area.id) and floor.floor=(SELECT floor.floor FROM information,floor where phone='"+req.query['phone'] +"' and information.floor_id=floor.id) and apartment.number=(SELECT apartment.number FROM information,apartment where phone='"+req.query['phone'] +"' and information.number_id=apartment.id) "
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

router.get("/numbers", function (req, res, next) {
    // 查询所有宿舍情况
    var sql = "SELECT area.area , floor.floor , number from area,floor,apartment\n" +
        "where apartment.area=area.id and apartment.floor=floor.id\n" +
        "ORDER BY area.area"
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
router.get("/houses", function (req, res, next) {
    // 查询区域楼层所有宿舍
    var sql = "SELECT area.area , floor.floor , number from area,floor,apartment\n" +
        "where apartment.area=area.id and apartment.floor=floor.id and area.area='"+req.query['area'] +"' and floor.floor='"+req.query['floor'] +"'\n" +
        "ORDER BY area.area"
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

router.get("/checkinpeople", function (req, res, next) {
    // 查询房间入住人员
    var sql = "SELECT area.area,floor.floor,apartment.number,idcard,`check`.check_name,`character`.`character`,username,sex,phone,checkindate,checkoutdate \n" +
        "from area,floor,apartment,information,`check`,`character`\n" +
        "where apartment.area=area.id and check.id=information.check_id and `character`.id=information.character_id and apartment.floor=floor.id and information.number_id=apartment.id and\n" +
        "area.area='"+req.query['area'] +"' and floor.floor='"+req.query['floor'] +"' and number='"+req.query['number'] +"'\n" +
        "ORDER BY checkindate\n" +
        "asc"
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

router.get("/stayIn", function (req, res, next) {
    // 查询当前房间的入住情况
    var sql = "SELECT area.area , floor.floor , apartment.number ,count(information.number_id) as present , available\n" +
        "from area,floor,apartment,information\n" +
        "WHERE area.id=apartment.area and floor.id=apartment.floor and apartment.id=information.number_id\n" +
        "GROUP BY area.area , floor.floor , apartment.number , available\n" +
        "ORDER BY area.area,floor.floor,apartment.number\n" +
        "asc"
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

router.get("/stub", function (req, res, next) {
    // 查询存根数据
    var sql = "SELECT * from stub"
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

router.post("/", function (req, res, next) {
    // 删除具体入住人员
    var sql = "DELETE from information where username='"+req.query['username'] +"'"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Insert error', err.message)
            return;
        }
        res.end('Delete success.');
    })
});

router.post("/stub", function (req, res, next) {
    // 添加入住人员
    var sql = "INSERT INTO stub (area,floor,number,username,checkname,stub.character,sex,phone,checkindate,checkoutdate,checkdeletedate)\n" +
        "values ('"+req.query['area'] +"','"+req.query['floor'] +"','"+req.query['number'] +"','"+req.query['username'] +"','"+req.query['checkname'] +"','"+req.query['character'] +"','"+req.query['sex'] +"','"+req.query['phone'] +"','"+req.query['checkindate'] +"',CURRENT_DATE,CURRENT_DATE)"
    connection.query(sql, function (err, result){
        if (err) {
            console.log('Insert stub error', err.message)
            return;
        }
        res.end('Insert stub success.');
    })
});

module.exports = router;
