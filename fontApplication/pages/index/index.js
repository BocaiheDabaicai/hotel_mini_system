// index.js
// 获取应用实例
const app = getApp()
// console.log(app.globalData.userInfo);
// app.globalData.userInfo={'name':'jack','age':18}
// console.log(app.globalData.userInfo);
Page({
  data: {
    userInfo:{},
    phone:'',
    hasUserInfo:false,
    canIUseGetUserProfile: false,
    modalChecked:false,
    motto: 'Hello World',
    logo:'/images/logo.png',
    username:'',
    password:''
  },
  onLoad(options){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getPhoneNumber (e) {
    // 获取用户手机号码
    // 转入程序主界面
    console.log(e.detail.code)
    const userInfo=this.data.userInfo
    wx.request({
      url: 'https://hotel.nanfangruye.com/token?code='+e.detail.code,
      method:'GET',
      success(res){
        // console.log(res.data);
        app.globalData.phone=res.data
        // console.log(res.data,typeof res.data);
        if(typeof res.data=='number'&&userInfo!={}){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          })
          wx.navigateTo({
            url: '../home/index',
          })
        }
        else{
          wx.showToast({
            title: '请接受获取信息',
            icon: 'error',
            duration: 1500
          })
        }
      }
    })
  },
  // getUserProfile(e){
  //   wx.getUserProfile({
  //     desc:'用于获取用户的名称和头像',
  //     success:(res)=>{
  //       // console.log(res.userInfo);
  //       app.globalData.userInfo=res.userInfo
  //       this.setData({
  //         userInfo:res.userInfo,
  //         hasUserInfo:true
  //       })
  //     }
  //   })
   
  // },
  // 	
  //模式切换
  onChangeModal({ detail }) {
    // 需要手动对 checked 状态进行更新
    // console.log(detail);
    this.setData({ modalChecked: detail });
  },
  //接收用户名和密码
  onUsernameChange({detail}){
    // console.log(detail);
    this.setData({username:detail})
  },
  onPasswordChange({detail}){
    // console.log(detail);
    this.setData({password:detail})
  },
  //验证用户名和密码，并提供管理员服务
  onSubmit(){
    console.log('sumbit');
    var username = this.data.username;
    var password = this.data.password;
    // console.log(username,password);
    if(username!=='admin'&&password!==123456){
      wx.showToast({
        title: '请检查所填信息',
        icon: 'error',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      app.globalData.adminStatus=true
      setTimeout(()=>{
        // console.log('here');
        wx.redirectTo({
          url: '../home/index',
        });
      },2000);
    }
  }
})