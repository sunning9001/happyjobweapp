import { resumeEdu } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    date: '2016-09-01',
    education: ["初中", "中专", "高职"],
    education_index: 0,
  },
  onLoad: function (options) {

  },
  fetchData() {
    resumeEdu({
      endTime : '',
      hpEducationId : '',
      hpUserEducationId : '',
      hpUserResumeId : '',
      schName : '',
      startTime :''
    }).then(data => {
      console.log(data)
    })

  },
})