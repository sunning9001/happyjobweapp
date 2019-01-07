var api = require('../api/api.js')
import { http } from '../utils/http.js'
var app = getApp()

//api地址
const url = api.url;

module.exports={

  //GET:商城小程序，根据微信CODE获取微信用户信息
  wxMallLogin(code) {
    return http({
      url: url.wxMallLogin,
      data: { code: code },
    })
  },

  //GET:用户微信信息存入
  wxLogin(params) {
    return http({
      url: url.wxLogin,
      data: params
    })
  },

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
        isPage: 0
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
  }
}
