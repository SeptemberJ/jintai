// pages/Login/Login.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()
Page({
  data: {
    phone: '',// 18234567891
    ifShowBt: false
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res)
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
    console.log(CODE)
    console.log(app.globalData.url)
    // requestPromisified({
    //   url: app.globalData.url + 'getOpen_id?code=' + CODE,
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
  },
  ChangePhone (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  GoLogin () {
    wx.switchTab({
      url: '../Scan/Scan'
    })
  },
  Login () {
    requestPromisified({
      url: 'http://116.62.171.244:8082/yingsu/rest/orderController/orderList?number=10&page_num=1&main_usercode=yingsu0028',
      data: {},
      method: 'GET',
      header: {
        'X-AUTH-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxODczNDU2Nzg5MCIsInN1YiI6IjE4NzM0NTY3ODkwIiwiaWF0IjoxNTU1NTQ4MjkwfQ.pPRkuSojaCRhQbDgfQleju8SA5ImsxVQLqKBgzz_lho',
      },
    }).then((res) => {
      console.log(res.data)
      // app.globalData.phone = this.data.phone
      // app.globalData.userName = res.data
      
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})