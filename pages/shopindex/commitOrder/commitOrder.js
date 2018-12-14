// pages/shopindex/commitOrder/commitOrder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pricenow:0,
    exprescost:0,
    usededuction:0,
    totalprice:0.01
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temporder = wx.getStorageSync('temporder')
    this.setData({
      orderlist:temporder,
      exprescost: this.data.exprescost * temporder.length
    })
    this.calculateprice()
  },

  getdefaultaddress:function(){
    var that = this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/my/getaddresslist',
      data: {
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        var defaultaddress = []
        var addresslist = res.data.data.alladdress
        console.log('地址列表', addresslist)
        for (let i = 0; i < addresslist.length ; i++){
          if (addresslist[i].defaultAddress == '1'){
            defaultaddress.push(addresslist[i])
              break;
          }
        }
        that.setData({
          defaultaddress: defaultaddress
        })
        console.log('defaultaddress', defaultaddress)
      }
    })
  },

  calculateprice:function(){
    var orderlist= this.data.orderlist,
        pricenow=0
    console.log('orderlist',orderlist)
    for (let i = 0; i < orderlist.length; i++) {
      pricenow += orderlist[i].price * orderlist[i].num
    }
    this.setData({
      pricenow: pricenow+this.data.exprescost,
    })
  },

  onplus: function (res) {
    var pid = res.currentTarget.dataset.productid,
      orderlist = this.data.orderlist

    for (let i = 0; i < orderlist.length; i++) {
      if (orderlist[i].productid == pid) {
        orderlist[i].num = Number(orderlist[i].num) + 1
        break;
      }
    }
    this.setData({
      orderlist: orderlist
    })
    this.calculateprice()
  },

  onminus: function (res) {
    var pid = res.currentTarget.dataset.productid,
      orderlist = this.data.orderlist

    for (let i = 0; i < orderlist.length; i++) {
      if (orderlist[i].productid == pid) {
        if (Number(orderlist[i].num) - 1 >0){
          orderlist[i].num = Number(orderlist[i].num) - 1
        }
        break;
      }
    }
    this.setData({
      orderlist: orderlist
    })
    this.calculateprice()
  },


  toaddress: function () {
    wx.navigateTo({
      url: '../../myAccount/myAddress/myAddress',
    })
  },
  commitorder: function (res) {
    console.log('this.data.defaultaddress', this.data.defaultaddress)
    if (this.data.defaultaddress == null) {
      wx.showToast({
        title: '请填写收货地址',
      })
    } else {
      wx.request({
        url: app.globalData.g_ip_wxclient + '/WXClientService/orders/createorder',
        method:'post',
        data: {
          userid:wx.getStorageSync('userid'),
          productid: this.data.orderlist[0].productid,
          style: this.data.orderlist[0].style,
          meno: this.data.meno,
          actualPayment: this.data.outcost,
          totalprice: this.data.totalprice,
          productprice: this.data.pricenow,
          sums: this.data.orderlist[0].num,
          carriageprice: this.data.exprescost,
          deduction: this.data.usededuction,
          actualPayment:0.01,
          sendAddres: this.data.defaultaddress[0].province + this.data.defaultaddress[0].city + this.data.defaultaddress[0].districts + this.data.defaultaddress[0].addressDetail,
          sendName: this.data.defaultaddress[0].sendName,
          sendTel: this.data.defaultaddress[0].sendPhone
        },
        header: {
          'content-type': 'application/json',
          'sessionid': wx.getStorageSync('sessionid')
        },
        success: function (res) {
          wx.request({
            url: app.globalData.g_ip_wxclient + '/WXClientService/orders/orderpay',
            data:{
              orderid:res.data.data.orderId
            },
            success:function(res){
              console.log(res.data)
              var data = res.data.data
              wx.requestPayment({
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': data.signType,
                'paySign': data.paySign,
                'appId': 'wx4d1008a1c302c4e1',
                'success': function (res) {
                  console.log('调用支付success')
                  wx.showToast({
                    title: '支付完成',
                    success: function () {
                      wx.redirectTo({
                        url: '../shopindex/shopindex',
                      })
                    }
                  })

                },
                'fail': function (res) {
                  console.log(res)
                  console.log('调用支付failed' + JSON.stringify(data.nonceStr))
                }
              })
            }
          })

        }
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
    this.getdefaultaddress()
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