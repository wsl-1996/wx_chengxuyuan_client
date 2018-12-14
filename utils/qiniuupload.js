const qiniuUploader = require("./qiniuUploader");
var up_token = ''
var fileKey = ''
// 初始化七牛相关参数
// function initQiniu() {
//   var options = {
//     region: 'ECN', // 华北区
//      uptoken: up_token,
//     domain: 'http://resource.skqtec.com',
//     shouldUseQiniuFileName: false
//   };
//   console.log('tokennow', options.uptoken)
//   qiniuUploader.init(options);
// }

function gettoken() {
  fileKey = 'a' + Math.random()
  fileKey = 'img' + fileKey.slice(3)
  console.log('fileKey', fileKey)
  wx.request({
    url: 'http://47.99.78.252:8080/CommonService/QiNiuYun/getUploadToken?fileKey=' + fileKey,
    success: function (res) {
      up_token = res.data.data.upToken
      console.log('uptoken', up_token)
    }
  })
}

function didPressChooesImage(that,callback) {
  gettoken()
  // initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      var imgdata=''
      var isDone=false
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        console.log('imageObjectres', res)
        imgdata = res.imageURL
        that.setData({
          imageObject: res
        });
        if(isDone==true){
          callback(that, imgdata)
          console.log('imgdata', imgdata)
        }
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      },
        {
          region: 'ECN', // 华北区
          uptoken: up_token,
          domain: 'http://resource.skqtec.com',
          shouldUseQiniuFileName: false,
          key: fileKey,
          //  uptokenURL: 'http://192.168.0.104:8080/CommonService/QiNiuYun/getUploadToken',
        },

        (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          if (progress.progress==100){
            isDone=true
          }
        }, cancelTask => that.setData({ cancelTask }),        
      );
    }
  })
  
}

module.exports={
  didPressChooesImage: didPressChooesImage
}