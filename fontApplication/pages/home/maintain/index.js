Page({
  data: {
    username:'',
    area: '',
    number:'',
    apartment:'',
    phone:'',
    details:'',
    material:'',
    fileList:[],
  },
  uploadPicture(event){
    const that = this;
    const { file } = event.detail;
    console.log(file);
    wx.uploadFile({
      url: 'https://hotel.nanfangruye.com/newinformation/uploadMaintain',
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 已完成，要求图片色域为7比特与大小在1MB以内
        // console.log(res.data);
        var dataJson = JSON.parse(res.data)
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: file.url});
        that.setData({ fileList ,material:dataJson['filename']});
      },
    });
  },
  deletePicture({detail}){
    const {index} = detail
    var tempList = this.data.fileList
    tempList.splice(index,1)
    this.setData({fileList:tempList})
  },

  setName(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onAreaChange(e) {
    this.setData({
      area: e.detail
    });
  },

  setDorNumber(e) {
    this.setData({
      number: e.detail.value
    })
  },

  setDivision(e){
    this.setData({
      apartment: e.detail.value
    })
  },

  setPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  setDescription(e) {
    this.setData({
      details: e.detail.value
    })
  },

// 表单提交
  handleClick(e){
    const that = this
    if (this.validate()) {
      wx.showModal({
        title: '提示',
        content: '确认提交？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.showToast({
              title: '提交成功',
              duration: 1500
            })
            console.log(that.data);
            wx.request({
              url: 'https://hotel.nanfangruye.com/newinformation/maintain?username='+that.data.username+'&area='+that.data.area+'&number='+that.data.number+'&apartment='+that.data.apartment+'&phone='+that.data.phone+'&detail='+that.data.details+'&pictures='+that.data.material,
              method:'POST',
              success(res){
                console.log(res);
              }
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.redirectTo({
              url: '../index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },
// 信息验证
  validate() {
    let regex = /[1][3,4,5,7,8][0-9]{9}$/;
    if (this.data.username === '' || !this.data.username) {
      wx.showToast({
        title: '请填写申报人',
        icon: 'error',
        duration: 1000
      })
      return false;
    }

    if (this.data.area === '' || !this.data.area) {
      wx.showToast({
        title: '请选择宿舍区域',
        icon: 'error',
        duration: 1000
      })
      return false;
    }
    
    if (this.data.number === '' || !this.data.number) {
      wx.showToast({
        title: '请填写宿舍号',
        icon: 'error',
        duration: 1000
      })
      return false;
    }

    if(this.data.apartment === '' || !this.data.apartment){
      wx.showToast({
        title: '请填写部门',
        icon: 'error',
        duration: 1000
      })
      return false;
    }
    if (this.data.phone === '' || !this.data.phone) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'error',
        duration: 1000
      })
      return false;
    } 
    if (!regex.test(this.data.phone)) {
      wx.showToast({
        title: '请填写正确手机号',
        icon: 'error',
        duration: 1000
      })
      return false;
    }
 
    if (this.data.details === '' || !this.data.details) {
      wx.showToast({
        title: '请描述详细情况',
        icon: 'error',
        duration: 1000
      })
      return false;
    }
    return true;
  },



})