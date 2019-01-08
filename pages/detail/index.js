import { getPositionDetail, positionApply, groupApply } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    host:app.globalData.host,
    current: 'tab1',
    current_scroll: 'tab1',
    hpPositionId:0,
    posName: '',
    approveState: '',
    reTotalMoney: '',
    comName: '',
  },
  onLoad: function (options) {
    this.data.hpPositionId = options.hpPositionId
    this.fetchData()
  },
  onShow: function () {

  },

  onShareAppMessage: function () {

  },

  fetchData(){
    getPositionDetail(this.data.hpPositionId).then(data=>{
      console.log(data)
      let { posName, approveState, reTotalMoney, comName} = data.data
      let datas = data.data
      this.setData({
        posName,
        approveState,
        reTotalMoney,
        comName,
      })
    })
  },  
  //申请开团
  tuan(){
    positionApply(this.data.hpPositionId).then(data=>{
      console.log(data)
    })
  },
  //参与拼团
  joinTuan() {
    groupApply(this.data.hpPositionGroupId).then(data => {
      console.log(data)
    })
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  }
})