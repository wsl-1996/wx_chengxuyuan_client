// pages/myAccount/myCart/myCart.js
var app=getApp()
var util = require('../../../utils/util.js');
var checkboxvalue = []
var checkboxall = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cartlist: [{
    //     title: '乐博士积木kj010 简单齿轮机械大颗粒机器人乐博士',
    //     productid: '01',
    //     style: '蓝色',
    //     price: '456',
    //     num: '1',
    //     firstimg:'http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png'
    //   },
    //   {
    //     title: '乐博士积木kj010 简单齿轮机械大颗粒机器人乐博士',
    //     productid: '02',
    //     style: '蓝白色',
    //     price: '466',
    //     num: '2',
    //     firstimg: 'http://47.99.78.252:8080/ketuan/imagesDir/165aa58150d3429e84e870502c6042c0.png'
    //   }, {
    //     title: '乐博士积木kj010 简单齿轮机械大颗粒机器人乐博士',
    //     productid: '03',
    //     style: '蓝白色',
    //     price: '496',
    //     num: '3',
    //     firstimg: 'http://47.99.78.252:8080/ketuan/imagesDir/d416c0f91c4b4591a0d44ca8aa1192be.png'
    //   }
    // ],
    checkedlist:[],
    pricenow: 0,
    selected: false,
    radiochecked: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getcartlist()

  },

  getcartlist:function(){
    var that=this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/my/getshoppingcart',
      data:{
        userid:wx.getStorageSync('userid')
      },
      success:function(res){

        that.setData({
          cartlist: res.data.data.shoppingcarts
        })
        console.log('getcartlist', that.data.cartlist)
      }
    })
  },

  checking: function(e) {          //checkbox变化时触发
    var arr=[]
    console.log('check e', e.detail.value)
    checkboxvalue = e.detail.value
    for(let i=0;i<checkboxvalue.length;i++){
      var tempstr=checkboxvalue[i],
          temparr=tempstr.split(','),
          tempobj={
            productid:temparr[0],
            price:temparr[1],
            num:temparr[2],
            style: temparr[3],
            title: temparr[4],
            firstimg: temparr[5],
            id:temparr[6]
          }
      arr.push(tempobj)
      this.setData({
        checkedlist: arr
      })
    }
    console.log('checkedlist', this.data.checkedlist)

    if (checkboxvalue.length < this.data.cartlist.length) {
      this.setData({
        radiochecked: false
      })
    }
     if(checkboxvalue.length==0){
      this.setData({
        checkedlist: []
      })
    }
    this.calculateprice()
  },


  calculateprice: function(res,pid) {   //计算checkedlist价格
    var checkedlist = this.data.checkedlist
    var pricenow=0
    for (let i = 0; i < checkedlist.length;i++){
      pricenow+=checkedlist[i].price * checkedlist[i].num
    }
    this.setData({
      pricenow:pricenow
    })
  },


  sellectAll: function() {
    if (this.data.radiochecked == false) {
      this.setData({
        selected: true,
        radiochecked: !this.data.radiochecked,
        checkedlist:this.data.cartlist
      })
      this.calculateprice()
    } else {
      this.setData({
        selected: false,
        radiochecked: !this.data.radiochecked,
        pricenow: 0,
        checkedlist:[]
      })
    }


  },
  
  onplus: function(res) {
    var pid = res.currentTarget.dataset.id,
        cartlist = this.data.cartlist,
        checkedlist = this.data.checkedlist

    for (let i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == pid) {
        cartlist[i].num = Number(cartlist[i].num) +1
        break;
      }
    }
    for (let i = 0; i < checkedlist.length;i++){
      if (checkedlist[i].id == pid) {
        checkedlist[i].num = Number(checkedlist[i].num) + 1
        break;
      }
    }
    this.setData({
      cartlist: cartlist,
      checkedlist: checkedlist
    })
    this.calculateprice()
  },

  onminus: function(res) {
    var pid = res.currentTarget.dataset.id,
      cartlist = this.data.cartlist,
      checkedlist = this.data.checkedlist

    for (let i = 0; i < cartlist.length; i++) {
      if (cartlist[i].id == pid) {
        if (Number(cartlist[i].num) - 1 >0){
          cartlist[i].num = Number(cartlist[i].num) - 1
        }  
        break;
      }
    }
    for (let i = 0; i < checkedlist.length; i++) {
      if (checkedlist[i].id == pid) {
        if (Number(checkedlist[i].num) - 1 > 0) {
        checkedlist[i].num = Number(checkedlist[i].num) - 1
        }
        break;
      }
    }
    this.setData({
      cartlist: cartlist,
      checkedlist: checkedlist
    })
    this.calculateprice()
  },

  gocheck: function () {
    var checkedlist = this.data.checkedlist
    var arr=[]
    for (let i = 0; i < checkedlist.length;i++){
      var orderdata = {
        firstimg: checkedlist[i].firstimg,
        productinfo: checkedlist[i].title,
        num: checkedlist[i].num,
        price: checkedlist[i].price,
        style: checkedlist[i].style,
        productid: checkedlist[i].productid,
        id:checkedlist[i].id
      }
      arr.push(orderdata)
    }
    wx.setStorageSync('temporder', arr)
    wx.navigateTo({
      url: '../../shopindex/commitOrder/commitOrder',
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