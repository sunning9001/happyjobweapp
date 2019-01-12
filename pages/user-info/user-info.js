import { imgServerUrl } from '../../config/config.js'
import { resumeBase, eduList } from '../../services/index.js'
import { uploadImg } from '../../services/uploadFile.js'
import { showToast } from '../../utils/tips.js'
const app = getApp();

Page({
  data: {
    imgServerUrl: imgServerUrl,
    sex: ["男", "女"],
    sex_index: 0,
    eduList: [],
    eduIndex: 0,
    avatar: imgServerUrl+"/images/avatar/man.png",
    name:'',
    year:'',
    iphone:'',
    hpUserResumeId:''
  },
  onLoad: function (options) {
    let {hpUserResumeId=""} = options
    if (hpUserResumeId ){
      this.setData({
        hpUserResumeId
      })
    }
    //TODO:如果已经认证，自动填写已有信息
    //TODO:获取已编辑过信息
    //TODO:手机号绑定
    this.fetchEduList()
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
      name: value.trim()
    }) 
  },
  changeYear(e) {
    console.log(e)
    let { value } = e.detail.detail
    this.setData({
      year: value.trim()
    })
  },
  changeIphone(e) {
    console.log(e)
    let { value } = e.detail.detail
    this.setData({
      iphone: value.trim()
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
    let nowYear = new Date().getFullYear();    
    if (year == "" || year.length != 4 || Number(year) > nowYear) {
      showToast('请输入出生年份');
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
      resBornTime: year,
      resGender: sex_index==0?1:2,
      resName: name,
      resPhone: iphone,
      resPic: avatar
    }).then(data => {
      console.log(data)
      showToast('保存成功','success')
      wx.navigateBack()
    }).catch(err=>{
      showToast(err.message)
    })
  },
})