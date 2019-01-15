var api = require('../api/api.js')
import { http } from '../utils/http.js'
var app = getApp()

/*******************  请求 ***********************************/
//api地址
const url = api.url;

//获得微信临时code
function getWxCode(){
  return new Promise((resolve,reject)=>{
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}

//商城小程序，根据微信CODE获取微信用户信息
function wxLogin(params) {
  return http({
    url: url.userLogin,
    method: "POST",
    data: params,
  })
}

//用户微信信息存入
function saveLogin(params) {
  return http({
    url: url.saveUserInfo,
    method: "POST",
    header: {
      oid:app.globalData.oid
    },
    data: params
  })
}

//后台解密手机号 encryptedData iv sessionKey
function decodePhone() {
  http({
    url: url.decodeUserInfo,
    method: "GET",
    data: params,
  })
}

/********************** 方法 ******************************/

//checkSession
function checkSession(){
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        resolve(true)
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        reject(false)
      }
    })
  })
}

//一键登录
function quickLogin(storeToken){
  return new Promise((resolve,reject)=>{
    getWxCode.then(code=>{
      return wxLogin({
        code: code,
        storeToken: storeToken || null
      })
    }).then(data=>{
      app.globalData.oid = res.oid;
      app.globalData.sid = res.sid;
      app.globalData.userToken = res.userToken;
      app.globalData.sessionKey = res.sessionKey;
      wx.setStorageSync('shareToken', res.shareToken)//用户识别码
      app.loginCallback && app.loginCallback()
      resolve(true)
    }).catch(data=>{
      console.log(data)
      reject(data)
    })
  })
}

/**
 * 获取微信手机号
 * params: object {sessionKey,encryptedData,iv}
 * callback true false
 * 
 */
function getWxPhone(params){
  let That = this
  return new Promise((resolve, reject) => {
    checkSession
    .then(data=>{
      //checkSession有效
      resolve(decodePhoneCallback(params))
    })
    .catch(data => {
      //checkSession失效 重新登录
      quickLogin().then(data=>{
        resolve(decodePhoneCallback(params))
      })
    })
  })
}

// 手机号解密回调 返回成功失败
function decodePhoneCallback(params){
  return new Promise((resolve,reject)=>{
    decodePhone({
      'sessionKey': app.globalData.sessionKey,
      'encryptedData': encodeURIComponent(params.encryptedData),
      'iv': params.iv,
    }).then(data => {
      wx.setStorageSync('phone', data.phone);
      resolve(true)
    }).catch(data=>{
      reject(false)
    })
  })
}

//获取用户信息 判断授权
function authorize(setting) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting[setting]) {
         resolve(true)
        } else {
          // 未授权            
          reject(false)
        }
      }
    })
  })
}

module.exports = {
  getWxCode,
  wxLogin,
  saveLogin,
  checkSession,
  decodePhone,
  getWxPhone,
  authorize
}