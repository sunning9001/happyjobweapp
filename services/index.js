var api = require('../api/api.js')
import { http } from '../utils/http.js'
var app = getApp()

//api地址
const url = api.url;

module.exports={

  //GET:首页轮播图列表获取
  getBanner(){
    return http({
      url: url.banner,
      data: {
        useOn:1,
        delOn:0,
        state:1,
        isPage:0
      }
    })
  },

  //GET:首页岗位列表分页获取、拼团岗位列表
  getIndexList(params){
    return http({
      url: url.position,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: params
    })
  },

  //POST:用户中心：我的岗位申请列表
  getPositionList(params){
    return http({
      url: url.positionList,
      method:"POST",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: params
    })
  },

  //GET:我的页面进入后获取个人信息
  getCenterInfo(){
    return http({
      url: url.centerInfo,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      }
    })
  },

  //GET: 岗位搜索记录查询
  searchHistory(){
    return http({
      url: url.searchHistory,
      header: {
        oid: app.globalData.oid
      },
      data:{
        delOn: 0,
        isPage: 1,
        currentPage:1,
        showCount:10
      }
    })
  },

  //delete: 刪除搜索记录
  deleteHistory(id){
    return http({
      url: url.searchHistory,
      method:'DELETE',
      header: {
        oid: app.globalData.oid
      },
      data: {
        hpUserSearchId:id
      }
    })
  },

  //GET:岗位：招聘岗位详情页
  getPositionDetail(id){
    return http({
      url: url.positionDetail,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: {
        hpPositionId:id
      }
    })
  },

  //POST:岗位申请：用户申请职位或者发起拼团
  positionApply(id){
    return http({
      url: url.positionApply,
      method:'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: {
        hpPositionId: id
      }
    })
  },

  //get 岗位拼团详情
  group(id){
    return http({
      url: url.positionApply,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: {
        hpPositionGroupId: id
      }
    })
  },

  //get 岗位拼团：拼团岗位详情页面获取正在进行的拼团列表
  groupList(id){
    return http({
      url: url.groupList,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: {
        hpPositionId: id,
        isPage:0
      }
    })
  },

  //post 岗位申请：用户申请参与职位拼团
  groupApply(id){
    return http({
      url: url.groupApply,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: {
        hpPositionGroupId: id
      }
    })
  },

  //post 用户认证信息提交,图片先上传获取连接
  postApprove(params){
    return http({
      url: url.approve,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
      data: params
    })
  },

  //get 用户简历：用户简历详情信息
  getResume(){
    return http({
      url: url.resume,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      }
    })
  },

  //post 用户简历基本信息添加、修改：第一次创建简历、简历基本信息编辑，hpUserResumeId存在编辑、否新增
  resumeBase(params){
    return http({
      url: url.resumeBase,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        "Content-Type":"application/json"
      },
      data:JSON.stringify(params)
    })
  },
  
  //post 用户简历：用户求职意向编辑、新增
  resumeIntent(params){
    return http({
      url: url.resumeIntent,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        "Content-Type": "application/json"
      },
      data: JSON.stringify(params)
    })
  },

  //post 用户简历：用户工作经验编辑、新增
  resumeExp(params){
    return http({
      url: url.resumeExp,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        "Content-Type": "application/json"
      },
      data: JSON.stringify(params)
    })
  },

  //post 用户简历：用户教育背景编辑、新增
  resumeEdu(params){
    return http({
      url: url.resumeEdu,
      method: 'POST',
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        "Content-Type": "application/json"
      },
      data: JSON.stringify(params)
    })
  },

  //get: 获取教育水平选项
  eduList(){
    return http({
      url: url.eduList,
    })
  },

  //get:获取薪资水平选项列表
  getSalaryList(){
    return http({
      url: url.salaryList,
    })
  },

  //get:获取拼团详情信息
  getGroupDetail(params) {
    return http({
      url: url.group,
      data:params,
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
    })
  },
  // 发送手机短信验证码 
  sendPhoneCode(params){
    
    let data = http({
      url: url.phoneCode,
      data: params,
      method:"POST",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
    })
    
    return data;
  },
  //  薪资查询：根据手机号码，短信验证码获取身份信息
  getPayrollId(params) {
    return http({
      url: url.payrollId,
      data: params,
      method: "GET",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        sessionId: wx.getStorageSync('sessionid'),
      },
    })
  },
  //  薪资查询：获取工资条信息
  getPayroll(params) {
    return http({
      url: url.payroll,
      data: params,
      method: "GET",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
      },
    })
  },
  //  手机号：用户手机号码绑定、更换
  usePhoneBound(params) {
    return http({
      url: url.phoneBound,
      data: params,
      method: "POST",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        sessionId: wx.getStorageSync('sessionid'),
      },
    })
  },
  //  手机号：用户手机号码绑定、更换
  shareBound(params) {
    return http({
      url: url.shareBound,
      data: params,
      method: "POST",
      header: {
        oid: app.globalData.oid,
        sid: app.globalData.sid,
        shareToken: params.shareToken,
      },
    })
  },
}
