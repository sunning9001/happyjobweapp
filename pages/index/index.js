import { getBanner, getIndexList } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    activity: [
      {
        src: app.globalData.imgHost + "/images/home/quanzhi.png",
        text: "全职工作"
      },
      {
        src: app.globalData.imgHost + "/images/home/jianzhi.png",
        text: "兼职工作"
      },
      {
        src: app.globalData.imgHost + "/images/home/fanxian.png",
        text: "入职返现"
      },
      {
        src: app.globalData.imgHost + "/images/home/gangwei.png",
        text: "爆品岗位"
      },
      {
        src: app.globalData.imgHost + "/images/home/jipin.png",
        text: "高薪急聘"
      }
    ],
    cityName:'',
    keyWord:'',
    // posNature: 0,//职位性质（1、实习，2、兼职，3、全职）
    // retOn: 0,//是否入职返现
    // hotOn: 1,//是否热门
    // welfareOn: 0,//是否福利岗位
    // urgentOn: 0,//是否高薪急聘
    // groupOn: 0,//是否是拼团岗位
    currentPage: 1,//当前分页
    totalPage:1,//总页数
    isScroll:true,//是否可以滚动
    showCount: 3,//单页展示记录数
    index:3,//岗位类型
  },
  onLoad: function (options) {
    this.fetchBanner()
    this.fetchList({     
      hotOn:1
    })
  },
  onShow: function () {

  },
  onReachBottom: function () {
    var currentPage = this.data.currentPage+1;
    this.setData({
      currentPage
    })
    let data = this.workType(this.data.index)
    this.fetchList(data)
  },
  onShareAppMessage: function (e) {
    console.log(e)
  },  
  // 获取banner图
  fetchBanner(){
    getBanner().then(data=>{
      console.log(data)
      this.setData({
        imgList:data.list
      })
    })   
  },
  //获取列表数据
  fetchList(params){
    if(!this.data.isScroll){
      return false
    }
    let paramsObj = {
      cityName: this.data.cityName,
      showCount: this.data.showCount,
      currentPage:this.data.currentPage
    }
    Object.assign(paramsObj, params)

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
        setData.list = data.list
      } else if (totalPage && currentPage<=totalPage){
        setData.list= this.data.list.concat(data.list)
      }else{
        setData.list = []
      }
      console.log(...setData)
      this.setData({
        ...setData
      })
      
    })
  },

  // 去搜索页
  toSearch(){
    wx.navigateTo({
      url: '../search/index',
    })
  },

  // 去城市选择页
  toCity(){
    wx.navigateTo({
      url: '../location/index',
    })
  },

  //去详情页
  toDetail(e){
    const { id, type } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/index?hpPositionId=' + id+"&type="+type,
    })
  },

  //改变列表
  changeList(e){
    const { index } = e.currentTarget.dataset
    this.setData({
      currentPage:1,
      index:index,
      isScroll:true
    })
    let data = this.workType(index)
    this.fetchList(data)
  },

  //判断当前工作类型
  workType(index){
    var data = {}
    switch (index) {
      case 0: data.posNature = 3; break;
      case 1: data.posNature = 2; break;
      case 2: data.retOn = 1; break;
      case 3: data.hotOn = 1; break;
      case 4: data.urgentOn = 1; break;
    }
    return data
  }
})