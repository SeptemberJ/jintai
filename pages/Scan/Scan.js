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
      success: (res) => {
        console.log(res.result)
        this.setData({
          realCode: res.result.split(',')[0]
        })
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
    wx.showModal({
      title: '提示',
      content: '确定提交?',
      success: (res) => {
        if (res.confirm) {
          console.log(this)
          this.SureSubmit()
        }
      }
    })
  },
  SureSubmit () {
    requestPromisified({
      url: app.globalData.url + 'updateorder?mobile=' + app.globalData.phone + '&fname=' + app.globalData.userName + '&fbillno=' + this.data.realCode + '&usertype=' + app.globalData.usertype,
      method: 'POST',
      data: {},
    }).then((res) => {
      console.log('updateorder--------------')
      if (res.data.code == 1) {
        wx.showToast({
          title: '提交成功!',
          icon: 'success',
          duration: 1500
        })
        this.setData({
          realCode: ''
        })
      } else if (res.data.code == 2) {
        wx.showToast({
          image: '../../images/attention.png',
          title: '已提交过！',
          duration: 1500
        })
      } else {
        wx.showToast({
          image: '../../images/attention.png',
          title: '提交失败！',
          duration: 1500
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