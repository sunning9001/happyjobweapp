import { getJianli } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    
  },
  onLoad: function (options) {
    this.fetchData()
  },
  fetchData(){
    getJianli().then(data=>{
      console.log(data)
    })
  },
  // 修改基本信息
  toUserInfo(){
    wx.navigateTo({
      url: '../user-info/user-info',
    })
  },
  // 修改求职意向
  toUserJob(){
    wx.navigateTo({
      url: '../user-job/index',
    })
  },
  // 修改工作经验
  toUserWorks(){
    wx.navigateTo({
      url: '../user-works/index',
    })
  },
  //修改教育背景
  toUserEdu(){
    wx.navigateTo({
      url: '../user-education/index',
    })
  }
})