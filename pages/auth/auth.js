import { imgServerUrl } from '../../config/config.js'
import { getWxPhone } from '../../services/wx.js'

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    imgServerUrl: imgServerUrl,
    isShow: true
  },
  onLoad: function (options) {
    
  },
  getPhoneNumber: function (e) {
    console.log(e)
    let iv = e.detail.iv ||''
    let encryptedData = e.detail.encryptedData||''
    if (iv) {
      //用户按了允许授权按钮
      getWxPhone({
        iv: iv,
        encryptedData: encryptedData,        
      }).then(data=>{
        wx.navigateBack()
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法正常使用小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

})