// app.js
var areaList = {
  province_list: {
    110000: '员工宿舍',
    120000: '招待所',
  },
  city_list: {
    110100: '一楼',
    110200: '二楼',
    110300: '三楼',
    110400: '四楼',
    110500: '五楼',
    110600: '六楼',
    120200: '二楼',
    120300: '三楼',
    120400: '四楼',
  },
  county_list: {
    110101: '101',
    110102: '102',
    110103: '103',
    110104: '104',
    110105: '105',
    110106: '106',
    110107: '107',
    110108: '108',
    110109: '109',
    110110: '110',
    110111: '111',
    110112: '112',
    110113: '113',
    110114: '114',
    110115: '115',
    110116: '116',
    110117: '117',
    110118: '118',
    110119: '119',
    110120: '120',
    110121: '121',
    110122: '122',
    110123: '123',
    110124: '124',
    110125: '125',
    110126: '126',
    110127: '127',
    110128: '128',
    110129: '129',
    110130: '130',

    110201: '201',
    110202: '202',
    110203: '203',
    110204: '204',
    110205: '205',
    110206: '206',
    110207: '207',
    110208: '208',
    110209: '209',
    110210: '210',
    110211: '211',
    110212: '212',
    110213: '213',
    110214: '214',
    110215: '215',
    110216: '216',
    110217: '217',
    110218: '218',
    110219: '219',
    110220: '220',
    110221: '221',
    110222: '222',
    110223: '223',
    110224: '224',
    110225: '225',
    110226: '226',
    110227: '227',
    110228: '228',
    110229: '229',
    110230: '230',
    
    110301: '301',
    110302: '302',
    110303: '303',
    110304: '304',
    110305: '305',
    110306: '306',
    110307: '307',
    110308: '308',
    110309: '309',
    110310: '310',
    110311: '311',
    110312: '312',
    110313: '313',
    110314: '314',
    110315: '315',
    110316: '316',
    110317: '317',
    110318: '318',
    110319: '319',
    110320: '320',
    110321: '321',
    110322: '322',
    110323: '323',
    110324: '324',
    110325: '325',
    110326: '326',
    110327: '327',
    110328: '328',
    110329: '329',
    110330: '330',

    110401: '401',
    110402: '402',
    110403: '403',
    110404: '404',
    110405: '405',
    110406: '406',
    110407: '407',
    110408: '408',
    110409: '409',
    110410: '410',
    110411: '411',
    110412: '412',
    110413: '413',
    110414: '414',
    110415: '415',
    110416: '416',
    110417: '417',
    110418: '418',
    110419: '419',
    110420: '420',
    110421: '421',
    110422: '422',
    110423: '423',
    110424: '424',
    110425: '425',
    110426: '426',
    110427: '427',
    110428: '428',
    110429: '429',
    110430: '430',

    110501: '501',
    110502: '502',
    110503: '503',
    110504: '504',
    110505: '505',
    110506: '506',
    110507: '507',
    110508: '508',
    110509: '509',
    110510: '510',
    110511: '511',
    110512: '512',
    110513: '513',
    110514: '514',
    110515: '515',
    110516: '516',
    110517: '517',
    110518: '518',
    110519: '519',
    110520: '520',
    110521: '521',
    110522: '522',
    110523: '523',
    110524: '524',
    110525: '525',
    110526: '526',
    110527: '527',
    110528: '528',
    110529: '529',
    110530: '530',

    110601: '601',
    110602: '602',
    110603: '603',
    110604: '604',
    110605: '605',
    110606: '606',
    110607: '607',
    110608: '608',
    110609: '609',
    110610: '610',
    110611: '611',
    110612: '612',
    110613: '613',
    110614: '614',
    110615: '615',
    110616: '616',
    110617: '617',
    110618: '618',
    110619: '619',
    110620: '620',
    110621: '621',
    110622: '622',
    110623: '623',
    110624: '624',
    110625: '625',
    110626: '626',
    110627: '627',
    110628: '628',
    110629: '629',
    110630: '630',

    120202: '202',
    120203: '203',
    120204: '204',
    120205: '205',
    120206: '206',
    120208: '208',
    120209: '209',
    120210: '210',
    120211: '211',

    120301: '301',
    120302: '302',
    120303: '303',
    120304: '304',
    120305: '305',
    120306: '306',
    120307: '307',
    120308: '308',
    120309: '309',
    120310: '310',
    120311: '311',
    120312: '312',
    120313: '313',
    120314: '314',
    120315: '315',
    120316: '316',
    120317: '317',
    120318: '318',
    120319: '319',
    120320: '320',

    120401: '401',
    120402: '402',
    120403: '403',
    120404: '404',
    120405: '405',
    120406: '406',
    120407: '407',
    120408: '408',
    120409: '409',
    120410: '410',
    120411: '411',
    120412: '412',
    120413: '413',
    120414: '414',
    120415: '415',
    120416: '416',
    120417: '417',
    120418: '418',
    120419: '419',
    120420: '420',
  },
};

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    // 初始登记入住信息
    // 管理员状态、登记入住状态、入住人员列表、房间列表
    userInfo: null,
    username:'',
    phone:'',
    sex:'',
    idcard:'',
    apartment:'',
    floor:'',
    number:'',
    checkInDate:'',
    checkOutDate:'',
    checkName:'',
    checkStatus:'',
    adminStatus:false,
    registerStatus:true,
    personList:{},
    areaList
  }
})
