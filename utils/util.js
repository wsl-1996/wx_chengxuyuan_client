var app=getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function cutString(str,len){
  if(str.length>len){
    var s = str.substring(0, len)
    return s + '…'
  }
  else{
    return str
  }
    
}

function RndNum() {
  var rnd = "R";
  for (var i = 0; i < 8; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}

function islogin(callback){
  wx.request({
    url: app.globalData.g_ip_wxclient + '/WXClientService/login/islogin',
    header: {
      sessionid: wx.getStorageSync('sessionid')
    },
    success: function (res) {
      console.log('islogin-res', res)
      var isLogin = res.data.data.isLogin
      if (wx.getStorageSync('userid') == '' || isLogin == 'false') {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }else{
        callback()
      }
    }
  })
}

function socketlink(log) {
  console.log('socketclosetype', app.globalData.socketCloseType)
  console.log('sockettype', app.globalData.localsocket)
  var that = this
  if (app.globalData.socketCloseType == true) {
    var msg = "{ messageFrom:" + "'" + wx.getStorageSync('userid') + "'" + ",messageContent:'connect',messageType: '-1'}"
    app.globalData.localsocket = wx.connectSocket({
      url: app.globalData.g_socket + '/CommonService/websocket'
    })
    wx.onSocketOpen(function (res) {
      sendSocketMessage(msg)
      console.log("+++++++++++++开始监听+++++++++++++")
      app.globalData.socketCloseType = false
    })
    console.log(log, app.globalData.localsocket)
    function sendSocketMessage(msg) {
      wx.sendSocketMessage({
        data: msg,
      })
    }

    wx.onSocketMessage(function (res) {  //监听消息传入
      
      console.log(res)
      console.log('this is res.data')
      console.log(res.data)
      var tempres = JSON.parse(res.data)
      console.log('this is tempres', tempres)
      console.log(tempres.messageContent)
      app.globalData.g_tempmsgfrom = tempres.messageFrom
      if (tempres.messageType == '4') {
        var redpacketContent = JSON.parse(tempres.messageContent)
      }
      var temp = {
        is_show_right: 0,
        msgid: tempres.id,
        messageContent: tempres.messageType == '4' ? redpacketContent.explain : tempres.messageContent,
        redpacketsum: tempres.messageType == '4' ? redpacketContent.sum : null,
        messageFrom: tempres.messageFrom,
        messageto: app.globalData.userid,
        toView: that.RndNum(),
        contentType: parseInt(tempres.contentType),
        messageType: parseInt(tempres.messageType),
        createtime: that.formatTime(new Date()),
        headOwner: tempres.headOwner,
      }
      var tampstorage = wx.getStorageSync('centendata' + tempres.messageFrom) //从缓存中把对应ID的数组取出来
      if (tampstorage == '') {
        tampstorage = []
      }
      tampstorage.push(temp)
      wx.setStorageSync('centendata' + tempres.messageFrom, tampstorage) //接收的消息存入缓存
      app.globalData.g_msgfromid = tempres.messageFrom,

        that.setmsglist(temp.headOwner, temp.messageContent, temp.messageContent, temp.messageFrom)
      app.globalData.g_newmsg = true
      console.log('+++++++++++++++您有新的消息了+++++++++++++++')
      wx.showToast({
        title: '新消息~！',
      })

    })

    wx.onSocketClose(function () {
      console.log('listenlist 监听socket close')
      app.globalData.socketCloseType = true
    })

    wx.onSocketError(function () {
      console.log('listenlist 监听socket error')
    })
  } else {
    console.log('socket已连接')
  }
}

function setmsglist(Headimg, Nickname, message, userid) {
  var temp = {}
  var is_have = false
  temp = {
    "avatar": Headimg,
    "nickname": Nickname,
    "message": message,
    "userid": userid
  }
  app.globalData.g_arr = wx.getStorageSync('msglist')
  for (var i = 0; i < app.globalData.g_arr.length; i++) {
    if (app.globalData.g_arr[i].userid == temp.userid) {
      is_have = true
      app.globalData.g_arr[i].message = temp.message
      wx.setStorageSync("msglist", app.globalData.g_arr)
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

}

module.exports = {
  formatTime: formatTime,
  cutString : cutString,
  RndNum: RndNum,
  islogin: islogin,
  socketlink: socketlink,
  setmsglist: setmsglist
}
