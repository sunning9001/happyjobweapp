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
      let { headerPic, userName, 
        approveState,
      }=data.data
      this.setData({
        headerPic,
        userName,
        approveState,// 认证状态（0、未申请认证，1、认证通过，2、认证不通过，3、认证待审核） ,
        
      })
    })
  },
  //去认证页面
  toAuth(){
    wx.navigateTo({
      url: '../identification/index',
    })
  },
  //TODO:认证中页面，认证失败页面
  //个人信息页面
  toform(){
    wx.navigateTo({
      url: '../user-form/index',
    })
  }
})