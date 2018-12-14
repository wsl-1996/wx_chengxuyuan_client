var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

//  alladdress: [{ "id": "0c5f6698c35f40e7ab6f4d2e8498b7ab", "country": "China", "province": "湖北省", "city": "武汉市", "districts": "江岸区", "street": "", "addressDetail": "江岸水城1号1456室", "sendName": "王小明", "sendPhone": "17805055773", "userId": "69d3608cb7cf437db0dd9556f20afa89", "zip": null, "defaultAddress": 1 }, { "id": "780f206a7e75414683aca811552e22b9", "country": "China", "province": "北京市", "city": "北京市", "districts": "东城区", "street": "", "addressDetail": "溜了溜了", "sendName": "额好怀念", "sendPhone": "25805566855", "userId": "69d3608cb7cf437db0dd9556f20afa89", "zip": null, "defaultAddress": 0 }, { "id": "8519bde0d11448268df3d49daa6f2601", "country": "China", "province": "内蒙古自治区", "city": "包头市", "districts": "东河区", "street": "", "addressDetail": "金鹰国际大厦", "sendName": "王胜林", "sendPhone": "17805051234", "userId": "69d3608cb7cf437db0dd9556f20afa89", "zip": null, "defaultAddress": 0 }]
  },

  /**
    * 弹窗
    */
  reviseaddress: function (e) {
    this.setData({
      is_add: false,
      showModal: true,
      addressDetail: e.currentTarget.dataset.addressdetail,
      addressid: e.currentTarget.dataset.addressid,
      sendname: e.currentTarget.dataset.sendname,
      sendphone: e.currentTarget.dataset.sendphone,
      region: [e.currentTarget.dataset.province,
      e.currentTarget.dataset.city,
      e.currentTarget.dataset.districts
      ],
      province: e.currentTarget.dataset.province,
      city: e.currentTarget.dataset.city,
      districts: e.currentTarget.dataset.districts

    })
    console.log('this is addressDetail' + e.currentTarget.dataset.addressDetail)
    console.log('this is addressid' + e.currentTarget.dataset.addressid)
  },

  addaddress: function (e) {
    this.setData({
      is_add: true,
      showModal: true,
      sendname: '',
      sendphone: '',
      sendphone: '',
      region: ['', '', ''],
      addressDetail: '',
      // urlabc: app.globalData.g_ip + '/ketuan/applet/sendaddress/addaddress?sessionid=' + app.globalData.g_sessionid
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {

    this.hideModal();
    
  },


  /**
   * 对话框确认按钮点击事件
   */
  onConfirmadd: function () { //单下保存按钮时，提交修改
    var that = this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/my/addaddress',
      data: {
        sendname: this.data.sendname,
        sendphone: this.data.sendphone,
        useraddressdetails: this.data.addressDetail,
        userprovince: this.data.province,
        usercity: this.data.city,
        userdistricts: this.data.districts,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
      success: function (res) {
        console.log('添加地址：')
        console.log(res)
        that.hideModal()
        that.getaddresslist()
      },
    })
  },
  onConfirmrevise: function (e) {
    var that = this
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/my/updateaddress',
      data: {
        addressid: this.data.addressid,
        sendname: this.data.sendname,
        sendphone: this.data.sendphone,
        useraddressdetails: this.data.addressDetail,
        userprovince: this.data.province,
        usercity: this.data.city,
        userdistricts: this.data.districts,
        userid: wx.getStorageSync('userid')
      },
      success: function (res) {
        console.log('修改地址：')
        console.log(res)
        that.hideModal()
        that.getaddresslist()
      },

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   defaultaddress: options.defaultaddress
    // })
    
    util.islogin()
  },

  getaddresslist:function(){
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
        console.log('地址列表', res.data.data)
        that.setData({
          addresslist: res.data.data.alladdress
        })
      }
    })
  },

  setdefault: function (e) { //设默认地址
    console.log('这是默认地址' + e.detail.value)
    this.setData({
      defaultaddress: e.detail.value
    })
    wx.request({
      url: app.globalData.g_ip_wxclient + '/WXClientService/my/setdefaultaddress' ,
      data:{
        fdid: e.detail.value,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/json',
        'sessionid': wx.getStorageSync('sessionid')
      },
    })
  },

  deladdress: function (e) {
    var that = this
    if (this.data.defaultaddress == e.currentTarget.dataset.id) {
      wx.showToast({
        title: '默认地址无法删除',
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要删除此收货地址么？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定' + e.currentTarget.dataset.id)
            wx.request({
              url: app.globalData.g_ip_wxclient + '/WXClientService/my/deleteaddress',
              data: {
                fdid: e.currentTarget.dataset.id,
                userid: wx.getStorageSync('userid')
              },
              header: {
                'content-type': 'application/json',
                'sessionid': wx.getStorageSync('sessionid')
              },
              success: function () {
                that.hideModal()
                that.getaddresslist()
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  bindRegionChange: function (e) { //地区值改变时数据绑定在data中
    console.log('picker发送选择改变，携带值为', e.detail.value[0])
    this.setData({
      region_edit: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      districts: e.detail.value[2],
      region: [e.detail.value[0], e.detail.value[1], e.detail.value[2],]
    })
  },
  inputChange1: function (e) { //第一个input值改变时数据绑定在data中
    console.log(e.detail.value)
    this.setData({
      sendname: e.detail.value
    })
  },

  inputChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      sendphone: e.detail.value
    })
  },

  inputChange3: function (e) {
    console.log(e.detail.value)
    // if (e.detail.value)
    this.setData({
      addressDetail: e.detail.value
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
    this.getaddresslist()
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