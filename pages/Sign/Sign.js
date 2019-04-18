// pages/Sign/Sign.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    name: '', // liubai
    phone: '' // 18234567890
  },
  onLoad: function (options) {

  },
  onShow: function () {
    console.log(app.globalData.userInfo)
  },
  ChangeName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  ChangePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  GoSign () {
    // 输入验证
    if (!this.data.name) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '请输入姓名！',
        duration: 2000
      })
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '手机号不正确！',
        duration: 2000
      })
      return false
    }
    var info = {
      nickname: app.globalData.userInfo.nickName,
      head_img: app.globalData.userInfo.avatarUrl,
      open_id: app.globalData.openid,
      fname: this.data.name,
      mobile: this.data.phone
    }
    console.log(info)
    // requestPromisified({
    //   url: app.globalData.url + '/userInsert?nickname=' + app.globalData.userInfo.nickName + '&head_img=' + app.globalData.userInfo.avatarUrl + '&open_id=' + '&fname=' + this.data.name + '&mobile=' + this.data.phone,
    //   data: {},
    //   method: 'GET',
    // }).then((res) => {
    //   console.log('getOpen_id--------------')
    //   console.log(res.data)
    // }).catch((res) => {
    //   wx.hideLoading()
    //   console.log(res)
    //   wx.showToast({
    //     image: '../../images/attention.png',
    //     title: '服务器繁忙！',
    //     duration: 2000
    //   })
    // })
    wx.navigateBack()
  }

})