import { getCenterInfo } from '../../services/index.js'
const app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {
    this.fetchData()
  },
  onShow: function () {

  },
  fetchData(){
    getCenterInfo().then(data=>{
      console.log(data)
    })
  },
  toAuth(){
    wx.navigateTo({
      url: '../identification/index',
    })
  },
  toform(){
    wx.navigateTo({
      url: '../user-form/index',
    })
  }
})