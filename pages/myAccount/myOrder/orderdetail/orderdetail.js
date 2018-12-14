// pages/myAccount/myOrder/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 orderdetails: [{ "deliverTime": null, "sumPrice": "1.0", "sendName": "额好怀念", "orderId": "201810161441044154231", "payTime": null, "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "orderState": "已取消", "sendAddress": "北京市北京市东城区溜了溜了", "productTitle": "小蛋机器人", "sendTel": "25805566855", "carriagePrice": "5.0", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  handleorder: function (orderdetails) {
    if (orderdetails.deliverTime == null) {
      this.setData({
        deliverTimehiden: true
      })
    }
    if (orderdetails.payTime == null) {
      this.setData({
        payTimehiden: true
      })
    }
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