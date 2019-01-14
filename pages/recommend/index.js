import { imgServerUrl } from '../../config/config.js'

Page({
  data: {
    imgServerUrl: imgServerUrl,
  },

  onLoad: function (options) {
    console.log(options)
    let { oid} = options
    console.log(oid)
  },

  onReady: function () {

  },
  onShow: function (options) {
    console.log(options)

  },
  onShareAppMessage: function (options) {
    console.log(options)
    var shareToken = wx.getStorageSync('shareToken')
    return {
      title:'推荐有奖',
      path: '/pages/recommend-iphone/index?shareToken=' + shareToken,
      imageUrl:''
    }
  },
  toShare(){
    wx.navigateTo({
      url: '../recommend-share/index',
    })
  }
})