//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '开始美好生活',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.hellocallback = res => {
      console.log('hello!!!' + res)
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,

      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {    //在app.js中定义userInfoReadyCallback方法
        console.log('userInfoReadyCallback_res',res)
        console.log('函数定义处的this',this)
        this.setData({
          userInfo: res.userInfo,

        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log('登陆按钮的e',e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: function (res1) {
        console.log('coderes', res1)
        if (res1.code) {
          wx.request({
            url: app.globalData.g_ip_wxclient + '/WXClientService/login/gologin',
            data: {
              code: res1.code,
              rawData: e.detail.rawData,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              signature: e.detail.signature,
              userInfo: e.detail.userInfo,
            },
            success: function (res) {
              wx.setStorageSync('sessionid', res.data.data.sessionId)
              wx.setStorageSync('userid', res.data.data.userId)
              app.globalData.g_sessionid = wx.getStorageSync('sessionid')
              app.globalData.g_userid = wx.getStorageSync('userid')
              console.log('this is sessionid:')
              console.log(app.globalData.g_sessionid)
              console.log('this is userid')
              console.log(app.globalData.g_userid)
              wx.navigateBack({
                
              })
            }
          })
        }
      }
  })
  }
})
