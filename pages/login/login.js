import { imgServerUrl } from '../../config/config.js'
import { wxLogin, saveLogin} from '../../services/wx.js'
var app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgServerUrl: imgServerUrl,
    isShow: false
  },
  onLoad: function () {
    this.start()
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.start()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  start() {
    let enterOptions = wx.getStorageSync("enterOptions")
    let switchTabs = ["pages/index/index", "pages/pt/index", 'pages/mine/index']
    let sceneArr = [1007,1008,1044,1011,1012,1013,1047,1048,1049]
    this.authorize('scope.userInfo').then(data => {
      if (sceneArr.indexOf(enterOptions.scene)!==-1){
        return this.login(enterOptions.query.storeToken)
      }else{
        return this.login()
      }
    }).then(data => {
      this.saveWXInfo()      
      if (switchTabs.indexOf(enterOptions.path) !== -1) {
        wx.switchTab({
          url: "/" + enterOptions.path,
        })
      } else {
        let arr = []
        for (var key in enterOptions.query) {
          arr.push(key + "=" + enterOptions.query[key])
        }
        wx.redirectTo({
          url: "/" + enterOptions.path + "?" + arr.join("&"),
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        isShow: true
      })
    })
  },
  //用户注册登录
  login(storeToken) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          const code = res.code
          wxLogin({
            code:code,
            storeToken: storeToken || null
          }).then(res=>{
            app.globalData.oid = res.oid;
            app.globalData.sid = res.sid;
            app.globalData.userToken = res.userToken;
            app.globalData.sessionKey = res.sessionKey;
            wx.setStorageSync('shareToken', res.shareToken)
            app.callback && app.callback()
            resolve(true)
          })
        }
      })

    })
  },
  //获取用户信息 判断授权
  authorize(setting) {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting[setting]) {
            wx.getUserInfo({
              lang: 'zh_CN',
              success: res => {
                console.log(res)
                app.globalData.userInfo = res.userInfo;
                wx.setStorageSync('city', res.userInfo.city )
                resolve(res)
              }
            })
          } else {
            // 未授权            
            reject(false)
          }
        }
      })
    })
  },
  //保存用户信息到后台
  saveWXInfo() {
    return new Promise((resolve, reject) => {
      let gender = app.globalData.userInfo.gender
      if(gender==0){
        gender=3
      }
      saveLogin({
        header:{
          oid:app.globalData.oid
        },
        data:{
          headerUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName,
          gender: gender,
        }
      })
    })
  },
})