var api = require('../api/api.js')
import { http } from '../utils/http.js'

//api地址
const url = api.url;

module.exports = {

  //商城小程序，根据微信CODE获取微信用户信息
  wxLogin(params) {
    return http({
      url: url.userLogin,
      method:"POST",
      data: params,
    })
  },

  //用户微信信息存入
  saveLogin(params) {
    return http({
      url: url.saveUserInfo,
      method: "POST",
      header: params.header,
      data: params.data
    })
  },

  //checkSession
  checkSession(){
    return new Promise((resolve,reject)=>{
      wx.checkSession({
        success() {
          // session_key 未过期，并且在本生命周期一直有效
          resolve(true)
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          // wx.login() // 重新登录
          reject(false)
        }
      })
    })
  },

  //获取微信手机号 
  getWxPhone(params){
    let That = this
    return new Promise((resolve,reject)=>{
      // TODO: checkSession 验证
      wx.login({
        success(res) {
          if (res.code) {
            That.decodePhone({
              code:res.code,
              'encryptedData': encodeURIComponent(params.encryptedData),
              'iv': params.iv,
            }).then(data=>{
              wx.setStorageSync('phone', res.phone);
              resolve(true)
            }).catch(err=>{
              reject(err)
            })
          } else {
            reject(res.errMsg)
          }
        }
      })
    })
  },

  //TODO:后台解密手机号
  decodePhone(){
    http({
      url: '',
      method: "POST",
      data: params,
    })
  }
}