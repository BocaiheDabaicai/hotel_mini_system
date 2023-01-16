// pages/home/index.js
const app = getApp()
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    //轮播图设置
    dataTest:[1,2,3],
    indicatorDots:true,
    indicatorActiveColor: "#00BFFF",
    autoPlay:true,
    duration:5000,
    circular:true,
    interval:5000,
    // 控制管理员功能模块的显示
    controlModal:false
  },
  onLoad(){
    // 不为管理员的条件 触发 获取入住人员的信息
    console.log('In home\n',app.globalData.phone,app.globalData.adminStatus);
    if (app.globalData.adminStatus==false){
      wx.request({
        url: 'https://hotel.nanfangruye.com/details/phone',
        method:'GET',
        data:{
          'phone':app.globalData.phone
        },
        success(res){
          console.log(res.data);
          console.log(res.data.length==1?'获取到信息':'暂无入住信息');
          if (res.data.length==1){
              app.globalData.username=res.data[0]['username'],
              app.globalData.phone=res.data[0]['phone'],
              app.globalData.sex=res.data[0]['sex'],
              app.globalData.idcard=res.data[0]['idcard'],
              app.globalData.apartment=res.data[0]['area'],
              app.globalData.floor=res.data[0]['floor'],
              app.globalData.number=res.data[0]['number'],
              app.globalData.checkInDate=res.data[0]['checkindate'],
              app.globalData.checkOutDate=res.data[0]['checkoutdate']
              app.globalData.checkName=res.data[0]['check_name']
              app.globalData.checkStatus=res.data[0]['status']
              app.globalData.registerStatus=false
          }
        }
      })
    }
    this.setData({controlModal:app.globalData.adminStatus})
    // console.log('did home',this.data.controlModal,app.globalData.adminStatus);
  },
  OnClickSituation(){
    // 房间情况 绑定 点击事件
    // 获取房间入住人员情况
    wx.request({
      url: 'https://hotel.nanfangruye.com/details/dormitory',
      method:'GET',
      data:{
        'phone':app.globalData.phone
      },
      success(res){
        app.globalData.personList = res.data
      }
    })
    setTimeout(()=>{
      // console.log(app.globalData.personList);
    },2000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  
})
