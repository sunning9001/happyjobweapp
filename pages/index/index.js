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
    tags : [
      {
          name : '班车'
      },
      {
          name : '工作餐'
      },
      {
          name : '节日福利'
      },
      {
          name : '五险一金'
      },
      {
          name : '加班补助'
      }
    ],
    cityName:'',
    keyWord:'',
    posNature: 0,//职位性质（1、实习，2、兼职，3、全职）
    retOn: 0,//是否入职返现
    hotOn: 1,//是否热门
    welfareOn: 0,//是否福利岗位
    urgentOn: 0,//是否高薪急聘
    groupOn: 0,//是否是拼团岗位
    currentPage: 1,//当前分页
    showCount: 10,//单页展示记录数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchBanner()
    this.fetchList({     
      hotOn:1
    })
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

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
    let paramsObj = {
      cityName: this.data.cityName,
      showCount: this.data.showCount,
    }
    Object.assign(paramsObj, params)

    getIndexList(paramsObj).then(data => {
      console.log(data)
      this.setData({
        list:data.list
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
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/index?hpPositionId=' + id,
    })
  },

  //改变列表
  changeList(e){
    const { index } = e.currentTarget.dataset
    this.setData({currentPage:1})
    let data ={      
      currentPage: 1,
    }
    if(index==0){}
    switch(index){
      case 0: data.posNature = 3;break;        
      case 1: data.posNature = 2; break;
      case 2: data.retOn = 1; break;
      case 3: data.hotOn = 1; break;
      case 4: data.urgentOn = 1;break;
    }
    this.fetchList(data)
  },

  //TODO:分页加载
})