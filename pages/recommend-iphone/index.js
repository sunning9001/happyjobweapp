import { imgServerUrl } from '../../config/config.js'
import { shareBound } from '../../services/index.js'
import { showToast } from '../../utils/tips.js'
import { updataStorageData } from '../../utils/storage.js'
Page({
  data: {
    imgServerUrl: imgServerUrl,
    errorFlag:0,
    phoneNo:'',
    shareToken: '',
  },
  onLoad: function (options) {
    this.data.shareToken = updataStorageData('shareToken')
  },
// 手机号输入框
  bindPhoneBlur(e){
    console.log(e)
    this.setData({
      phoneNo:e.detail.detail.value,
    })
  },
  //确认按钮点击
  dataSub(e){

    console.log(this.data.shareToken)
    if (this.data.phoneNo.length != 11) {
      showToast('请输入11位手机号码！')
      return
    }
    shareBound({
      shareToken: this.data.shareToken,
      phoneNo: this.data.phoneNo,
    }).then(data=>{
      this.setData({
        errorFlag: 1,
      })
    }).catch(err=>{
      console.log(err)
      if(err.errorCode == 2){
        this.setData({
          errorFlag:2,
        })
      }
    })
  },
  // 绑定成功后确定进入首页
  bindSuccessTap(e){
    wx.switchTab({
      url: '../index/index'
    })
  },
  // 绑定失败后返回
  bindFailTap(e) {
    this.setData({
      errorFlag: 0,
    })
  },
})