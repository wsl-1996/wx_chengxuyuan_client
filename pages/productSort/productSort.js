// pages/productSort/productSort.js
var app = getApp()
var originsort = []
var classifycodes = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productlist: [{
      "id": "1716e7f5fb8041cf9a750a8964dd1d3a",
      "productType": 0,
      "productName": "alpha蛋智能语音机器人",
      "productInfo": "{\"品牌\":\"科大讯飞\",\"适用年龄\":\"0-12岁\",\"操作方式\":\"按键和语音\",\"型号\":\"TYS1\",\"重量\":\"0.82kg\",\"尺寸\":\"127mm*127mm*155mm\",\"材质\":\"塑胶、电子元件\",\"功率\":\"5W\"}",
      "price": 699.0,
      "stockCount": 20,
      "productClassifyCode": "",
      "merchantId": "b9ffe29719eb4bcbb9432c0085c7f4e1",
      "starLevel": 1.0,
      "packStand": "塑封包装盒 × 1、阿尔法小蛋 × 1、充电线 × 1、使用说明书 × 1、售后卡 × 1",
      "afterSale": "{\"售后服务\":\"本产品全国联保，享受三包服务，质保期为：1年质保\",\"价格说明\":\"零售价：商品的销售价，是您最终决定是否购买商品的依据。\\n团购价：商品的促销价格，非原价。由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考\\n\"}",
      "evaluateLabel": null,
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
  onLoad: function(options) {
    this.getSort()
  },

  getSort: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/sort/getsortlist',
      success: function(res) {
        var sortarr = []
        console.log('getSort', res)
        originsort = res.data.data.ClassifyCodes.concat()
        classifycodes = res.data.data.ClassifyCodes.concat()
        for (let i = 0; i < classifycodes.length; i++) {
          var tempstr = classifycodes[i].code.substring(3, 6)
          if (tempstr == '000') {
            var mainsort = classifycodes.splice(classifycodes.indexOf(classifycodes[i]), 1)
            sortarr.push(mainsort[0])
          }
        }
        console.log('sortarr', sortarr)
        that.setData({
          sortarr: sortarr,
        })
      }
    })

  },

  gotosubsort: function(e) {
    var that = this,
      code = e.currentTarget.dataset.code,
      codestr = code.substring(0, 3),
      subarr = [],
      copyclassifyarr = classifycodes.concat()

    console.log('copyclassifyarr', copyclassifyarr)
    for (let i = 0; i < copyclassifyarr.length; i++) {
      copyclassifyarr = classifycodes.concat()
      var tempstr = copyclassifyarr[i].code.substring(0, 3)
      if (tempstr == codestr) {
        var mainsort = copyclassifyarr.splice(copyclassifyarr.indexOf(copyclassifyarr[i]), 1)
        subarr.push(mainsort[0])
      }
    }
    that.setData({
      subarr: subarr
    })
    console.log('subarr', subarr)
  },

  clickCustomservice: function() {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  gototop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})