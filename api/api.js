const url ={
  /** +++++++++++++++++++++++++++  登录 ++++++++++++++++++++++++++++++++++++++ */
  wxMallLogin: '/wxAppletsLogin/wxMallLogin', // get 商城小程序，根据微信CODE获取微信用户信息
  wxLogin: "/wxAppletsLogin/wxLogin", // get 用户微信信息存入
  /** +++++++++++++++++++++++++++  首页 ++++++++++++++++++++++++++++++++++++++ */
  banner: "/frontIndex/banner",// get 首页轮播图列表获取
  position: "/frontIndex/position",//get 首页岗位列表分页获取
  positionDetail: "/frontIndex/positionDetail",//get 岗位：招聘岗位详情页
  positionList: "/frontUser/positionList",//post 我的岗位申请列表,
  positionApply: "/frontUser/positionApply",//post 岗位申请：用户申请职位或者发起拼团
  groupApply: "/frontUser/groupApply",//post岗位申请：用户申请参与职位拼团
  centerInfo: "/frontUser/centerInfo",//get 我的页面进入后获取个人信息
  searchHistory: "/frontIndex/searchHistory",//get 岗位搜索记录查询
}

module.exports = {
  url
}