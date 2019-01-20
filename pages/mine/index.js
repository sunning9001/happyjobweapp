import { imgServerUrl } from '../../config/config.js'
import { getCenterInfo } from '../../services/index.js'
var app = getApp()
Page({
  data: {
    imgServerUrl:imgServerUrl
  },
  onShow: function () {
    this.fetchData()
  },
  fetchData(){
    getCenterInfo().then(data=>{
      console.log(data)
      data.data.userName = data.data.userName || data.data.realName || app.globalData.userInfo.nickName
      data.data.headerPic = data.data.headerPic || app.globalData.userInfo.avatarUrl
      let { headerPic, userName, approveState, hpUserId, phoneNo }=data.data
      userName=decodeURIComponent(userName)
      this.setData({
        headerPic,
        userName,
        approveState,// 认证状态（0、未申请认证，1、认证通过，2、认证不通过，3、认证待审核） ,
        hpUserId,//是否有简历 0，空没有简历，>1有简历        
      })
      
      if(!phoneNo){
        wx.navigateTo({
          url: '../auth/auth',
        })
      }
    })
  },
  //去认证页面
  toAuth(){
    let approveState = this.data.approveState
    console.log(approveState)
    if (approveState==0){
      //身份认证
      wx.navigateTo({
        url: '../identification/index',
      })
    } else if (approveState == 1){
      //个人信息页面
      wx.navigateTo({
        url: '../user-form/index',
      })
    } else if (approveState == 2) {
      //认证不通过
      wx.navigateTo({
        url: '../result/index?type=auth&status=0',
      })
    } else if (approveState == 3) {
      //待审核
      wx.navigateTo({
        url: '../result/index?type=auth&status=2',
      })
    }
  },  
})