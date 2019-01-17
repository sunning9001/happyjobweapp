var api = require('../api/api.js')
import { http } from '../utils/http.js'
import { updataStorageData } from '../utils/storage.js'
// require('../app.js')
var app = getApp()
// console.log(app)

/*******************  请求 ***********************************/
//api地址
const url = api.url;

//后台解密手机号 encryptedData iv sessionKey
function decodePhone(params) {
  return http({
    url: url.wxPhoneBound,
    method: "POST",
    data: params,
    header:{
      'oid':app.globalData.oid
    }
  })
}

/********************** 方法 ******************************/

//checkSession
function checkSession(appData){
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

/**
 * 获取微信手机号
 * params: object {sessionKey,encryptedData,iv}
 * callback true false
 * 
 */
function getWxPhone(params){
  return new Promise((resolve, reject) => {
    checkSession()
    .then(data=>{
      //checkSession有效
      resolve(decodePhoneCallback(params))
    })
    .catch(data => {
      //checkSession失效 重新登录
      app.quickLogin().then(data=>{
        resolve(decodePhoneCallback(params))
      })
    })
  })
}

// 手机号解密回调 返回成功失败
function decodePhoneCallback(params){
  return new Promise((resolve,reject)=>{
    decodePhone({
      'sessionKey':encodeURIComponent(app.globalData.sessionKey),
      'encryptedData': encodeURIComponent(params.encryptedData),
      'iv': encodeURIComponent(params.iv),
    }).then(data => {
      app.globalData.sid = data.data.sid,
      app.globalData.oid = data.data.oid,
      app.globalData.shareToken = data.data.shareToken,
      resolve(updataStorageData('phone', data.data.phoneNumber))
    }).catch(data=>{
      reject(false)
    })
  })
}


module.exports = {
  // saveLogin,
  checkSession,
  decodePhone,
  getWxPhone,
  // saveWXInfo,
}