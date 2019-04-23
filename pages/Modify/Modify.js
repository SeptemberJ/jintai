// pages/Modify/Modify.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    phone: '',
    psdOld: '111',
    psd: '222',
    psdAgain: '222'
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.setData({
      phone: app.globalData.phone
    })
  },
  ChangePsdOld(e) {
    this.setData({
      psdOld: e.detail.value
    })
  },
  ChangePsd(e) {
    this.setData({
      psd: e.detail.value
    })
  },
  ChangePsdAgain(e) {
    this.setData({
      psdAgain: e.detail.value
    })
  },
  Modify() {
    // 输入验证
    if (!this.data.psdOld) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '请输入旧密码！',
        duration: 2000
      })
      return false
    }
    if (this.data.psd != this.data.psdAgain) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '密码不一致！',
        duration: 2000
      })
      return false
    }
    wx.showLoading({
      title: '提交中',
    })
    requestPromisified({
      url: app.globalData.url + '/backFpassword?&mobile=' + this.data.phone + '&fpasswordOld=' + this.data.psdOld + '&fpasswordNew=' + this.data.psd,
      data: {},
      method: 'POST',
    }).then((res) => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '修改成功!',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../Login/Login',
          })
        }, 1000)
      } else {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          image: '../../images/attention.png',
          title: '修改失败！',
          duration: 2000
        })
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