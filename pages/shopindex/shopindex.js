// pages/shopindex/shopindex.js
var app=getApp()
var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    banners: [{
      "id": 1,
      "imgUrl": "http://47.99.78.252:8080/ketuan/imagesDir/722c1f91e75647e2b06666edb478c4f3.png",
      "groupId": "53a6d042164d4325a69c7f9b64cc879c",
      "canTab": 1,
      "state": 1
    }, {
      "id": 4,
      "imgUrl": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png",
      "groupId": "ac9ecec889ed4d4195592e95800ea725",
      "canTab": 1,
      "state": 1
    }],

},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  // var productlist = this.data.productlist
  //   for(let i=0;i<productlist.length;i++){
  //     var s=productlist[i].group_name
  //     productlist[i].group_name=utils.cutString(s,25)
  //   }
  //   this.setData({
  //     productlist: productlist
  //   })
  this.getbanner()
  this.getgoodslist()
},

getbanner:function(){
  wx.request({
    url: app.globalData.g_ip_wxclient + '/WXClientService/shop/getbanner',
    success:function(res){
      console.log('getbanner',res)
    }
  })
},

  getgoodslist: function () {
    var that=this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/shop/getgoodslist',
      success: function (res) {
        console.log('getgoodslist', res)
        that.setData({
          productlist:res.data.data.products
        })
      }
    })
  },

  clickCustomservice: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  tapgoods: function (e) {
    var productid = e.currentTarget.dataset.productid
    console.log('productid', e)
    wx.navigateTo({
      url: './productDetail/productDetail?productid=' + productid
    })
    
  },
  onShareAppMessage: function () {
    console.log('+++++++转发++++++++++')
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