'use strict';

/** +++++++++++++++++++++++++++  登录 ++++++++++++++++++++++++++++++++++++++ */
// get 商城小程序，根据微信CODE获取微信用户信息
var wxMallLogin = '/wxAppletsLogin/wxMallLogin'
// get 用户微信信息存入
var wxLogin = "/wxAppletsLogin/wxLogin"

/** +++++++++++++++++++++++++++  首页 ++++++++++++++++++++++++++++++++++++++ */
// get 首页轮播图列表获取
const banner = "/frontIndex/banner"
//get 首页岗位列表分页获取
const position = "/frontIndex/position"

module.exports = {
  banner,
  position
}