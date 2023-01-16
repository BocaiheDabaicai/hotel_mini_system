// components/checkCard/index.js
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
    username:'',
    sex:'',
    phone:'',
    idcard:'',
    area:'',
    floor:'',
    number:'',
    picture:'',
    detailShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheck(event){
      // 图片显示
      // 完成审核、筛选
      // 完成删除功能
      // 2022-11-24
      // xhun9CDgl0MUe9d6a18dee280798745f43abde73d04c.png
      console.log(this.data.item);
      var that = this
      wx.downloadFile({
        url: 'https://hotel.nanfangruye.com/newinformation/download?picture='+this.data.item['material'],
        success(res){
          console.log(res);
          that.setData({picture:res.tempFilePath})
        }
      })
      this.setData({detailShow:true})
    },
    onDialogConfirm(){
      const that = this
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      console.log('审核完毕');
      wx.request({
        url: 'https://hotel.nanfangruye.com/newinformation/update',
        method:'GET',
        data:{
          username:that.data.item['username'],
          idcard:that.data.item['idcard'],
          phone:that.data.item['phone'],
          status:1,
        },
        success(res){
          console.log(res);
        }
      })
      wx.showToast({
        title: '审核成功',
        icon: 'success',
        duration: 1500
      })
      that.triggerEvent('deleteUpdate',myEventDetail,myEventOption)
      this.setData({detailShow:false})
    },
    onDialogClose(){
      this.setData({detailShow:false})
    },
    onDelete(){
      const that = this
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      wx.showModal({
        title: '提示',
        content: '确认删除了吗？',
        success (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/stubcheck?area='+that.data.item['area']+'&floor='+that.data.item['floor']+'&number='+that.data.item['number']+'&username='+that.data.item['username']+'&sex='+that.data.item['sex']+'&checktype='+that.data.item['check_name']+'&status='+that.data.item['status']+'&phone='+that.data.item['phone']+'&checkindate='+that.data.item['checkindate']+'&checkoutdate='+that.data.item['checkoutdate']+'',
              method:'POST',
              success(res){
                console.log(res);
              }
            })
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/delete',
              method:'GET',
              data:{
                username:that.data.item['username'],
                idcard:that.data.item['idcard'],
                phone:that.data.item['phone']
              },
              success(res){
                console.log(res);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500
                })
                that.triggerEvent('deleteUpdate',myEventDetail,myEventOption)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
