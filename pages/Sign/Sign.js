// pages/Sign/Sign.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    name: 'liubai', // liubai
    phone: '18234567890' // 18234567890
  },
  onLoad: function (options) {

  },
  onShow: function () {
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
    wx.showLoading({
      title: '提交中',
    })
    requestPromisified({
      url: app.globalData.url + '/userInsert?nickname=' + app.globalData.userInfo.nickName + '&head_img=' + app.globalData.userInfo.avatarUrl + '&open_id=' + app.globalData.openid + '&fname=' + this.data.name + '&mobile=' + this.data.phone,
      data: {},
      method: 'GET',
    }).then((res) => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '注册成功!',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }
    }).catch((res) => {
      wx.hideLoading()
      console.log(res)
      wx.showToast({
        image: '../../images/attention.png',
        title: '服务器繁忙！',
        duration: 2000
      })
    })
  }
})