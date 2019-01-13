
import { sendPhoneCode, getPayrollId } from '../../services/index.js'
import { showToast } from '../../utils/tips.js'
import { imgServerUrl} from '../../config/config.js'
Page({

  data: {
    imgServerUrl: imgServerUrl,
    iphone:"",
    yzm:'',  
    leftTime:0,
    // timeFormat: ['秒'],
  },

  //下一步提交
  next(e){
    if (this.data.iphone.length != 11) {
      showToast('请输入11位手机号码！')
      return
    }
    if (this.data.yzm.length != 4) {
      showToast('请输入4位手机号码！')
      return
    }
    getPayrollId({
      phoneNo:this.data.iphone,
      phoneCode:this.data.yzm
    }).then(data=>{
      
      wx.navigateTo({
        url: '../wages/index?idNum='+data.data.idNum+"&realName="+data.data.realName,
      })
    })
    
  },
  // 手机号输入
  bindPhoneInput(e){
    this.data.iphone = e.detail.detail.value
  },
  // 验证码号输入
  bindCodeInput(e) {
    this.data.yzm = e.detail.detail.value
  },
  timeLinsterner(e){
    this.setData({
      leftTime: 0
    })
  },
// 验证码发送
  sendCode(e){
    if(this.data.iphone.length != 11){
      showToast('请输入11位手机号码！')
      return
    }
    sendPhoneCode({
      phoneNo:this.data.iphone
    }).then(data =>{
      this.setData({
        leftTime: new Date().getTime() + 59 * 1000
      })
    })
  },
})