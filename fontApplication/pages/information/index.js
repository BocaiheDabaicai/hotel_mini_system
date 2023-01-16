// pages/information/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status_info:'none',
    status_picture:'block',
    status_admin:false,
    username:'',
    phone:'',
    sex:'',
    idcard:'',
    apartment:'',
    floor:'',
    number:'',
    checkInDate:'',
    checkOutDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.checkStatus);
    if(app.globalData.username!=''&&app.globalData.adminStatus===false&&app.globalData.checkStatus===1){
      this.setData({
        username:app.globalData.username,
        phone:app.globalData.phone,
        sex:app.globalData.sex,
        idcard:app.globalData.idcard,
        apartment:app.globalData.apartment,
        floor:app.globalData.floor,
        number:app.globalData.number,
        checkInDate:app.globalData.checkInDate,
        checkOutDate:app.globalData.checkOutDate,
        checkName:app.globalData.checkName,
        status_info:'block',
        status_picture:'none',
      })
    }
    if (app.globalData.adminStatus===true) {  
      this.setData({
        status_info:'none',
        status_picture:'none',
        status_admin:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})