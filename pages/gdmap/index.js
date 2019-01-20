var amapFile = require('../../utils/amap-wx.js');//如：..­/..­/libs/amap-wx.js

const app = getApp();

Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'eb9f7f7926714826325c3adfe0c6b93b' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
})