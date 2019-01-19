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
    clearTimer:false
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type || 0
    })
    this.data.hpPositionId = options.hpPositionId
  },
  onShow: function () {
    this.fetchData()
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
        fiveMoney, //五人团及以上奖励金额 
        comApplyNum, //用户正在进行的非拼团申请数
        groupApplyNum, //用户正在进行的拼团申请数
        carDesc,//班车信息
        hpPositionGroupId,//拼团id
        endTime,//岗位结束时间
        groupLeftTime //拼团结束时间
      } = data.data
      let datas = data.data
      let isOpen = Date.parse(new Date()) / 1000 < endTime
      
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
        groupApplyNum,
        hpPositionGroupId,
        isOpen
      })

      //存储厂车路线
      wx.setStorage({
        key: 'carDesc',
        data: carDesc 
      })
      if (posDetail){
        WxParse.wxParse('base', 'html', posDetail, this);
      }
      if (otherWelfare){
        WxParse.wxParse('otherWelfare', 'html', otherWelfare, this);
      }
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
        url: '../pt-detail/index?hpPositionGroupId=' + this.data.hpPositionGroupId,
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
  //TODO:倒计时回调
  myLinsterner() {
    this.fetchPtList()
  },
})