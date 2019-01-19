require("./utils/string.js")
var api = require('./api/api.js')
import { http } from './utils/http.js'
import { updataStorageData } from './utils/storage.js'
const url = api.url;
App({
  onLaunch: function(options) {
    // let sceneArr = [1007, 1008, 1044, 1011, 1012, 1013, 1047, 1048, 1049]
    let shareToken = options.query.shareToken || null
    this.globalData.targetShareToken = shareToken
    this.loginCallback && this.loginCallback()
  },
  onShow(options) {
    console.log(options)

    //群聊信息
    if (options.shareTicket) {
      this.getShareInfo(options.shareTicket)
    }
  },
  globalData: {
    // userInfo: {
    //   avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTITVdksdCsusTicicnhWDib0tjjgW5ASIbpY3xeanBicibz3XLZOPC8CFibWkRyHBzMSz22icQ8Qcrqt6X0g/132",
    //   city: "无锡",
    //   country: "中国",
    //   gender: 1,
    //   language: "zh_CN",
    //   nickName: "我的小窝",
    //   province: "江苏",
    // },
    // oid: '773d8ad1ad9540fc804389a973a54d',
    // sid: '15e5d36a68034a1d8793e5fb76e3ac76',
    userInfo: {},
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
  //获取用户信息权限
  getUserInfo(){
    return new Promise((resolve, reject) => {
      this.hasAuth('scope.userInfo')
        .then(() => {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              console.log(res)
              console.log('获取用户信息成功')
              this.globalData.userInfo = res.userInfo;
              updataStorageData('city', res.userInfo.city)
              this.saveWXInfo(res).then(data => { console.log('保存信息成功') }).catch(data => { console.log('上传微信信息失败', data) })
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
  },

//一键登录
  quickLogin(shareToken) {
    return new Promise((resolve, reject) => {
      this.getWxCode().then(code => {
        return this.wxLogin({
          code: code,
          shareToken: shareToken || null
        })
      }).then(res => {
        this.globalData.oid = res.data.oid;
        this.globalData.sid = res.data.sid ? res.data.sid:'';
        this.globalData.userToken = res.data.userToken ? res.data.userToken:'';
        this.globalData.sessionKey = res.data.sessionKey ? res.data.sessionKey:'';
        updataStorageData('shareToken', res.data.shareToken || '')//用户识别码
        this.loginCallback && this.loginCallback()
        resolve(true)
      }).catch(data => {
        console.log(data)
        reject(data)
      })
    })
  },
  //获取用户信息 判断授权
  hasAuth(setting) {
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
  },
  //商城小程序，根据微信CODE获取微信用户信息
  wxLogin(params) {
    return http({
      url: url.userLogin,
      method: "POST",
      data: params,
    })
  },
  //获得微信临时code
  getWxCode(){
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
  },
  //保存用户信息到后台
  saveWXInfo(params) {
    return new Promise((resolve, reject) => {
      
      this.saveLogin({
        encryptedData: encodeURIComponent(params.encryptedData),
        iv: encodeURIComponent(params.iv),
      })
    })
  },
  //用户微信信息存入
  saveLogin(params) {
    return http({
      url: url.saveUserInfo,
      method: "POST",
      header: {
        oid: this.globalData.oid
      },
      data: params
    })
  },
  // 判断用户是否已微信登录
  checkUserWxLogin(){
    console.log("===",this.globalData)
    console.log(this.globalData["oid"])
    if (this.globalData.oid) {
      console.log('存在登录信息')
      return true
      
    }else{
      console.log('不存在登录信息')
      this.quickLogin(this.globalData.targetShareToken)
        .then(data => {
          console.log('一键登录成功')
          this.getUserInfo().then(data => {
            console.log('获取用户信息成功')
          })
          console.log('quick login 完成')
          // wx.navigateBack()
        })
        .catch(data => {
          console.log(`一键登录失败`, data)
        })
    }

  },
  // 跳转登录页面
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})