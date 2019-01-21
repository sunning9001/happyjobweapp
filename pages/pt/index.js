import { getIndexList, getPositionList } from '../../services/index.js'
import { formatTime} from '../../utils/util.js'
import { updataStorageData } from '../../utils/storage.js'
const app = getApp();

Page({
  data: {
    cityName: '无锡',
    currentPage: 1,//当前分页
    totalPage:1,//总页数
    isScroll:true,//是否可以滚动
    showCount: 10,//单页展示记录数,
    clearTimer:false
  },
  onLoad: function (options) {
    this.setData({
      cityName:updataStorageData('city') || app.globalData.userInfo.city
    })
  },
  onReady: function () {
    
  },
  onReachBottom: function () {
    var currentPage = this.data.currentPage+1;
    this.setData({
      currentPage
    })
    this.fetchList()
  },
  onShow: function () {
    this.fetchList()
    this.fetchPt()
  },
  //获取列表数据
  fetchList() {
    if(!this.data.isScroll){
      return false
    }
    let paramsObj = {
      cityName: this.data.cityName,
      showCount: this.data.showCount,
      currentPage: this.data.currentPage,
      groupOn:1
    }
    getIndexList(paramsObj).then(data => {
      console.log(data)      
      let { currentPage,totalPage } = data.page
      let setData={
        currentPage,
        totalPage,
      }
      // 是否可以滚动加载数据
      if ( totalPage==0 || currentPage==totalPage) {
        setData.isScroll=false
      }
      if(currentPage == 1){
        setData.list = data.list.map(item=>{
          item.endTime = formatTime(new Date(item.endTime*1000),'yyyy-MM-dd')
          return item
        })
      } else if (totalPage && currentPage<=totalPage){
        let list = data.list.map(item=>{
          item.endTime = formatTime(new Date(item.endTime*1000),'yyyy-MM-dd')
          return item
        })
        setData.list= this.data.list.concat(list)
      }else{
        setData.list = []
      }
      this.setData({
        ...setData
      })

      // this.setData({
      //   list:data.list.map(item=>{
      //     item.endTime = formatTime(new Date(item.endTime*1000),'yyyy-MM-dd')
      //     return item
      //   })
      // })

    })
  },
  //获取我参与的拼团
  fetchPt(){
    if(!app.globalData.sid){
      return false
    }
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
    // this.fetchPt()
  },
  onShareAppMessage: function () {
    return {
      title: '快来开心工作看看吧',
      path: '/pages/index/index?shareToken=' + updataStorageData('shareToken'),
      imageUrl: ''
    }
  }
})