import { getPositionDetail, positionApply, groupApply, groupList } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'
const WxParse = require('../../plugins/wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
    imgServerUrl: imgServerUrl,
    hpPositionId:0,
    type:0,//0：正常 1：拼团
    isShowList:false,
    clearTimer:false
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type || 0
    })
    this.data.hpPositionId = options.hpPositionId
    this.fetchData()
  },
  onShow: function () {

  },

  onShareAppMessage: function () {

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
        fiveMoney, //五人团及以上奖励金额 
        comApplyNum, //用户正在进行的非拼团申请数
        groupApplyNum, //用户正在进行的拼团申请数
        carDesc,
      } = data.data
      let datas = data.data
      this.setData({
        posName,
        approveState,
        comName,
        reqAge, reqEducation, reqExp, reqGender, reqSkill, reqWorkYears, reqOther,
        posComDesc,
        comCustPhone,
        retManMoney,
        fiveMoney,
        comApplyNum,
        groupApplyNum
      })

      //存储厂车路线
      wx.setStorage({
        key: 'carDesc',
        data: carDesc 
      })
      
      WxParse.wxParse('base', 'html', posDetail, this);
      WxParse.wxParse('otherWelfare', 'html', otherWelfare, this);
    })
  },  
  //获取拼团列表
  fetchPtList(){
    groupList(this.data.hpPositionId).then(data=>{
      console.log(data)
      this.setData({
        isShowList:true,
        ptList: data.list.map(item => {
          item.leftTime = new Date().getTime() + item.leftTime  * 1000
          return item
        })
      })
    })
  },
  //TODO:申请开团
  //是否绑定过手机号 是否有简历，
  applyPt(){
    positionApply(this.data.hpPositionId).then(data=>{
      console.log(data)
    })
  },
  //TODO:参与拼团
  joinTuan() {
    groupApply(this.data.hpPositionGroupId).then(data => {
      console.log(data)
    })
  },
  //TODO:申请职位
  applyJob(){
    positionApply(this.data.hpPositionId).then(data => {
      console.log(data)
    })
  },
  //TODO:查看申请
  catJob(){
    console.log("查看申请")
  },
  //TODO:查看拼团
  catPt(){
    console.log("查看拼团")
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
})