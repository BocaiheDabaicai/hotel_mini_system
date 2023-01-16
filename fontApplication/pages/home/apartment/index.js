const app = getApp()

Page({
  data: {
    // 初始化数据
    areaList:app.globalData.areaList,
    value:'',
    show:false,
    presentList:[],
    targetValue:{}
  },
  onConfirm(event){
    // 确认之后，更新状态
    // 请求房间数据
    // 对比并更新入住人数
    this.setData({value:event.detail.values[0]['name']+' '+event.detail.values[1]['name'],
    targetValue:{
      'area':event.detail.values[0]['name'],
      'floor':event.detail.values[1]['name'],
    }
  })
    var presentList=[]
    wx.request({
      url: 'https://hotel.nanfangruye.com/details/houses',
      method:'GET',
      data:{
        'area':event.detail.values[0]['name'],
        'floor':event.detail.values[1]['name']
      },
      success(res){
        presentList=res.data
      }
    })

    wx.request({
      url: 'https://hotel.nanfangruye.com/details/stayIn',
      method:'GET',
      success(res){
        for(var i=0;i<presentList.length;i++){
            presentList[i]={area: presentList[i]['area'], floor: presentList[i]['floor'], number: presentList[i]['number'], present: 0, available: 2}
          }
        for(var i=0;i<res.data.length;i++){
          for(var j=0;j<presentList.length;j++){
            if (res.data[i]['number']==presentList[j]['number']) {
              presentList[j]['present']=res.data[i]['present']
            }
          }
        }
          setTimeout(()=>{
            console.log(presentList);
          },2000)   
      }
    })
    wx.showToast({
      title: '设置成功',
      icon:'success',
      duration:1000
    })
    setTimeout(()=>{
      this.setData({show:false,presentList:presentList})
    },1000) 
  },
  showPopup(){
    this.setData({show:true})
  },
  onClose(){
    this.setData({show:false})
  },
  onCancel(){
    this.setData({show:false})
  }

});