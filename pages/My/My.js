// pages/My/My.js
var app = getApp()
Page({
  data: {
    userInfo: null,
    phone: null
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      phone: app.globalData.phone
    })
  },
  Logout () {
    wx.redirectTo({
      url: '../Login/Login',
    })
  }
})