import { imgServerUrl } from '../../config/config.js'
import { getCenterInfo } from '../../services/index.js'
const app = getApp();

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
      let { headerPic, userName, approveState, hpUserId}=data.data
      this.setData({
        headerPic,
        userName,
        approveState,// 认证状态（0、未申请认证，1、认证通过，2、认证不通过，3、认证待审核） ,
        hpUserId,//是否有简历 0，空没有简历，>1有简历        
      })
    })
  },
  //去认证页面
  toAuth(){
    let approveState = this.data.approveState
    if (approveState==0){
      //身份认证
      wx.navigateTo({
        url: '../identification/index',
      })
    } else if (approveState == 1){
      //个人信息页面
      wx.navigateTo({
        url: '../user-info/user-info',
      })
    } else if (approveState == 2) {
      return
      //TODO:认证不通过
      wx.navigateTo({
        url: '../identification/index',
      })
    } else if (approveState == 3) {
      return 
      //TODO:待审核
      wx.navigateTo({
        url: '../identification/index',
      })
    }
  },  
  //TODO:手机号获取
})