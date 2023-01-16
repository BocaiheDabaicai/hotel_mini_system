// pages/home/register/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 记录登记信息
    // 显示弹窗、设置日期选择区间
    // 可否进行登记的状态
    show:false,
    date:'',
    showAFN:false,
    username:'',
    phone:'',
    sex:'',
    idcard:'',
    apartment:'',
    floor:'',
    number:'',
    checkInDate:'',
    checkOutDate:'',
    areaList:app.globalData.areaList,
    typeList:['短住','长住'],
    typeColumns:'',
    fileList: [],
    material:'',
    infoStatus:true,
    showStatus:false,
    steps: [
      {
        text: '已登记',
      },
      {
        text: '已核实',
      },
      {
        text: '已入住',
      }
    ],
  },
  //文本框
  onNameChange(e){
    this.setData({username:e.detail})
  },
  onPhoneChange(e){
    this.setData({phone:e.detail})
  },
  onSexChange(e){
    this.setData({sex:e.detail})
  },
  onIdcardChange(e){
    this.setData({idcard:e.detail})
  },
  //下拉框
  onClickAFN() {
    this.setData({ showAFN: true });
  },
  onCloseAFN() {
    this.setData({ showAFN: false });
  },
  cancelArea(){
    this.setData({ showAFN: false });
  },
  confirmArea(e){
    // console.log(e.detail.values);
    this.setData({
      apartment:e.detail.values[0]['name'],
      floor:e.detail.values[1]['name'],
      number:e.detail.values[2]['name'],
    })
    this.setData({ showAFN: false });
  },
  // 入住类型
  onTypeCancel(){
    this.setData({ show: false });
  },
  onTypeConfirm(event){
    const { value, index } = event.detail;
    console.log(value,index);
    this.setData({ typeColumns:value ,show: false });
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 上传材料
  afterRead(event) {
    var that = this
    const { file } = event.detail;
    console.log(file,file['url'].length);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://hotel.nanfangruye.com/newinformation/upload',
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        // 从后端接过来的数据，当前未使用
        // 图片上传前端流程基本实现
        // 需要写查询语句、后端语句进行进一步测试
        // 保存图片连接
        // 已完成，要求图片色域为7比特与大小在1MB以内
        // console.log(res.data);
        var dataJson = JSON.parse(res.data)
        console.log(dataJson);
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: file.url});
        that.setData({ fileList ,material:dataJson['filename']});
      },
    });
  },
  previewFile(event){
    console.log(event.detail.index);
  },
  deleteFile(event){
    var tempFileList = this.data.fileList
    tempFileList = tempFileList.filter((item,index)=>{
      // console.log(index,item);
      return index != event.detail.index
    })
    this.setData({fileList:tempFileList})
  },

  backHome(){
    wx.redirectTo({
      url: '../index',
    })
  },
  enterList(){
    var username=this.data.username
    var phone=this.data.phone
    var sex=this.data.sex
    var idcard=this.data.idcard
    var apartment=this.data.apartment
    var floor=this.data.floor
    var number=this.data.number
    // 修改之后，不需要主动填写登记日期、离开日期
    var checkInDate=this.data.checkInDate
    var checkOutDate=this.data.checkOutDate
    var typeColumns=this.data.typeColumns
    var material=this.data.material
    wx.showModal({
      title: '温馨提示',
      content: '确定这是你的选择了吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(username==''||phone==''||sex==''||idcard==''||apartment==''||floor==''||number==''||typeColumns==''||material==''){
            wx.showToast({
              title: '请检查填写内容',
              icon: 'error',
              duration: 2000
            })
          }
          else{
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            });
            app.globalData.username=username
            app.globalData.phone=phone
            app.globalData.sex=sex
            app.globalData.idcard=idcard
            app.globalData.apartment=apartment
            app.globalData.floor=floor
            app.globalData.number=number
            // 修改之后，不需要主动填写登记日期、离开日期
            app.globalData.checkInDate=checkInDate
            app.globalData.checkOutDate=checkOutDate
            if (app.globalData.adminStatus!=true) {
              //非管理人员触发，登记之后，无法再次使用
              app.globalData.registerStatus=false 
            }
            // 向数据库添加入住信息
            // 当前向数据库添加信息已经实现
            // 下一步，管理员使用该信息
            // 进行审核
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation?area='+apartment+'&floor='+floor+'&number='+number+'&username='+username+'&sex='+sex+'&idcard='+idcard+'&phone='+phone+'&character=用户&check_name='+typeColumns+'&material='+material+'&status=0',
              method:'POST',
              success(res){
                console.log(res.data);
              }
            })
            setTimeout(()=>{
              wx.navigateTo({
                url: '../index',
              });
            },2000);
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 进入页面时，获取全局变量
    // 并判断 是否提供入住登记功能
    this.setData({
      phone:app.globalData.phone,
      infoStatus: app.globalData.registerStatus,
      showStatus:app.globalData.checkStatus
      // app.globalData.registerStatus
    })
    console.log(this.data.showStatus);
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