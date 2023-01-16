// components/footerBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // console.log('using...',event.detail)
      // this.setData({ active: event.detail });
      if(event.detail===0){
        wx.redirectTo({
          url: '/pages/home/index',
        })
      }
      else if(event.detail===1){
        wx.redirectTo({
          url: '/pages/information/index',
        })
      }
      else if(event.detail===2){
        wx.redirectTo({
          url: '/pages/myconfig/index',
        })
      }
    },
  }
})
