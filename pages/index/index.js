const app = getApp();
// import { banner, position } from '../../utils/api'
// import { fetchPost,fetchGet } from '../../utils/request'

Page({
  data: {
    // 活动入口数据
    activity: [],
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
  ]
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
    this.fetchData()
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  fetchData(){
    // let bannerData = {
    //   useOn:1,
    //   delOn:0,
    //   state:1,
    //   isPage:0
    // }
    // fetchGet(banner, bannerData,(err,res)=>{
    //   console.log(res)
    //   this.setData({
    //     bannerList:res.list
    //   })
    // })
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