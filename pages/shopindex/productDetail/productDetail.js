// pages/shopindex/productDetail/productDetail.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleActive:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      productid: options.productid
    })
    this.getgoodsdetail()
    this.getcommentlist()
  },

  getgoodsdetail: function() {
    var that = this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/shop/getgoodsdetail',
      data: {
        productid: this.data.productid
      },
      success: function(res) {
        var productdetail = res.data.data.product
        console.log('getgoodsdetail', res)
        that.setData({
          productdetail: productdetail
        })
        var productSlideImg = productdetail.productSlideImg,
            productContentImg = productdetail.productContentImg,
            afterSale = productdetail.afterSale,
            productSlideImg = JSON.parse(productSlideImg),
            productContentImg = JSON.parse(productContentImg),
          productStyle = JSON.parse(productdetail.productStyle),
            afterSale = JSON.parse(afterSale),
            afterSaleKeys = Object.keys(afterSale),
          packStand = productdetail.packStand,
          productInfo = productdetail.productInfo,
          productInfo = JSON.parse(productInfo),
        productInfokeys = Object.keys(productInfo)
        that.setData({
          productSlideImg: productSlideImg,
          productContentImg: productContentImg,
          afterSale: afterSale,
          afterSaleKeys: afterSaleKeys,
          packStand: packStand,
          productInfo: productInfo,
          productInfokeys: productInfokeys,
          productStyle: productStyle
        })
      }
    })
  },
  gotobuy: function() {
    var that = this
    util.islogin(buycallback)

    function buycallback(){
      if (that.data.styleActive == '') {
        wx.showToast({
          title: '请选择款式',
          icon: 'none',
        })
      } else {
        var orderdata = {
          firstimg: that.data.productdetail.productFistImg,
          productinfo: that.data.productdetail.productName,
          num: '1',
          price: that.data.productdetail.price,
          style: that.data.styleActive,
          productid: that.data.productdetail.id
        },
          orderarr = []
        orderarr.push(orderdata)
        wx.setStorageSync('temporder', orderarr)
        wx.navigateTo({
          url: '../commitOrder/commitOrder',
        })
      }
    }
    
    
  },

  addtocart: function() {
    var that =this
    util.islogin(addcart)
    function addcart(){
      if (that.data.styleActive == '') {
        wx.showToast({
          title: '请选择款式',
          icon: 'none',
        })
      } else {
        wx.request({
          url: app.globalData.g_ip_wxclient + '/WXClientService/my/addshoppingcart',
          data: {
            firstimg: that.data.productdetail.productFistImg,
            productinfo: that.data.productdetail.productName,
            count: '1',
            price: that.data.productdetail.price,
            style: that.data.styleActive,
            productid: that.data.productdetail.id,
            userid: wx.getStorageSync('userid')
          },
          success: function (res) {
            console.log('addtocartres', res)
            wx.showToast({
              title: '加购成功',
            })
          }

        })
      }
    }

      
    
  },

  choseStyle:function(e){
    var stylenow = e.currentTarget.dataset.style
    this.setData({
      styleActive: stylenow
    })
    console.log('stylenow', stylenow)
  },

  gotoindex: function() {
    wx.switchTab({
      url: '../shopindex',
    })
  },

  gotocustomservice: function() { //存消息列表，跳转对话框
    this.setmsglist()
    wx.navigateTo({
      url: '../../message/customservice/customservice?userid=123asd123asd123asd123asd',
    })
  },

  setmsglist: function() { //发送消息列表 存缓存
    var temp = {}
    var is_have = false
    temp = {
      "avatar": '/images/avatar/1.png', // this.data.serviceHeadimg
      "nickname": '客服one',
      "message": "",
      "userid": '123asd123asd123asd123asd'
    }
    app.globalData.g_arr = wx.getStorageSync('msglist')
    for (var i = 0; i < app.globalData.g_arr.length; i++) {
      if (app.globalData.g_arr[i].userid == temp.userid) {
        is_have = true
      }
    }
    if (app.globalData.g_arr == '') {
      app.globalData.g_arr = []
    }

    if (is_have == false) {
      app.globalData.g_arr.push(temp)
      console.log(app.globalData.g_arr)
      wx.setStorageSync("msglist", app.globalData.g_arr)
    }

  },

  clickCustomservice: function() { //跳转消息列表
    wx.navigateTo({
      url: '../../message/message',
    })
  },

  getcommentlist:function(){
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/comments/getcommentlist',
      data:{
        productid: this.data.productid
      },
      success:function(res){
        console.log('commentlist',res)
      }
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
  onShow: function () {
    util.socketlink()
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