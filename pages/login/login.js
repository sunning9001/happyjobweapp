var Api = require('../../utils/api.js');
var request = require('../../utils/request.js');
var tools = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.getWXInfo();
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.getWXInfo();    
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
  login() {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        const code = res.code;
        //小程序登录
        request.fetchGet(Api.wxMallLogin, {
          code: code,
          rd: tools.getRandom(10)
        }, (err, res) => {
          console.log(res)
          app.globalData.oid = res.oid;
          app.globalData.sid = res.sid;
          app.globalData.userToken = res.userToken;
          app.globalData.sessionKey = res.sessionKey;

          this.getUserInfo();
        })
      }
    })
  },
  getWXInfo() {
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.login();          
        }
      }
    })
  },
  getUserInfo(){
    wx.getUserInfo({
      success: res => {
        console.log(res)
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo;
        this.saveWXInfo();        
      }
    })
  },
  saveWXInfo() {
    wx.request({
      method:'POST',
      url: Api.wxLogin,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "oid": app.globalData.oid
      },
      data: {
        headerUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        gender: app.globalData.userInfo.gender
      },
      success(res) {
        console.log(res)
        wx.switchTab({
          url: '../home/home',
        })
      },
      fail(e) {
        console.error(e)
      }
    })
  }

})