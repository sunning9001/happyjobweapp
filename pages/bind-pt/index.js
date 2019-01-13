// pages/bind-pt/index.js
import { sendPhoneCode, usePhoneBound, resumeBase, groupApply } from '../../services/index.js'
import { showToast } from '../../utils/tips.js'
import { formatTime, argusToTimestamp } from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ["男", "女"],
    sex_index: 0,
    sid: app.globalData.sid,
    leftTime:0,
    iphone: "",
    yzm: '', 
    age:'',
    realName:'',
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
// 姓名输入
  bindNameChange(e){
    console.log(e)
    this.data.realName = e.detail.detail.value
  },
  // 年龄输入
  bindAgeChange(e) {
    this.data.age = e.detail.detail.value
  },
  // 性别输入
  bindSexChange(e) {
    console.log(e)
    this.data.sex_index = e.detail.value
  },
  // 手机号输入
  bindPhoneInput(e) {
    this.data.iphone = e.detail.detail.value
  },
  // 验证码号输入
  bindCodeInput(e) {
    this.data.yzm = e.detail.detail.value
  },
  // 计时器时间结束
  timeLinsterner(e) {
    this.setData({
      leftTime: 0
    })
  },
  // 验证码发送
  sendCode(e) {
    if (this.data.iphone.length != 11) {
      showToast('请输入11位手机号码！')
      return
    }
    sendPhoneCode({
      phoneNo: this.data.iphone
    }).then(data => {
      this.setData({
        leftTime: new Date().getTime() + 59 * 1000
      })
    })
  },

  // 信息提交
  handleClick(e){

    if (this.data.iphone.length != 11) {
      showToast('请输入11位手机号码！')
      return
    }
    if (!this.data.realName) {
      showToast('请输入姓名！')
      return
    }
    if (!this.data.age) {
      showToast('请输入年龄！')
      return
    }
    var ageTime = argusToTimestamp([this.data.age])/1000
    var gender = this.data.sex_index=0?1:2

    if(!this.data.sid){ // 不是用户先注册用户
      usePhoneBound({
        phoneNo:this.data.iphone,
        msgCode:this.data.yzm
      }).then(data=>{
        app.globalData.sid = data.data.sid
        app.globalData.shareToken = data.data.shareToken
        this.createUserResume(this.data.iphone, this.data.realName, ageTime, gender)
      }).catch(data=>{
        
        showToast(data.message)
      })
    }else{
      this.createUserResume(this.data.iphone, this.data.realName, ageTime, gender)
    }
  },
  // 简历创建
  createUserResume(phoneNo,realName,ageTime,gender){
    resumeBase({
      resBornTime: ageTime,
      resGender: gender,
      resName: realName ,
      resPhone: phoneNo,
    }).then(data=>{
      this.goGroupApply(this.options.hpPositionGroupId)
    }).catch(err=>{
      if(err.data.errorCode == 2){
        this.goGroupApply()
      }
    })
  },
  // 参与拼团
  goGroupApply(){
    groupApply(this.options.hpPositionGroupId).then(data=>{
      console.log('拼团参与成功')
      wx.navigateTo({
        url: '../pt-detail/index?hpPositionGroupId=' + this.options.hpPositionGroupId,
      })
    })
  },
})