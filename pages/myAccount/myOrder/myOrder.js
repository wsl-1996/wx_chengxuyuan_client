// pages/myAccount/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

 searchResult: [{ "productTitle": "小蛋机器人", "sumPrice": "1.0", "deduction": "0.0", "orderId": "201810161441044154231", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1", "orderState": "1" }, { "productTitle": "小蛋机器人", "sumPrice": "1.0", "deduction": "0.0", "orderId": "201810161448556090418", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1", "orderState": "2" }, { "productTitle": "小蛋机器人", "sumPrice": "1.0", "deduction": "0.0", "orderId": "201810161550271253602", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1", "orderState": "3" }, { "productTitle": "小蛋机器人", "sumPrice": "1.0", "deduction": "0.0", "orderId": "201810161550289721382", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1", "orderState": "4" }, { "productTitle": "小蛋机器人", "sumPrice": "6.0", "deduction": "0.0", "orderId": "201810161558531954599", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "6", "orderState": "5" }, { "productTitle": "小蛋机器人", "sumPrice": "6.0", "deduction": "0.0", "orderId": "201810161558538047553", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "6", "orderState": "6" }, { "productTitle": "小蛋机器人", "sumPrice": "6.0", "deduction": "0.0", "orderId": "201810161558543981829", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "6", "orderState": "6" }, { "productTitle": "小蛋机器人", "sumPrice": "6.0", "deduction": "0.0", "orderId": "201810161558545808936", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "6", "orderState": "6" }, { "productTitle": "小蛋机器人", "sumPrice": "27.0", "deduction": "0.0", "orderId": "201810161643450999605", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png", "shopName": "思克奇", "typeSpecification": "白色", "productPrice": "699.0", "sums": "1", "orderState": "6" }, { "productTitle": "乐博士积木kj010 简单齿轮机械大颗粒机器人", "sumPrice": "438.0", "deduction": "16.35", "orderId": "201810170936496554219", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png", "shopName": "思克奇", "typeSpecification": "基本款", "productPrice": "750.0", "sums": "1", "orderState": "6" }, { "productTitle": "乐博士积木kj011百变工程车9206大颗粒机器人兼容高45002", "sumPrice": "493.0", "deduction": "16.35", "orderId": "201810170940100825772", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/0275fdb57f134beca15ede3c1d42cc87.png", "shopName": "思克奇", "typeSpecification": "基本款", "productPrice": "900.0", "sums": "1", "orderState": "6" }, { "productTitle": "乐博士积木kj010 简单齿轮机械大颗粒机器人", "sumPrice": "868.0", "deduction": "0.0", "orderId": "201810171011098843382", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png", "shopName": "思克奇", "typeSpecification": "基本款", "productPrice": "750.0", "sums": "2", "orderState": "6" }, { "productTitle": "乐博士积木kj011百变工程车9206大颗粒机器人兼容高45002", "sumPrice": "503.0", "deduction": "16.35", "orderId": "201810171016240370593", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/0275fdb57f134beca15ede3c1d42cc87.png", "shopName": "思克奇", "typeSpecification": "基本款", "productPrice": "900.0", "sums": "1", "orderState": "6" }, { "productTitle": "乐博士积木kj010 简单齿轮机械大颗粒机器人", "sumPrice": "438.0", "deduction": "0.0", "orderId": "201810171018355688866", "productImg": "http://47.99.78.252:8080/ketuan/imagesDir/2ebac807074d45caa5248c625d0e1ede.png", "shopName": "思克奇", "typeSpecification": "基本款", "productPrice": "750.0", "sums": "1", "orderState": "6" }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      this.setData({
        orderlist: this.data.searchResult
      })
    that.handlestate()
  },

  orderdetail: function (e) {
    console.log('这是订单号：', e.currentTarget.dataset.orderid)
    wx.navigateTo({
      url: './orderdetail/orderdetail?myorderid=' + e.currentTarget.dataset.orderid,
    })
  },

  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
    console.log(e.detail.value)
  },
  toSearch: function () {         //查找订单
    var that = this
    this.setData({
      currentType: 0
    })
    wx.request({
      url: app.globalData.g_ip_wxclient + '/ketuan/applet/orders/searchorders?sessionid=' + app.globalData.g_sessionid + '&key=%E8%A1%AC%E8%A1%AB',
      data: {
        userid: "01",
        key: this.data.searchInput
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          orderlist: res.data.data.searchResult
        })
        that.handlestate()
      }
    })
  },
  gotopay: function (e) {
    var that = this
    var orderid = e.currentTarget.dataset.orderid
    wx.request({
      url: app.globalData.g_ip_wxclient + '/ketuan/applet/orders/orderpay',
      data: {
        orderid: orderid,
        // sessionid: app.globalData.g_sessionid
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        var data = res.data.data
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.paySign,
          'appId': 'wx5733cafea467c980',
          'success': function (res) {
            console.log('调用待支付success')
          },
          'fail': function (res) {
            console.log(res)
            console.log('调用待支付failed' + JSON.stringify(data.nonceStr))
          }
        })
      }
    })
  },

  gotocomment: function (e) {
    wx.navigateTo({
      url: './tocomment/tocomment?orderid=' + e.currentTarget.dataset.orderid,
    })
  },

  gotoexpress: function (e) {
    wx.navigateTo({
      url: './express/express?orderid=' + e.currentTarget.dataset.orderid + '&productimg=' + e.currentTarget.dataset.productimg,
    })
  },

  topayback: function (e) {
    wx.navigateTo({
      url: 'topayback/topayback?orderid=' + e.currentTarget.dataset.orderid,
    })
  },
  handlestate: function () {
    for (let i = 0; i < this.data.orderlist.length; i++) {
      switch (this.data.orderlist[i].orderState) {
        case '1':
          this.data.orderlist[i].orderStateText = '待支付'
          break;
        case '2':
          this.data.orderlist[i].orderStateText = '待发货'
          break;
        case '3':
          this.data.orderlist[i].orderStateText = '待收货'
          break;
        case '4':
          this.data.orderlist[i].orderStateText = '待评价'
          break;
        case '5':
          this.data.orderlist[i].orderStateText = '已评价'
          break;
        case '6':
          this.data.orderlist[i].orderStateText = '已取消'
          break;
      }
    }
    this.setData({
      orderlist: this.data.orderlist
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