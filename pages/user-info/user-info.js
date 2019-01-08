import { resumeBase } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    sex: ["男", "女"],
    sex_index: 0,
    education: ["初中", "中专","高职"],
    education_index: 0,
  },
  onLoad: function (options) {

  },
  fetchData() {
    resumeBase({
      hpEducationId: '',
      hpUserId: '',
      hpUserResumeId: '',
      resBornTime: '',
      resGender: '',
      resName: '',
      resPhone: '',
      resPic: '',
      resTime: ''
    }).then(data => {
      console.log(data)
    })
  },
})