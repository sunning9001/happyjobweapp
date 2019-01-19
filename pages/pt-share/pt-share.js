import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
import Poster from '../../components/wxa-plugin-canvas/poster/poster';
import { shareQrCodeB, getGroupDetail } from '../../services/index.js'
import { updataStorageData } from '../../utils/storage.js'
var app =getApp()

Page({
  data: {
    imgServerUrl:imgServerUrl,
    qrCode: '',
    hasAuth: '',
    wxAvatar: app.globalData.userInfo.avatarUrl,
    nickName: app.globalData.userInfo.nickName,
    posterConfig: {
      width: 700,
      height: 950,
      debug: false,
      blocks:[
        {
          x: 192,
          y: 600,
          height:33,
          baseLine: 'middle',
          paddingLeft: 15,
          paddingRight: 15,
          zIndex: 2,
          borderRadius:4,
          backgroundColor:'#fff',
          text:{
            text:[
              {
                text: '男女不限',
                fontSize: 16,
                color: '#0e79d0',
              },
            ],
            baseLine:'middle',
          }
          
        },
      ],
      texts: [
        // {
        //   x: 192,
        //   y: 600,
        //   baseLine: 'middle',
        //   zIndex:2,
        //   text: [
        //     {
        //       text: '男女不限',
        //       fontSize: 16,
        //       color: '#ffffff',
        //     },
        //     {
        //       text: '18-45周',
        //       fontSize: 16,
        //       color: '#ffffff',
        //       paddingLeft: 15,
        //       paddingRight: 15,
        //       marginLeft: 7,
        //     },
        //     {
        //       text: '初中以上',
        //       fontSize: 16,
        //       color: '#ffffff',
        //       paddingLeft: 15,
        //       paddingRight: 15,
        //       marginLeft: 7,
        //     },
        //     {
        //       text: '经验3年',
        //       fontSize: 16,
        //       color: '#ffffff',
        //       paddingLeft: 15,
        //       paddingRight: 15,
        //       marginLeft: 7,
        //     }
        //   ]
        // },
        {
          x: 90,
          y: 250,
          baseLine: 'middle',
          text: '推荐奖励',
          fontSize: 30,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 2,
        },
        {
          x: 472,
          y: 250,
          baseLine: 'middle',
          text: '诚信企业',
          fontSize: 30,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 2,
        },
        {
          x: 350,
          y: 390,
          baseLine: 'middle',
          text: '王明',
          textAlign:'center',
          width:700,
          fontSize: 64,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 2,
        },
        {
          x: 350,
          y: 487,
          baseLine: 'middle',
          text: '我在找好友一起上班',
          textAlign: 'center',
          fontSize: 37,
          color: '#ffffff',
          zIndex: 2,
        },
        {
          x: 192,
          y: 570,
          baseLine: 'middle',
          text: '无锡先导自动化设备股份有限公司',
          fontSize: 26,
          color: '#ffffff',
          zIndex: 2,
        },        
        {
          x: 70,
          y: 791,
          baseLine: 'middle',
          text: '立即扫码',
          fontSize: 30,
          color: '#ffffff',
          zIndex: 2,
        },
        {
          x: 500,
          y: 791,
          baseLine: 'middle',
          text: '开心工作',
          fontSize: 30,
          color: '#ffffff',
          zIndex: 2,
        },

      ],
      images: [
        {
          width: 700,
          height: 950,
          x: 0,
          y: 0,
          url: `${imgServerUrl}/images/pt/bg.png`,
          zIndex: 1,
        },
        {
          width: 222,
          height: 222,
          x: 230,
          y: 102,
          url: `${imgServerUrl}/images/avatar/woman.png`,
          borderRadius:111,
          zIndex: 1,
        },
        {
          width: 90,
          height: 90,
          x: 70,
          y: 562,
          url: `${imgServerUrl}/images/avatar/man.png`,
          zIndex: 1,
        },
        {
          width: 196,
          height: 196,
          x: 245,
          y: 712,
          url: `${imgServerUrl}/images/temp/men.png`,
          zIndex: 1,
        },
      ],
    }
  },
  onLoad: function (options) {
    this.setData({
      hpPositionGroupId:options.hpPositionGroupId
    })
    this.fetchData()
    this.getCode()
  },
  //获取历史记录
  fetchData() {
    getGroupDetail({
      hpPositionGroupId: this.data.hpPositionGroupId || 4
    }).then(data => {
      console.log(data)
      this.setData({
        data: data.data
      })
    })
  },
  onPosterSuccess(e) {
    console.log(e)
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
  })
    // app.hasAuth('scope.writePhotosAlbum').then(() => {
    //   wx.saveImageToPhotosAlbum({
    //     filePath: detail,
    //     success(res) {
    //       console.log(res)
    //       showToast('已保存到相册,快去分享吧！')
    //     }
    //   })
    // }).catch(() => {
    //   showToast('请授权保存到相册')
    //   this.setData({
    //     hasAuth: false
    //   })
    //   wx.openSetting({
    //     success(res) {
    //       console.log(res.authSetting)
    //     }
    //   })
    // })
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 异步生成海报
   */
  onCreatePoster() {
    // this.data.posterConfig.images[this.data.posterConfig.images.length - 1].url = `/images/recommend/qrcode.jpg`
    // this.setData({
    //   posterConfig: this.data.posterConfig
    // }, () => {
    //   Poster.create();
    // });
    Poster.create();
  },
  getCode(){
    let targetUrl = 'pages/pt-detail/index?hpPositionGroupId='+this.data.hpPositionGroupId+'&shareToken=' + updataStorageData('shareToken')
    shareQrCodeB(targetUrl).then(data=>{
      this.setData({
        qrCode:data.data.imgUrl
      })
    })
  }
})