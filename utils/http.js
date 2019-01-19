var config = require('../config/config.js')
import {showToast} from '../utils/tips.js'

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
        console.log(res.data)
        if (res.statusCode == 200) {
          var errorCode = res.data.errorCode
          if (errorCode == 0) {
            if (res.data.data && res.data.data.sessionId){
              wx.setStorageSync('sessionid', res.data.data.sessionId);
              console.log(res.data.data.sessionId)
              console.log(wx.getStorageSync('sessionid'));
            }
            return resolve(res.data)
          } else if (errorCode==40001){
            //未获取到用户信息
            wx.navigateTo({
              url: '/pages/auth/auth',
            })
          } else if (errorCode == 40002) {
            //未获取到微信登录信息
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (errorCode == 40003) {
            //账号不存在，或token无效
          } else if (errorCode == 40004) {
            //账号已被禁用
          } else if (errorCode == 40005 || errorCode==1) {
            //用户信息和微信信息不匹配
          } else if (errorCode == 40006) {
            //用户尚未创建简历
            wx.navigateTo({
              url: '/pages/user-info/user-info',
            })
          } else if (errorCode == 40007) {
            //账号类型不符
          } else if (errorCode == 50000) {
            //后台接口异常
            // showToast('后台接口异常')
          } 
          //TODO:错误码处理 手机未绑定
          // else if (params.url == "/order/result" && res.data.errorCode == "800020") {//支付结果未知      
          //   //需要特殊处理的接口，可以单独列出来返回数据
          //   resolve(res.data)
          // } 
          showToast(res.data.message)
          reject(res.data)

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