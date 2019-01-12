import { imgServerUrl } from '../../config/config.js'
import { getIndexList, getPositionList } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    cityName: '无锡',
    currentPage: 1,//当前分页
    showCount: 50,//单页展示记录数,
    clearTimer:false
  },

  onLoad: function (options) {
    
  },
  onReady: function () {
    this.fetchList()
    this.fetchPt()
  },
  onShow: function () {

  },
  //获取列表数据
  fetchList() {
    let paramsObj = {
      cityName: this.data.cityName,
      showCount: this.data.showCount,
      currentPage: this.data.currentPage,
      groupOn:1
    }
    getIndexList(paramsObj).then(data => {
      console.log(data)
      this.setData({
        list:data.list
      })
    })
  },
  //获取我参与的拼团
  fetchPt(){
    getPositionList({
      groupOn: 1,
      currentPage: 1,
      showCount: 1
    }).then(data => {      
      console.log(data)
      this.setData({
        myList: data.list.map(item => {
          item.groupLeftTime = new Date().getTime() + item.groupLeftTime*1000
          return item
        })
      })
    })
  },
  //去详情页
  toDetail(e) {
    const { id, type } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/index?hpPositionId=' + id + "&type=" + type,
    })
  },
  //倒计时结束回调
  myLinsterner(){
    this.fetchPt()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})