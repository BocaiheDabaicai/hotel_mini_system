// components/peopleCard/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{},
  },

  /**
   * 组件的初始数据
   */
  data: {
    changeModal:false,
    username:'',
    sex:'',
    phone:'',
    idcard:'',
    area:'',
    floor:'',
    number:'',
    checkindate:'',
    checkoutdate:'',
    checkname:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDepartment:function (){
      var that = this
      console.log(this.data.list);
      var myEventDetail = that.data.list // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      wx.showModal({
        title: '提示',
        content: '确认删除了吗？',
        success (res) {
          if (res.confirm) {
            console.log('that.data.list',that.data.list);
            that.triggerEvent('departmentevent', myEventDetail, myEventOption)
            wx.request({
              // 
              url: 'https://hotel.nanfangruye.com/details?username='+that.data.list['username'],
              method:'POST',
              success(res){
                console.log(res);
              }
            })
            wx.request({
              url: 'https://hotel.nanfangruye.com/details/stub?area='+that.data.list['area']+'&floor='+that.data.list['floor']+'&number='+that.data.list['number']+'&username='+that.data.list['username']+'&checkname='+that.data.list['check_name']+'&character='+that.data.list['character']+'&sex='+that.data.list['sex']+'&phone='+that.data.list['phone']+'&checkindate='+that.data.list['checkindate'],
              method:'POST',
              success(res){
                console.log(res);
              }
            })
            console.log('需要存根');
          }
        }
      })
    },
    onChangeData(){
      // console.log(this.data.list);
      this.setData({
        changeModal:true,
        username:this.data.list['username'],
        sex:this.data.list['sex'],
        phone:this.data.list['phone'],
        idcard:this.data.list['idcard'],
        area:this.data.list['area'],
        floor:this.data.list['floor'],
        number:this.data.list['number'],
        checkindate:this.data.list['checkindate'],
        checkoutdate:this.data.list['checkoutdate'],
        checkname:this.data.list['check_name']
      })
    },
    onChangeDataConfirm(){
      console.log('here');
      var that = this
      var myEventDetail = {
        newusername:this.data.username,
        sex:this.data.sex,
        phone:this.data.phone,
        idcard:this.data.idcard,
        area:this.data.area,
        floor:this.data.floor,
        number:this.data.number,
        checkindate:this.data.checkindate,
        checkoutdate:this.data.checkoutdate,
        checkname:this.data.checkname,
        oldusername:this.data.list['username']
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      that.triggerEvent('changeevent', myEventDetail, myEventOption)
      wx.request({
        url: 'https://hotel.nanfangruye.com/addinformation/update?newusername='+myEventDetail['newusername']+'&sex='+myEventDetail['sex']+'&idcard='+myEventDetail['idcard']+'&phone='+myEventDetail['phone']+'&checkindate='+myEventDetail['checkindate']+'&checkname='+myEventDetail['checkname']+'&area='+myEventDetail['area']+'&floor='+myEventDetail['floor']+'&number='+myEventDetail['number']+'&oldusername='+myEventDetail['oldusername']+'',
        method:'POST',
        success(res){
          console.log(res);
        }
      })
      this.setData({changeModal:false})
    },
    onChangeClose(){
      this.setData({changeModal:false})
    },
    onSexChange({detail}){
      this.setData({sex:detail})
    }
  }
})
