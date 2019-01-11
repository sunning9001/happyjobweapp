import { getPositionList } from '../../services/index.js'
const app = getApp();
Page({
  data: {
    currentPage: 1,//当前分页
    totalPage: 1,//总页数
    isScroll: true,//是否可以滚动
    showCount: 10,//单页展示记录数
    list:[]
  },
  onLoad: function (options) {
    this.fetchData()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    var currentPage = this.data.currentPage + 1;
    this.setData({
      currentPage
    })
    this.fetchData()
  },
  onShareAppMessage: function () {

  },
  //获取我参与的拼团
  fetchData() {
    if (!this.data.isScroll) {
      return false
    }
    getPositionList({
      currentPage: this.data.currentPage,
      showCount: this.data.showCount
    }).then(data => {
      console.log(data)
      let { currentPage, totalPage } = data.page
      let setData = {
        currentPage,
        totalPage,
      }
      // 是否可以滚动加载数据
      if (totalPage == 0 || currentPage == totalPage) {
        setData.isScroll = false
      }
      if (currentPage == 1) {
        setData.list = data.list
      } else if (totalPage && currentPage <= totalPage) {
        setData.list = this.data.list.concat(data.list)
      } else {
        setData.list = []
      }
      console.log(...setData)
      this.setData({
        ...setData
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
})