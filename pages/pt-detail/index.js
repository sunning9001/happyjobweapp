import { getGroupDetail,groupApply } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
import { updataStorageData } from '../../utils/storage.js'

var app = getApp()

Page({
  data: {
    imgServerUrl: imgServerUrl,
    clearTimer:false
  },

  onLoad: function (options) {
    this.setData({
      hpPositionGroupId : options.hpPositionGroupId
    })

  },
  onShow: function (options) {
    if (app.globalData.userInfo) {
      console.log('有info===', app.globalData)
      this.fetchData()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback===', app.globalData)
        this.fetchData()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log('兼容处理===', app.globalData)
          this.fetchData()
        }
      })
    }
  },
  onUnload:function(){
    this.setData({
      clearTimer:true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '开心工作参团有奖',
      path: '/pages/pt-detail/index?shareToken=' + updataStorageData('shareToken'),
      imageUrl: ''
    }
  },
   //获取历史记录
  fetchData() {    
    getGroupDetail({
      hpPositionGroupId: this.data.hpPositionGroupId
    }).then(data => {
      data.data.leftTime = data.data.leftTime <= 0 ? 0 : (new Date().getTime() + data.data.leftTime * 1000)
      console.log(data.data.leftTime)
      let userList = data.data.userList
      if (userList && userList.length<3){
        let i = userList.length;
        for (; i < 3;i++){
          userList[i] = { headerPic: this.data.imgServerUrl+'/images/avatar/man.png' }
        }
      }
      this.setData({
        data:data.data
      })
    })
  },
// 拼团倒计时结束
  myLinsterner(e){
    this.setData({
      clearTimer:true
    })
    showToast('拼团已结束')
  },
// 一键参团
  joinGroup(e){
    groupApply(this.options.hpPositionGroupId).then(data=>{
      this.fetchData()
    })
  },

  //分享图片
  toShare(){
    wx.navigateTo({
      url: '../pt-share/pt-share?hpPositionGroupId='+this.data.hpPositionGroupId,
    })
  }  
})