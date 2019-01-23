import { getPositionDetail, positionApply, groupApply, groupList } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
const WxParse = require('../../plugins/wxParse/wxParse.js');
import { showToast } from '../../utils/tips.js'

const app = getApp();

Page({
  data: {
    imgServerUrl: imgServerUrl,
    hpPositionId:0,
    type:0,//0：正常 1：拼团
    isShowList:false,
    clearTimer:false,
    comScale:'',
    comType:'',
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type || 0
    })
    this.data.hpPositionId = options.hpPositionId
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      console.log('有info===', app.globalData)
      this.fetchData()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback===', app.globalData)
        this.fetchData()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log('兼容处理===', app.globalData)
          this.fetchData()
        }
      })
    }
  },

  onShareAppMessage: function () {
    console.log(options)
    var shareToken = wx.getStorageSync('shareToken')
    return {
      title: '开心工作入职有奖',
      path: '/pages/detail/index?shareToken=' + shareToken,
      imageUrl: ''
    }
  },
  //获取岗位详情
  fetchData(){
    getPositionDetail(this.data.hpPositionId).then(data=>{
      console.log(data)
      let { 
        posName, //职位名称
        approveState,//是否认证
        comName, //公司名
        reqAge, //年龄要求 
        reqEducation,//学历要求
        reqExp, // 工作经验要求
        reqGender, //性别要求
        reqSkill, //专业技能要求 ,
        reqWorkYears, //工作年限要求
        reqOther, // 其他要求
        posComDesc, //公司介绍
        comCustPhone, //公司客服电话
        posDetail, //基本信息 
        otherWelfare, // 其他福利
        retManMoney, //入职返现金额男
        urgentMoney ,//高薪急聘金额
        fiveMoney, //五人团及以上奖励金额 
        comApplyNum, //用户正在进行的非拼团申请数
        groupApplyNum, //用户正在进行的拼团申请数
        carDesc,//班车信息
        hpPositionGroupId,//拼团id
        endTime,//岗位结束时间
        cityName,
        countyName,
      } = data.data

      let isOpen = Date.parse(new Date()) / 1000 < endTime
      
      this.setData({
        posName,
        approveState,
        comName,
        reqAge, reqEducation, reqExp, reqGender, reqSkill, reqWorkYears, reqOther,
        comCustPhone,
        retManMoney,
        urgentMoney,
        fiveMoney,
        comApplyNum,
        groupApplyNum,
        hpPositionGroupId,
        isOpen,
        cityName,
        countyName,
      })
      this.setData({
        comScale: this.getComScale(data.data.scaleLower, data.data.scaleHigh),
        comType: data.data.typeName
      })


      //存储厂车路线
      wx.setStorage({
        key: 'carDesc',
        data: carDesc, 
      })
      if (posDetail){
        WxParse.wxParse('base', 'html', posDetail, this);
      }
      if (otherWelfare){
        WxParse.wxParse('otherWelfare', 'html', otherWelfare, this);
      }
      if (posComDesc){
        WxParse.wxParse('posComDesc', 'html', posComDesc, this);
      }
      this.getNodePos()
    })
  },  
  //获取拼团列表
  fetchPtList(){
    if(!this.data.isOpen){
      showToast('拼团已结束')
      return false
    }
    groupList(this.data.hpPositionId).then(data=>{
      console.log(data)
      this.setData({
        isShowList:true,
        ptList: data.list.map(item => {
          item.leftTime = new Date().getTime() + item.leftTime  * 1000
          item.leaderName = decodeURIComponent(item.leaderName)
          return item
        })
      })
    })
  },
  //申请工作
  applyJob() {
    positionApply(this.data.hpPositionId).then(data => {
      showToast('申请职位成功', 'success')
      this.setData({
        comApplyNum:1
      })
    })
  },
  //申请开团
  applyPt(){
    positionApply(this.data.hpPositionId).then(data=>{
      var hpPositionGroupId = data.data.hpPositionGroupId
      wx.navigateTo({
        url: '../result/index?type=pt&status=1&hpPositionGroupId=' + hpPositionGroupId,
      })
    })
  },
  //参与拼团
  joinTuan(e) {
    let {groupid} = e.currentTarget.dataset
    groupApply(groupid).then(data => {
      wx.navigateTo({
        url: '../pt-detail/index?hpPositionGroupId=' + groupid,
      })
    })
  },
  //查看拼团
  catPt(){
    wx.navigateTo({
      url: '../pt-detail/index?hpPositionGroupId=' + this.data.hpPositionGroupId,
    })
  },
  //隐藏拼团列表模态框
  hideModal(){
    this.setData({
      isShowList:false
    })
  },
  //拨打手机号
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: this.data.comCustPhone,
      success:function(data){
        console.log(data)
      },
      fail:function(data){
        console.log(data)
      }
    })
  },
  //查看线路
  toRoadsLine(){
    wx.navigateTo({
      url: '../roadsLine/index',
    })
  },
  //倒计时回调
  myLinsterner() {
    this.fetchPtList()
  },
  // 获取公司规模描述
  getComScale(lower,high){

    if (!lower || lower ==0){
      return high+'人以下'
    }
    if (!high || high == 0) {
      return lower + '人以上'
    }
    return lower + '-' + high + '人'
  },
  //获取位置
  getNodePos(){
    var query = wx.createSelectorQuery()
    query.select('#base').boundingClientRect()
    query.select('#require').boundingClientRect()
    query.select('#otherWelfare').boundingClientRect()
    query.select('#jieshao').boundingClientRect()
    var that = this;
    query.exec(function (res) {
      console.log(res)
      that.setData({
        basePos:res[0].top-40,
        requirePos:res[1].top-40,
        otherWelfarePos:res[2].top-40,
        jieshaoPos:res[3].top-40
      })
    })
  },
  //距离页面滚动
  scrollTop(e){
    let top = e.currentTarget.dataset.top
    console.log(top)
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  }
})