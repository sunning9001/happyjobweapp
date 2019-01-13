
import { sendPhoneCode, getPayrollId } from '../../services/index.js'
import { showToast } from '../../utils/tips.js'
// pages/check-iphone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iphone:"",
    yzm:'',  
    leftTime:0,
    // timeFormat: ['秒'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  //下一步提交
  next(e){
    // let idNum = '410325200103299938';
    // let realName = '党俊良';
    // wx.navigateTo({
    //   url: '../wages/index?idNum=' + idNum + "&realName=" + realName,
    // })
    if (this.data.iphone.length != 11) {
      showToast('请输入11位手机号码！')
      return
    }
    if (this.data.yzm.length != 4) {
      showToast('请输入4位手机号码！')
      return
    }
    getPayrollId({
      phoneNo:this.data.iphone,
      phoneCode:this.data.yzm
    }).then(data=>{
      
      wx.navigateTo({
        url: '../wages/index?idNum='+data.data.idNum+"&realName="+data.data.realName,
      })
    })
    
  },
  // 手机号输入
  bindPhoneInput(e){
    this.data.iphone = e.detail.detail.value
  },
  // 验证码号输入
  bindCodeInput(e) {
    this.data.yzm = e.detail.detail.value
  },
  timeLinsterner(e){
    this.setData({
      leftTime: 0
    })
  },
// 验证码发送
  sendCode(e){
    if(this.data.iphone.length != 11){
      showToast('请输入11位手机号码！')
      return
    }
    sendPhoneCode({
      phoneNo:this.data.iphone
    }).then(data =>{
      this.setData({
        leftTime: new Date().getTime() + 59 * 1000
      })
    })
  },


    // TODO 请仔细阅读说明
})