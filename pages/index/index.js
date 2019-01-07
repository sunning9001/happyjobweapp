import { getBanner, getIndexList } from '../../services/index.js'
const app = getApp();

Page({
  data: {
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
    cityName:'无锡',
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
    this.setData({
      activity:[
        {
          src: app.globalData.imgHost+"/images/home/quanzhi.png",
          text: "全职工作"
        },
        {
          src: app.globalData.imgHost+"/images/home/jianzhi.png",
          text: "兼职工作"
        },
        {
          src: app.globalData.imgHost+"/images/home/fanxian.png",
          text: "入职返现"
        },
        {
          src: app.globalData.imgHost+"/images/home/gangwei.png",
          text: "爆品岗位"
        },
        {
          src: app.globalData.imgHost+"/images/home/jipin.png",
          text: "高薪急聘"
        }
      ]
    })
    this.fetchBanner()
    this.fetchList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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
  onShareAppMessage: function (e) {
    console.log(e)
  },  
  // 获取banner图
  fetchBanner(){
    getBanner().then(data=>{
      console.log(data)
    })   
  },
  //获取列表数据
  fetchList(){
    getIndexList({
      cityName: this.data.cityName,
      keyWord: this.data.keyWord,
      posNature: this.data.posNature,
      retOn: this.data.retOn,
      hotOn: this.data.hotOn,
      welfareOn: this.data.welfareOn,
      urgentOn: this.data.urgentOn,
      groupOn: this.data.groupOn,
      currentPage: this.data.currentPage,
      showCount: this.data.showCount
    }).then(data => {
      console.log(data)
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
  toDetail(){
    wx.navigateTo({
      url: '../detail/index',
    })
  }
})