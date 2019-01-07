import { getPositionList } from '../../services/index.js'
const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    this.fetchData()
  },
  onShow: function () {

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

  },
  //获取我参与的拼团
  fetchData() {
    getPositionList({
      groupOn: 1,
      currentPage: 0,
      showCount: 10
    }).then(data => {
      console.log(data)
    })
  },
})