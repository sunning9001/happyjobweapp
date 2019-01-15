import { resumeExp } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
import { formatNumber, argusToTimestamp} from '../../utils/util.js'

Page({
  data: {
    imgServerUrl: imgServerUrl,
    comName:'',
    jobName:'',
    startDate:'',
    endDate:'',
    startDateEnd:'',
    hpUserExpId: '',//求职者工作经验表
    hpUserResumeId: '',//用户简历表id 
  },
  onLoad: function (options) {
    let { hpUserResumeId,index } = options
    if(typeof index !="undefined"){
      let expList = wx.getStorageSync('expList')[index]
      this.setData({
        comName: expList.comName,
        jobName:expList.posType,
        hpUserResumeId: expList.hpUserResumeId,
        hpUserExpId: expList.hpUserExpId
      })
    }else{
      this.setData({
        hpUserResumeId
      })
    }

    let year = new Date().getFullYear()
    let month = formatNumber(new Date().getMonth()+1)
    let day = formatNumber(new Date().getDate())
    let startDateEnd = year + '-' + month + '-' + day
    this.setData({
      startDateEnd: startDateEnd
    })
  },
  //入职时间
  startDateChange(e){
    this.setData({
      startDate:e.detail.value
    })
  },
  //离职时间
  endDateChange(e){
    this.setData({
      endDate: e.detail.value
    })
  },
  //公司名称 TODO:排除特殊字符，空格
  changeComName(e){
    this.setData({
      comName:e.detail.detail.value.trim()
    })
  },
  //工作职位 TODO:排除特殊字符，空格
  changeJobName(e){
    this.setData({
      jobName: e.detail.detail.value.trim()
    })
  },
  //验证
  check(){
    let { comName, jobName, startDate, endDate } = this.data
    if(comName==""){
      showToast('请填写公司名称')
      return false
    }
    if(jobName==""){
      showToast("请填写职位")
      return false
    }
    if(startDate.length==0){
      showToast("请选择入职时间")
      return false
    }
    if (endDate.length == 0) {
      showToast("请选择离职时间")
      return false
    }
    return true
  },
  submit() {
    let flag = this.check()
    if(!flag){
      return
    }
    let { comName, jobName, startDate, endDate, hpUserExpId, hpUserResumeId } = this.data
    let startTime = argusToTimestamp(startDate.split("-"))
    let endTime = argusToTimestamp(endDate.split("-"))
    resumeExp({
      comName,
      startTime,
      endTime,  
      hpUserExpId,
      hpUserResumeId ,
      posType: jobName,
    }).then(data => {
      console.log(data)
      showToast('保存成功','success')
      wx.navigateBack()
    })
  },
})