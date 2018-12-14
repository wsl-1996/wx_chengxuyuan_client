// pages/myAccount/myAccount.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  touch1: function () {
    wx.navigateTo({
      url: './myOrder/myOrder',
    })
  },
  touch2: function () {
    wx.navigateTo({
      url: './myBalance/myBalance',
    })
  },
  touch3: function () {
    wx.navigateTo({
      url: './myAddress/myAddress',
    })
  },
  touch4: function () {
    wx.navigateTo({
      url: './myFans/myFans',
    })
  },
  touch5: function () {
    wx.navigateTo({
      url: './myColltion/myColltion',
    })
  },
  touch6: function () {
    wx.navigateTo({
      url: './myHistory/myHistory',
    })
  },
  touch7: function () {
    wx.navigateTo({
      url: './reference/reference',
    })
  },
  touch8: function () {
    wx.navigateTo({
      url: './myCart/myCart',
    })
  },

  touch9: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
})