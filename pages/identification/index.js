import { postApprove } from '../../services/index.js'
import { uploadImg } from '../../services/uploadFile.js'
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
  chooseImage(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        const image = res.tempFilePaths[0]
        uploadImg({
          code:'user',
          filePath:image
        }).then(res=>{
          console.log(res.data)
          let image = res.data.imgUrl
          if (index == 1) {
            this.setData({
              idFrontPic: image
            })
          } else if (index == 2) {
            this.setData({
              idBackPic: image
            })
          } else if (index == 3) {
            this.setData({
              idPersonPic: image
            })
          }
        })
      }
    })
  },
  changeName(e){
    this.setData({
      realName: e.detail.detail.value.trim()
    })
  },
  changeId(e){
    console.log(e)
    this.setData({
      idNum: e.detail.detail.value.trim()
    })
  },
  submit(){
    let { realName,idNum,idFrontPic,idBackPic,idPersonPic } = this.data
    if (realName=="") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false;
    }
    if (idNum.toString().length!=18){
      wx.showToast({
        title: '请输入18位身份证号码',
        icon: 'none'
      })
      return false;
    }
    if (idFrontPic == ""){
      wx.showToast({
        title: '请上传身份证正面照',
        icon: 'none'
      })
      return false;
    }
    if (idBackPic == "") {
      wx.showToast({
        title: '请上传身份证反面照',
        icon: 'none'
      })
      return false;
    }
    if (idPersonPic == "") {
      wx.showToast({
        title: '请上传手持身份证照片',
        icon: 'none'
      })
      return false;
    }
    wx.showLoading({
      title: '正在创建...',
      mask: true
    })      
    wx.hideLoading()
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    postApprove({
      realName,
      idNum,
      idFrontPic,
      idBackPic,
      idPersonPic
    }).then(data=>{
      console.log(data)
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
      //TODO:跳转到申请审核中页面
      console.log("跳转到申请审核中页面")
    })
  },  
})