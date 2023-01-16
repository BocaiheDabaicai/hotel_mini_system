// pages/home/maintainshow/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '全部区域', value: 0 },
      { text: '员工宿舍', value: 1 },
      { text: '招待所', value: 2 },
    ],
    option2: [
      { text: '全部状态', value: 0 },
      { text: '未处理', value: 1 },
      { text: '已处理', value: 2 },
    ],
    value1: 0,
    value2: 0,
    area:undefined,
    status:undefined,
    mockList:[],
  },
  onAreaChange({detail}){
    const that = this
    console.log(detail);
    switch (detail) {
      case 1:
        this.setData({area:'员工宿舍'})
        break;
      case 2:
        this.setData({area:'招待所'})
        break;
      default:
        this.setData({area:undefined})
        break;
    }
    wx.request({
      url: 'https://hotel.nanfangruye.com/newinformation/maintain',
      method:'GET',
      data:{
        area:this.data.area,
        status:this.data.status
      },
      success(res){
        console.log(res.data);
        that.setData({mockList:res.data})
      }
    })
  },
  onStatusChange({detail}){
    const that = this
    console.log(detail);
    switch (detail) {
      case 1:
        this.setData({status:0})
        break;
      case 2:
        this.setData({status:1})
        break;
      default:
        this.setData({status:undefined})
        break;
    }
    wx.request({
      url: 'https://hotel.nanfangruye.com/newinformation/maintain',
      method:'GET',
      data:{
        area:this.data.area,
        status:this.data.status
      },
      success(res){
        console.log(res.data);
        that.setData({mockList:res.data})
      }
    })
  },
  updateData(){
    var that = this
    wx.request({
      url: 'https://hotel.nanfangruye.com/newinformation/maintain',
      method:'GET',
      data:{
        area:this.data.area,
        status:this.data.status
      },
      success(res){
        console.log(res.data);
        that.setData({mockList:res.data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://hotel.nanfangruye.com/newinformation/maintain',
      method:'GET',
      success(res){
        console.log(res.data);
        that.setData({mockList:res.data})
      }
    })
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