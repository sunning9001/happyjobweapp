import { getGroupDetail } from '../../services/index.js'
// pages/pt-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onShareAppMessage: function () {

  },

   //获取历史记录
  fetchData() {
    
    getGroupDetail({
      hpPositionGroupId: this.options.hpPositionGroupId
    }).then(data => {
      data.data.leftTime = data.data.leftTime <= 0 ? 0 : (new Date().getTime() + data.data.leftTime * 1000)
      

      let userList = data.data.userList
      if (userList && userList.length<3){
        let i = userList.length;
        for (; i < 3;i++){
          userList[i] = { headerPic: '../../images/avatar/1.png' }
        }
      }
      
      console.log(data)
      
      this.setData({
        data:data.data
      })
      console.log(this.data.leftTime)
    })
  },
// 拼团倒计时结束
  myLinsterner(e){
    console.log("拼团已结束")
  },
// 一键参团
  joinGroup(e){
    groupApply(this.options.hpPositionGroupId).then(data=>{
      this.fetchData()
    })
  }

  // TODO 拼团分享、分享图片
  
})