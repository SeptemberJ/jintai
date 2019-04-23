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
    wx.showModal({
      title: '提示',
      content: '确定退出?',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../Login/Login',
          })
        }
      }
    })
  },
  ToModifyPsd () {
    wx.navigateTo({
      url: '../Modify/Modify',
    })
  }
})