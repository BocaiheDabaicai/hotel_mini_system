// components/maintainCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{}
  },

  /**
   * 组件的初始数据
   */
  data: {
    showStatus:false,
    disable:false,
    picture:'/images/logo.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShowPicture(){
      var that = this
      console.log(this.data.item);
      wx.downloadFile({
        url: 'https://hotel.nanfangruye.com/newinformation/downloadMaintain?picture='+this.data.item['picture_url'],
        success(res){
          that.setData({picture:res.tempFilePath})
          console.log(res);
        }
      })
      if (this.data.item['status']===1) {
         this.setData({disable:true}) 
      }
      this.setData({showStatus:true})
      console.log(this.data.disable);
    },
    onDealInformation(){
      var that = this
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      wx.showModal({
        title: '提示',
        content: '确认已经处理好了吗？',
        success (res) {
          if (res.confirm) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/updatemaintain',
              method:'GET',
              data:{
                username:that.data.item['applicant'],
                area:that.data.item['area'],
                number:that.data.item['number'],
              },
              success(res){
                console.log(res);
              }
            })
            that.triggerEvent('updateData',myEventDetail,myEventOption)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      this.setData({showStatus:false})
    },
    onDelete(){
      var that = this
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/stubmaintain?username='+that.data.item['applicant']+'&area='+that.data.item['area']+'&number='+that.data.item['number']+'&apartment='+that.data.item['apartment']+'&phone='+that.data.item['phone']+'&detail='+that.data.item['details']+'&pictures='+that.data.item['picture_url']+'&status='+that.data.item['status']+'',
              method:'POST',
              success(res){
                console.log(res);
              }
            })
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/deletemaintain',
              method:'GET',
              data:{
                username:that.data.item['applicant'],
                area:that.data.item['area'],
                number:that.data.item['number'],
              },
              success(res){
                console.log(res);
              }
            })
            that.triggerEvent('updateData',myEventDetail,myEventOption)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})