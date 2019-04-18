// pages/Loading/Loading.js
Page({
  data: {
    ifShowBt: false
  },
  onLoad: function (options) {

  },
  bindgetuserinfo(e) {
    if (e.detail.userInfo) {
      this.getUserInfo()
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      })
    }
  },
  getUserInfo() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    console.log('index getUserInfo---')
    // return new Promise((resolve, reject) => {
    //   wepy.login().then((RES) => {
    //     wepy.getUserInfo().then((res) => {
    //       let UserData = {
    //         code: RES.code,
    //         userInfo: res.userInfo
    //       }
    //       let NewNickNameInfo = {
    //         type: 'nickName',
    //         newInfo: res.userInfo.nickName
    //       }
    //       this.methods.wxUserInfo(NewNickNameInfo)
    //       console.log('getuserinfo success')
    //       console.log(RES)
    //       console.log(res)
    //       resolve(UserData)
    //     }).catch((res) => {
    //       this.ifShowBt = true
    //       this.$apply()
    //     })
    //   }).catch(reject)
    // })
  },
  getOpenid(CODE) {
    // wepy.showLoading({
    //   title: '加载中'
    // })
    // return new Promise((resolve, reject) => {
    //   wepy.request({
    //     url: this.urlPre + '/getOpen_id?code=' + CODE,
    //     method: 'GET'
    //   }).then((res) => {
    //     wepy.hideLoading()
    //     console.log(res)
    //     this.$parent.globalData.openid = res.data.openid
    //     this.$apply()
    //     resolve(res.data.openid)
    //   }).catch((res) => {
    //     console.log(res)
    //     wepy.hideLoading()
    //     this.$invoke('toast', 'show', {
    //       title: '服务器繁忙！',
    //       img: '../../../images/icons/attention.png'
    //     })
    //   })
    // })
  }
})