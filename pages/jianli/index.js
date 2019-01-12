import { getResume } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
const app = getApp();

Page({
  data: {
    imgServerUrl: imgServerUrl,
    hpUserId:'',//是否有简历
    eduName:'',//学历
    expYear:"",//工作几年
    hpUserResumeId:'',//用户简历表id
  },
  onLoad: function (options){
    console.log(options)
    let { hpUserId=0 } = options
    this.setData({
      hpUserId
    })
    if (!hpUserId){
      wx.navigateTo({
        url: '../user-info/index',
      })
    }
  },
  onShow:function(options){
    //是否有简历
    this.fetchData()
  },
  fetchData(){
    getResume().then(data=>{
      console.log(data)
      if(!data.data){
        wx.navigateTo({
          url: '../user-info/index',
        })
      }
      let { eduList, expList, intentionList, resumeBase }= data.data
      let eduName = eduList[eduList.length - 1].eduName
      let diff = expList[expList.length - 1].startTime - expList[0].startTime
      let expYear = Math.floor(diff / 60 / 60 / 24 / 365)
      this.setData({
        eduList,
        expList,
        intentionList,
        resumeBase,
        eduName,
        expYear,
        hpUserResumeId: resumeBase.hpUserResumeId
      })
    })
  },
  
  // 修改基本信息
  toUserInfo(){
    wx.navigateTo({
      url: '../user-info/user-info?hpUserResumeId=' + this.data.hpUserResumeId,
    })
  },
  // 修改求职意向
  toUserJob(){
    wx.navigateTo({
      url: '../user-job/index?hpUserResumeId=' + this.data.hpUserResumeId,
    })
  },
  // 修改工作经验
  toUserWorks(){
    wx.navigateTo({
      url: '../user-works/index?hpUserResumeId=' + this.data.hpUserResumeId,
    })
  },
  //修改教育背景
  toUserEdu(){
    wx.navigateTo({
      url: '../user-education/index?hpUserResumeId=' + this.data.hpUserResumeId,
    })
  }
})