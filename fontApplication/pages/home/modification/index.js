// pages/home/modification/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList:app.globalData.areaList,
    title:'',
    testObject:[]
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onCancel(){
    this.setData({ show: false });
  },
  onConfirm(event){
    var datas
    if (event.length==3){
      datas = event
    }else{
      datas = event.detail.values
    }
    var that = this
    this.setData({ show: false,title:datas[0]['name']+' '+datas[1]['name']+' '+datas[2]['name']});
    wx.request({
      url: 'https://hotel.nanfangruye.com/details/checkinpeople',
      method:'GET',
      data:{
        'area':datas[0]['name'],
        'floor':datas[1]['name'],
        'number':datas[2]['name']
      },
      success(res){
        console.log(res.data);
        that.setData({testObject:res.data})
      }
    })
  },
  onDepartmentCard:function (e) {
    console.log('触发卡片的离宿功能');
    // console.log('testObject',this.data.testObject);
    // console.log('监听获取的对象',e.detail);
    for(var i=0;i<this.data.testObject.length;i++){
      if (this.data.testObject[i]['username']==e.detail['username']) {
        var list = this.data.testObject
        list.splice(i,1)
        this.setData({testObject:list})
      }
    }
    // console.log('修改后 '+this.data.testObject);
  },
  onChangeCard(e){
    console.log('触发卡片的修改功能');
    console.log(e.detail);
    for(var i=0;i<this.data.testObject.length;i++){
      if (this.data.testObject[i]['username']==e.detail['oldusername']) {
        var list = this.data.testObject
        list[i]['username']=e.detail['newusername']
        list[i]['sex']=e.detail['sex']
        list[i]['phone']=e.detail['phone']
        list[i]['idcard']=e.detail['idcard']
        list[i]['area']=e.detail['area']
        list[i]['floor']=e.detail['floor']
        list[i]['number']=e.detail['number']
        list[i]['checkname']=e.detail['checkname']
        list[i]['checkindate']=e.detail['checkindate']
        list[i]['checkoutdate']=e.detail['checkoutdate']
        console.log(list[i]);
        this.setData({testObject:list})
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options['number']!=null) {
      console.log(options);
      this.onConfirm(
        [
          {'name':options['area']},
          {'name':options['floor']},
          {'name':options['number']},
        ]
      )
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