const url ={
  /** +++++++++++++++++++++++++++  登录 ++++++++++++++++++++++++++++++++++++++ */
  wxMallLogin: '/wxAppletsLogin/wxMallLogin', // get 商城小程序，根据微信CODE获取微信用户信息
  wxLogin: "/wxAppletsLogin/wxLogin", // get 用户微信信息存入
  /** +++++++++++++++++++++++++++  首页 ++++++++++++++++++++++++++++++++++++++ */
  banner: "/frontIndex/banner",// get 首页轮播图列表获取
  position: "/frontIndex/position",//get 首页岗位列表分页获取
  positionDetail: "/frontIndex/positionDetail",//get 岗位：招聘岗位详情页
  group: "/frontIndex/group",//get 岗位拼团详情
  searchHistory: "/frontIndex/searchHistory",//get 岗位搜索记录查询
  groupList: "/frontIndex/groupList",//get 岗位拼团：拼团岗位详情页面获取正在进行的拼团列表
  eduList: "/frontIndex/eduList",//get 获取教育水平选项
  salaryList: "/frontIndex/salaryList",//get salaryList

  positionList: "/frontUser/positionList",//post 我的岗位申请列表,
  positionApply: "/frontUser/positionApply",//post 岗位申请：用户申请职位或者发起拼团
  groupApply: "/frontUser/groupApply",//post岗位申请：用户申请参与职位拼团
  centerInfo: "/frontUser/centerInfo",//get 我的页面进入后获取个人信息
  approve: "/frontUser/approve",//post 用户认证信息提交,图片先上传获取连接
  resume: "/frontUser/resume",//get 用户简历：用户简历详情信息
  resumeBase: "/frontUser/resumeBase",//post 用户简历基本信息添加、修改：第一次创建简历、简历基本信息编辑，hpUserResumeId存在编辑、否新增
  resumeIntent: "/frontUser/resumeIntent",//post 用户简历：用户求职意向编辑、新增
  resumeExp: "/frontUser/resumeExp",//post 用户简历：用户工作经验编辑、新增
  resumeEdu: "/frontUser/resumeEdu",//post 用户简历：用户教育背景编辑、新增
  imgUpOne:"/wxAppletsLogin/imgUpOne",//post 上传图片
}

module.exports = {
  url
}