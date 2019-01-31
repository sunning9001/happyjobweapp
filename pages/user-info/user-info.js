import { imgServerUrl } from '../../config/config.js'
import { resumeBase, eduList } from '../../services/index.js'
import { uploadImg } from '../../services/uploadFile.js'
import { showToast } from '../../utils/tips.js'
import { argusToTimestamp } from '../../utils/util.js'
import { updataStorageData } from '../../utils/storage.js'
import { http } from '../../utils/http.js'
const app = getApp();

Page({
  data: {
    imgServerUrl: imgServerUrl,
    sex: ["男", "女"],
    sex_index: 0,
    eduList: [],
    eduIndex: 1,
    avatar: '',
    name:'',
    year:'',
    iphone:'',
    hpUserResumeId:null
  },
  onLoad: function (options) {
    let {hpUserResumeId=null,progress=0} = options
    this.setData({
      hpUserResumeId
    })
    this.data.progress=progress//正在进行中，再次请求
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl ? app.globalData.userInfo.avatarUrl:'',
      endDate: new Date().getFullYear(),
      year: '1993'
    })
    this.fetchEduList()
    let phone = updataStorageData('phone')
    if( phone ){
      this.setData({
        iphone:phone
      })
    }
    if( hpUserResumeId ){
      let resumeBase = wx.getStorageSync('resumeBase')
      if (resumeBase.hpUserResumeId){
        this.setData({
          hpUserResumeId:resumeBase.hpUserResumeId,
          avatar: resumeBase.resPic,
          name: resumeBase.resName,
          sex_index: resumeBase.resGender-1,
          year: new Date(resumeBase.resBornTime).getFullYear(),
          iphone:resumeBase.resPhone,
          eduIndex: resumeBase.hpEducationId ? (Number(resumeBase.hpEducationId)-1):0
        })
      }
    }    
  },
  //获取教育水平
  fetchEduList(){
    eduList().then(res=>{
      console.log(res)
      this.setData({
        eduList:res.list
      })
    })
  },
  //改变学历
  bindPickerChange(e){
    console.log(e)
    let {value} = e.detail
    this.setData({
      eduIndex:value
    })
  },
  //改变性别
  bindSexChange(e) {
    console.log(e)
    let { value } = e.detail
    this.setData({
      sex_index: value
    })
  },
  changeName(e){
    console.log(e)
    let { value } = e.detail.detail
    this.setData({
      name: value.excludeSpecial().excludeSpace()
    }) 
  },
  changeYear(e) {
    console.log(e)
    let { value } = e.detail
    this.setData({
      year: value
    })
  },
  changeIphone(e) {
    console.log(e)
    let { value } = e.detail.detail
    this.setData({
      iphone: value.excludeSpecial().excludeSpace()
    })
  },
  //上传图片
  changeImg(){
    uploadImg().then(res => {
      let image = res.data.imgUrl
      this.setData({
        avatar: image
      })
    })
  },

  //验证
  check(){    
    let { avatar,name,year,iphone } = this.data
    if (avatar == (imgServerUrl+"/images/avatar/man.png")){
      showToast('请上传头像'); 
      return false;
    }
    if (name == "") {
      showToast('请输入用户名');
      return false;
    }
    if (this.data.iphone == "" || this.data.iphone.length != 11) {
      showToast('请输入11位手机号');
      return false;
    }
    return true
  },

  //保存
  submit() {
    let flag = this.check()
    if(!flag){
      return
    }
    let { sex_index, eduList, eduIndex, avatar, name, year, iphone, hpUserResumeId}= this.data
    resumeBase({
      hpEducationId: eduList[eduIndex].hpEducationId,
      hpUserResumeId: hpUserResumeId,
      resBornTime: Math.floor(argusToTimestamp([year]) / 1000),
      resGender: sex_index==0?1:2,
      resName: name,
      resPhone: iphone,
      resPic: avatar
    }).then(data => {
      console.log(data)
      showToast('保存成功','success')
      if( this.data.progress ){
        var params = updataStorageData('progress')
        http(params).then(data=>{
          if( params.url=="/frontUser/groupApply" ){
            wx.redirectTo({
              url:'/pages/pt-detail/index?hpPositionGroupId='+params.data.hpPositionGroupId
            })
          }else{
            wx.navigateBack()
          }
        })
      }else{
        wx.navigateBack()
      }
    })
  },
})