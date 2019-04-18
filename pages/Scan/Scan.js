// pages/Scan/Scan.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    realCode: ''
  },
  onLoad: function (options) {

  },
  onShow: function () {
  },
  Scan () {
    wx.scanCode({
      success(res) {
        console.log(res.result.split(',')[0])
      }
    })
  },
  SbumitOrder () {
    if (!this.data.realCode) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '请先扫码！',
        duration: 2000
      })
      return false
    }
    requestPromisified({
      url: app.globalData.url + 'updateorder',
      data: {
        mobile: app.globalData.mobile,
        fname: app.globalData.userName,
        fbillno: this.data.realCode
      },
      method: 'POST',
    }).then((res) => {
      console.log('updateorder--------------')
      console.log(res.data)
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