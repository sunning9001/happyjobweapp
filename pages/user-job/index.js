import { resumeIntent } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    sex: ["初中", "中专", "高职"],
    sex_index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  onLoad: function (options) {
  },
  fetchData(){
    resumeIntent({
      hpPositionSalaryId:'',
      hpUserIntentionId :'',
      hpUserResumeId :'',
      posType:'',
      workArea:''
    }).then(data=>{
      console.log(data)
    })

  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})