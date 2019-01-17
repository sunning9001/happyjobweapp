var api = require('../api/api.js')
import { http } from '../utils/http.js'
import { updataStorageData } from '../utils/storage.js'
// require('../app.js')
var app = getApp()
// console.log(app)

/*******************  请求 ***********************************/
//api地址
const url = api.url;

// //获得微信临时code
// function getWxCode(){
//   return new Promise((resolve,reject)=>{
//     wx.login({
//       success(res) {
//         if (res.code) {
//           resolve(res.code)
//         } else {
//           reject(res.errMsg)
//         }
//       }
//     })
//   })
// }

// //商城小程序，根据微信CODE获取微信用户信息
// function wxLogin(params) {
//   return http({
//     url: url.userLogin,
//     method: "POST",
//     data: params,
//   })
// }

// //用户微信信息存入
// function saveLogin(params) {
//   return http({
//     url: url.saveUserInfo,
//     method: "POST",
//     header: {
//       oid:app.globalData.oid
//     },
//     data: params
//   })
// }

//后台解密手机号 encryptedData iv sessionKey
function decodePhone(params) {
  http({
    url: url.decodeUserInfo,
    method: "POST",
    data: params,
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

// //获取用户信息权限
// function getUserInfo(){
//   return new Promise((resolve,reject)=>{
//     hasAuth('scope.userInfo')
//     .then(()=>{
//       wx.getUserInfo({
//         lang: 'zh_CN',
//         success: res => {
//           console.log(res)
//           console.log('获取用户信息成功')
//           app.globalData.userInfo = res.userInfo;
//           updataStorageData('city', res.userInfo.city)
//           saveWXInfo().then(data=>{console.log('保存信息成功')}).catch(data=>{console.log('上传微信信息失败',data)})
//           resolve(res)
//         },
//         fail: err => {
//           console.log('获取用户信息失败')
//           reject(false)
//         }
//       })
//     })
//     .catch(()=>{
//       console.log('没有用户信息授权')
//       wx.navigateTo({
//         url: '/pages/login/login',
//       })
//       reject(false)
//     })
    
//   })
// }

// //一键登录
// function quickLogin(storeToken){
//   return new Promise((resolve,reject)=>{
//     getWxCode().then(code=>{
//       return wxLogin({
//         code: code,
//         storeToken: storeToken || null
//       })
//     }).then(res=>{
//       console.log(res)
//       console.log(app)
//       app.globalData.oid = res.data.oid;
//       app.globalData.sid = res.data.sid;
//       app.globalData.userToken = res.data.userToken;
//       app.globalData.sessionKey = res.data.sessionKey; 
//       updataStorageData('shareToken', res.data.shareToken || '')//用户识别码
//       app.loginCallback && app.loginCallback()
//       resolve(true)
//     }).catch(data=>{
//       console.log(data)
//       reject(data)
//     })
//   })
// }

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
      'sessionKey': app.globalData.sessionKey,
      'encryptedData': encodeURIComponent(params.encryptedData),
      'iv': params.iv,
    }).then(data => {
      resolve(updataStorageData('phone', data.data.phoneNumber))
    }).catch(data=>{
      reject(false)
    })
  })
}

// //获取用户信息 判断授权
// function hasAuth(setting) {
//   return new Promise((resolve, reject) => {
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting[setting]) {
//          resolve(true)
//         } else {
//           // 未授权            
//           reject(false)
//         }
//       }
//     })
//   })
// }

// //保存用户信息到后台
// function saveWXInfo() {
//   return new Promise((resolve, reject) => {
//     let gender = app.globalData.userInfo.gender
//     if (gender == 0) {
//       gender = 3
//     }
//     saveLogin({
//       headerUrl: app.globalData.userInfo.avatarUrl,
//       nickName: app.globalData.userInfo.nickName,
//       gender: gender,
//     })
//   })
// }

module.exports = {
  // saveLogin,
  checkSession,
  decodePhone,
  getWxPhone,
  // saveWXInfo,
}