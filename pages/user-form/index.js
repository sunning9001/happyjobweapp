import { resumeBase } from '../../services/index.js'
const app = getApp();
Page({
  data: {
    sex: ["男", "女"],
    sex_index: 0,
  },
  onLoad: function (options) {

  },
  fetchData(){
    resumeBase({  
      hpEducationId :'',
      hpUserId :'',
      hpUserResumeId :'',
      resBornTime :'',
      resGender :'',
      resName :'',
      resPhone :'',
      resPic :'',
      resTime :''
    }).then(data=>{
      console.log(data)
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})