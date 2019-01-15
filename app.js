require("./utils/string.js")
App({
  onLaunch: function(options) {

  },
  onShow(options) {
    console.log(options)
    let enterOptions = options
    if (enterOptions.path !== "pages/login/login") {
      wx.setStorageSync("enterOptions", enterOptions)      
    } else {
      enterOptions.path = "pages/index/index"
      wx.setStorageSync("enterOptions", enterOptions)
    }
    // wx.redirectTo({
    //   url: '/pages/login/login',
    // })

    //群聊信息
    // if (options.shareTicket) {
    //   this.getShareInfo(options.shareTicket)
    // }
  },
  globalData: {
    userInfo: {
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTITVdksdCsusTicicnhWDib0tjjgW5ASIbpY3xeanBicibz3XLZOPC8CFibWkRyHBzMSz22icQ8Qcrqt6X0g/132",
      city: "无锡",
      country: "中国",
      gender: 1,
      language: "zh_CN",
      nickName: "我的小窝",
      province: "江苏",
    },
    oid: '773d8ad1ad9540fc804389a973a54d',
    sid: '15e5d36a68034a1d8793e5fb76e3ac76',
    city:wx.getStorageInfoSync('city')
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
})