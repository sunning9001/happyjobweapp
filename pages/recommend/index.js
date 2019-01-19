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
  toPhone(){
    wx.navigateTo({
      url: '../recommend-iphone/index',
    })
  },
  toShare(){
    wx.navigateTo({
      url: '../recommend-share/index',
    })
  }
})