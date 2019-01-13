var config = require('../config/config.js')


//服务器地址
const apiUrl = config.apiUrl;

/**
 * 封装http 请求方法
 */
const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: Object.assign({
        "Content-Type": "application/x-www-form-urlencoded"//设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      }, params.header||{} ),
      method: params.method || 'GET',//默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.errorCode == 0) {
            if (res.data.data && res.data.data.sessionId){
              wx.setStorageSync('sessionid', res.data.data.sessionId);
              console.log(res.data.data.sessionId)
              console.log(wx.getStorageSync('sessionid'));
            }
            resolve(res.data)
          } 
          // else if (params.url == "/order/result" && res.data.errorCode == "800020") {//支付结果未知      
          //   //需要特殊处理的接口，可以单独列出来返回数据
          //   resolve(res.data)
          // } 
          // {"errorCode":40001,"message":"未获取到用户信息"}

          else {
            wx.showToast({
              icon: "none",
              title: res.data.message
            })
            reject(res.data)
          }
        } else {
          //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
          wx.showToast({
            icon: "none",
            title: "网络异常"
          })
        }
      },
      fail: function (e) {   
        console.log(e)     
        wx.showToast({
          icon: "none",
          title: "网络异常"
        })
      }
    })
  })
}
module.exports = {
  http
}