import { imgServerUrl } from '../../config/config.js'

Page({
  data: {
    imgServerUrl: imgServerUrl,
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  toShare(){
    wx.navigateTo({
      url: '../recommend-share/index',
    })
  }
})