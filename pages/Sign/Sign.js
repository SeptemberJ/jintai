// pages/Sign/Sign.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    name: '', // liubai
    phone: '', // 18234567891
    psd: '',
    psdAgain: '',
    role: '0',
    items: [
      { name: '2', value: '司机', checked: 'true'},
      { name: '1', value: '用户'}
    ]
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
  radioChange (e) {
    this.setData({
      role: e.detail.value
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
    if (this.data.psd != this.data.psdAgain) {
      wx.showToast({
        image: '../../images/attention.png',
        title: '密码不一致！',
        duration: 2000
      })
      return false
    }
    var info = {
      nickname: app.globalData.userInfo.nickName,
      head_img: app.globalData.userInfo.avatarUrl,
      open_id: app.globalData.openid,
      fname: this.data.name,
      mobile: this.data.phone,
      fpassword: this.data.psd,
      role: this.data.role
    }
    console.log(info)
    wx.showLoading({
      title: '提交中',
    })
    requestPromisified({
      url: app.globalData.url + '/userInsert?nickname=' + app.globalData.userInfo.nickName + '&head_img=' + app.globalData.userInfo.avatarUrl + '&open_id=' + app.globalData.openid + '&fname=' + this.data.name + '&mobile=' + this.data.phone + '&fpassword=' + this.data.psd + '&usertype=' + this.data.role,
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
      } else if (res.data.code == 2) {
        wx.hideLoading()
        wx.showToast({
          image: '../../images/attention.png',
          title: '用户已存在!！',
          duration: 2000
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          image: '../../images/attention.png',
          title: '注册失败！',
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