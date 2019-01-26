require("./utils/string.js")
const ald = require('./libs/ald-stat.js')
var api = require('./api/api.js')
import { http } from './utils/http.js'
import { updataStorageData } from './utils/storage.js'
import { getWxCode, hasAuth, getUserInfo } from './utils/wx.js'
import { wxLogin, saveLogin } from './services/wx.js'

var startTime = Date.now();//启动时间
App({
  onLaunch: function(options) {
    this.aldstat.sendEvent('小程序的启动时长', {
      time: Date.now() - startTime
    })
    console.log(options)
    // let sceneArr = [1007, 1008, 1044, 1011, 1012, 1013, 1047, 1048, 1049]
    let shareToken = options.query.shareToken || null
    getWxCode().then(code=>{
      return wxLogin({
        code: code,
        shareToken: shareToken
      })
    })
    .then(res=>{
      console.log(res)
      this.globalData.oid = res.data.oid ? res.data.oid : '';
      this.globalData.sid = res.data.sid ? res.data.sid : '';
      this.globalData.userToken = res.data.userToken ? res.data.userToken : '';
      this.globalData.sessionKey = res.data.sessionKey ? res.data.sessionKey : '';
      updataStorageData('shareToken', res.data.shareToken || '')//用户识别码
      return hasAuth('scope.userInfo')
    })
    .catch(err=>{
      console.log("没用获取用户信息权限")
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return 
    })
    .then(data=>{
      return getUserInfo()
    })
    .then(data=>{
      console.log(data)
      this.globalData.userInfo = data.userInfo;
      updataStorageData('city', data.userInfo.city)
      saveLogin({
        encryptedData: encodeURIComponent(data.encryptedData),
        iv: encodeURIComponent(data.iv),
      }).then(data=>{
        console.log(data)
      }).catch(data=>{
        console.log(data)
      })
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },
  onShow(options) {
    console.log(options)

    //群聊信息
    if (options.shareTicket) {
      this.getShareInfo(options.shareTicket)
    }
  },
  globalData: {
    userInfo: null,
    oid: '',
    sid: '',
    sessionKey:'',
    city: updataStorageData('city') ||''
  },
  //页面分享
  onShareAppMessage: function() {
    wx.showShareMenu({
      withShareTicket: true,
      success: (res) => { // 成功后要做的事情
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  //获取群聊分享信息
  getShareInfo(shareTicket) {
    wx.getShareInfo({
      shareTicket: shareTicket,
      success: (res) => {
        //需后台解析数据 encryptedData iv
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {}
    })
  },

  // 跳转登录页面
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})