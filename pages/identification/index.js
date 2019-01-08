import { postApprove } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    realName:'',
    idNum:'',
    idFrontPic:'',
    idBackPic:'',
    idPersonPic:''
  },
  onLoad: function (options) {

  },
  submit(){
    postApprove({
      realName: '',
      idNum: '',
      idFrontPic: '',
      idBackPic: '',
      idPersonPic: ''
    }).then(data=>{
      console.log(data)
    })
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
})