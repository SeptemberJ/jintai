// pages/Login/Login.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    phone: '', // 18234567891
    psd: '', // 222
    ifShowBt: false
  },
  onLoad: function (options) {

  },

  onShow: function () {
    wx.login({
      success: (res) => {
        console.log(res)
        this.getOpenid(res.code)
        wx.getUserInfo({
          success: (res) => {
            this.setData({
              ifShowBt: false
            })
            console.log('用户信息获取成功！')
            console.log(res)
            app.globalData.userInfo = res.userInfo
          },
          fail: (res) => {
            console.log("用户信息获取失败！")
            this.setData({
              ifShowBt: true
            })
          }
        })
      },
      fali: (res) => {
        console.log(res)
      }
    })
  },
  bindgetuserinfo(e) {
    if (e.detail.userInfo) {
      wx.login({
        success: res => {
          // console.log(res)
          this.setData({
            ifShowBt: false
          })
        }
      })
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      })
    }
  },
  getOpenid(CODE) {
    console.log(app.globalData.url)
    requestPromisified({
      url: app.globalData.url + 'getOpen_id?code=' + CODE,
      data: {},
      method: 'GET',
    }).then((res) => {
      console.log('getOpen_id--------------')
      console.log(res.data.openid)
      app.globalData.openid = res.data.openid
    }).catch((res) => {
      wx.hideLoading()
      console.log(res)
      wx.showToast({
        image: '../../images/attention.png',
        title: '服务器繁忙！',
        duration: 2000
      })
    })
  },
  ChangePhone (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  ChangePsd(e) {
    this.setData({
      psd: e.detail.value
    })
  },
  Login () {
    wx.showLoading({
      title: ' 登陆中',
    })
    requestPromisified({
      url: app.globalData.url + '/userLogin?mobile=' + this.data.phone + '&fpassword=' + this.data.psd,
      method: 'POST',
      data: {},
    }).then((res) => {
      console.log(res.data)
      if (res.data.code == 1) {
        app.globalData.phone = this.data.phone
        app.globalData.userName = res.data.memberInfo.fname
        app.globalData.usertype = res.data.memberInfo.usertype
        wx.switchTab({
          url: '../Scan/Scan'
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          image: '../../images/attention.png',
          title: '账号错误！',
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
  },
  GoSign () {
    wx.navigateTo({
      url: '../Sign/Sign',
    })
  }
})