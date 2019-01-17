require("./utils/string.js")
import { quickLogin, checkSession, getUserInfo } from './services/wx.js'
import { updataStorageData } from './utils/storage.js'
App({
  onLaunch: function(options) {
    // let sceneArr = [1007, 1008, 1044, 1011, 1012, 1013, 1047, 1048, 1049]
    let storeToken = options.query.storeToken || null
    checkSession()
    .then(data=>{
      if (updataStorageData('userToken')){
        console.log('checkSession success')
      }else{
        throw Error
      }
    })
    .catch(()=>{
      console.log('checkSession fail, start login...')
      quickLogin(storeToken)
      .then(data=>{
        console.log('一键登录成功')
        getUserInfo().then(data=>{
          console.log('获取用户信息成功')
        })
      })
      .catch(data => {
        console.log(`一键登录失败`,data)
      })
    })    
  },
  onShow(options) {
    console.log(options)

    //群聊信息
    if (options.shareTicket) {
      this.getShareInfo(options.shareTicket)
    }
  },
  globalData: {
    // userInfo: {
    //   avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTITVdksdCsusTicicnhWDib0tjjgW5ASIbpY3xeanBicibz3XLZOPC8CFibWkRyHBzMSz22icQ8Qcrqt6X0g/132",
    //   city: "无锡",
    //   country: "中国",
    //   gender: 1,
    //   language: "zh_CN",
    //   nickName: "我的小窝",
    //   province: "江苏",
    // },
    // oid: '773d8ad1ad9540fc804389a973a54d',
    // sid: '15e5d36a68034a1d8793e5fb76e3ac76',
    userInfo: {},
    oid: '',
    sid: '',
    sessionKey:'',
    city: updataStorageData('city') ||''
  },
  //页面分享
  onShareAppMessage: function() {
    wx.showShareMenu({
      withShareTicket: true,
      success: (res) => { // 成功后要做的事情
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  //获取群聊分享信息
  getShareInfo(shareTicket) {
    wx.getShareInfo({
      shareTicket: shareTicket,
      success: (res) => {
        //需后台解析数据 encryptedData iv
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {}
    })
  },
})