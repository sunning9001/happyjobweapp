import { getCenterInfo, sendPhoneCode, usePhoneBound } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
const app = getApp();
Page({
  data: {
    imgServerUrl: imgServerUrl,
    bornYear:'',
    gender:'',
    realName:'',
    zym:'',
    phone:'',
    isShowYzm:false,
  },
  onLoad: function (options) {
    this.fetchData()
  },
  fetchData(){
    getCenterInfo().then(data=>{
      console.log(data)
      let { bornYear, gender, realName } = data.data
      bornYear = Date.parse(new Date())
      this.setData({
        bornYear, gender, realName
      })
    })
  },
  //TODO:倒计时

  sendCode(){
    if (this.data.phone.lenght!=11 ){
      showToast("请输入11位手机号")
      return false
    }
    this.setData({
      isShowYzm:true
    })
    sendPhoneCode({
      phoneNo:this.data.phone
    }).then(data=>{
      console.log(data)
    })
  },
  save(){
    let { phone,yzm } = this.data
    if( phone.lenght!=11){
      showToast("请输入手机号")
      return false
    }
    if(yzm.lenght!=4){
      showToast("请输入验证码")
      return false
    }
    usePhoneBound({
      phoneNo: phone,
      msgCode: yzm
    }).then(data=>{
      console.log(data)
    })
  }
})