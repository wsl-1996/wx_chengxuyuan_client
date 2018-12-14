// import redpackettemplate from '../template/redpackettemplate/redpackettemplate.js'
var util = require('../../utils/util.js')
var postsData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    productlist: [{
      "id": "1716e7f5fb8041cf9a750a8964dd1d3a",
      "productType": 0,
      "productName": "alpha蛋智能语音机器人",
      "price": 699.0,
      "productLabel": "[\"科大讯飞\",\"智能语音陪伴\",\"2-8岁\"]",
      "productFistImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png",
      "productState": 2,
      "onlineTime": 1538469631000,
      "offlineTime": 1540546251000,
      "saleVolumeHistory": 0,
      "saleVolumeMonthly": 0,
      "productStyle": "[\"黄色\",\"白色\"]",
      "stylePrice": "[699,699]",
      "returnCashRate": 0.0,
      "returnCashRateLinksender": 0.0
    }, {
      "id": "1716e7f5fb8041cf9a750a8964dd1d3b",
      "productName": "兼容高9656儿童玩教具",
      "price": 750.0,
      "productFistImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png",
      "productStyle": "[\"基本款\"]",
      "stylePrice": "[750]",
    }, {
      "id": "1716e7f5fb8041cf9a750a8964dd1d3b",
      "productName": "兼容高9656儿童玩教具",
      "price": 750.0,
      "productFistImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png",
      "productStyle": "[\"基本款\"]",
      "stylePrice": "[750]",
    }, {
      "id": "1716e7f5fb8041cf9a750a8964dd1d3b",
      "productName": "兼容高9656儿童玩教具",
      "price": 750.0,
      "productFistImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png",
      "productStyle": "[\"基本款\"]",
      "stylePrice": "[750]",
    }, {
      "id": "1716e7f5fb8041cf9a750a8964dd1d3b",
      "productName": "兼容高9656儿童玩教具",
      "price": 750.0,
      "productFistImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png",
      "productStyle": "[\"基本款\"]",
      "stylePrice": "[750]",
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postlist: postsData.postList
    })
    console.log(this.data.postlist)
  },

  openpac: function (e) {
    var redsum = e.currentTarget.dataset.redsum
    var redid = e.currentTarget.dataset.redid
    var tempredarr = wx.getStorageSync('redpacketState')
    for (let i = 0; i < tempredarr.length; i++) {
      if (tempredarr[i] == redid) {
        isreceive = true
        break;
      }
    }
      this.setData({
        redshow: true,
        redsum: redsum,
        redid: redid
      })
    console.log('redsum', this.data.redsum)
    console.log('redid', this.data.redid)
  },
  touchcanvas: function () {
    this.setData({
      istouched: true
    })
  },
  closemodel: function (e) {
    var that = this
    var temp = []
    var redid = e.currentTarget.dataset.redid
    this.setData({
      redshow: false,
      istouched: false
    })
    wx.request({
      url: app.globalData.g_ip_wxclient + '/ketuan/applet/users/setbalance',
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      data: {
        addbalance: this.data.redsum
      },
      success: function (res) {
        console.log('添加余额', res)
        temp = wx.getStorageSync('redpacketState')
        if (temp == '') {
          temp = []
        }
        temp.push(redid)
        wx.setStorageSync('redpacketState', temp)
      }
    })
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "./postdetail/postdetail?id=" + postId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.socketlink()
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