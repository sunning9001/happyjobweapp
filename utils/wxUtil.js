require("../utils/string.js")
var api = require('../api/api.js')
import { http } from '../utils/http.js'
import { updataStorageData } from '../utils/storage.js'
const url = api.url;
var app = getApp()
//获取用户信息权限
function getUserInfo(){
  return new Promise((resolve, reject) => {
    hasAuth('scope.userInfo')
      .then(() => {
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            console.log(res)
            console.log('获取用户信息成功')
            app.globalData.userInfo = res.userInfo;
            updataStorageData('city', res.userInfo.city)
            saveWXInfo(res).then(data => { console.log('保存信息成功') }).catch(data => { console.log('上传微信信息失败', data) })
            resolve(res)
          },
          fail: err => {
            console.log('获取用户信息失败')
            reject(false)
          }
        })
      })
      .catch(() => {
        console.log('没有用户信息授权')
        wx.navigateTo({
          url: '/pages/login/login',
        })
        reject(false)
      })

  })
}

//一键登录
function quickLogin(shareToken) {
  return new Promise((resolve, reject) => {
    getWxCode().then(code => {
      return wxLogin({
        code: code,
        shareToken: shareToken || null
      })
    }).then(res => {
      app.globalData.oid = res.data.oid;
      app.globalData.sid = res.data.sid ? res.data.sid : '';
      app.globalData.userToken = res.data.userToken ? res.data.userToken : '';
      app.globalData.sessionKey = res.data.sessionKey ? res.data.sessionKey : '';
      updataStorageData('shareToken', res.data.shareToken || '')//用户识别码
      app.loginCallback && app.loginCallback()
      resolve(true)
    }).catch(data => {
      console.log(data)
      reject(data)
    })
  })
}
//获取用户信息 判断授权
function hasAuth(setting) {
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
//商城小程序，根据微信CODE获取微信用户信息
function wxLogin(params) {
  return http({
    url: url.userLogin,
    method: "POST",
    data: params,
  })
}
//获得微信临时code
function getWxCode(){
  return new Promise((resolve, reject) => {
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
//保存用户信息到后台
function saveWXInfo(params) {
  return new Promise((resolve, reject) => {

    saveLogin({
      encryptedData: encodeURIComponent(params.encryptedData),
      iv: encodeURIComponent(params.iv),
    })
  })
}
//用户微信信息存入
function saveLogin(params) {
  return http({
    url: url.saveUserInfo,
    method: "POST",
    header: {
      oid: app.globalData.oid
    },
    data: params
  })
}
// 判断用户是否已微信登录
function checkUserWxLogin(){
  if (app.globalData.oid) {
    console.log('存在登录信息')
    return true

  } else {
    console.log('不存在登录信息')
    quickLogin(app.globalData.targetShareToken)
      .then(data => {
        console.log('一键登录成功')
        getUserInfo().then(data => {
          console.log('获取用户信息成功')
        })
        console.log('quick login 完成')
        // wx.navigateBack()
      })
      .catch(data => {
        console.log(`一键登录失败`, data)
      })
  }

}
module.exports = {
  getUserInfo,
  quickLogin,
  hasAuth,
  wxLogin,
  getWxCode,
  saveWXInfo,
  saveLogin,
  checkUserWxLogin
}