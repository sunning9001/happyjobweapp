import { imgServerUrl } from '../../config/config.js'
import { showToast } from '../../utils/tips.js'
import Poster from '../../components/wxa-plugin-canvas/poster/poster';
import { shareQrCodeB } from '../../services/index.js'
import { updataStorageData } from '../../utils/storage.js'
var app =getApp()

Page({
  data: {
    imgServerUrl:imgServerUrl,
    qrCode: '',
    hasAuth: '',
    posterConfig: {
      width: 750,
      height: 1200,
      backgroundColor: '#1d449a',
      debug: false,
      blocks: [
        {
          x: 0,
          y: 330,
          width: 750,
          height: 8,
          backgroundColor: '#3f6dd3',
          zIndex: 2,
        },        
      ],
      texts: [
        {
          x: 115,
          y: 262,
          baseLine: 'middle',
          text: '推荐奖励',
          fontSize: 30,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 1,
        },
        {
          x: 497,
          y: 262,
          baseLine: 'middle',
          text: '诚信企业',
          fontSize: 30,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 1,
        },
        {
          x: 306,
          y: 262,
          baseLine: 'middle',
          text: '王明',
          fontSize: 33,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 1,
        },
        {
          x: 115,
          y: 262,
          baseLine: 'middle',
          text: '我在找好友一起上班',
          fontSize: 33,
          color: '#ffffff',
          lineHeight: 30,
          zIndex: 1,
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
          url: ``,
          zIndex: 1,
        },
        {
          width: 90,
          height: 90,
          x: 70,
          y: 562,
          url: ``,
          zIndex: 1,
        },
        {
          width: 196,
          height: 196,
          x: 245,
          y: 712,
          url: ``,
          zIndex: 1,
        },

      ],
    }
  },
  onLoad: function (options) {

  },
  onPosterSuccess(e) {
    console.log(e)
    const { detail } = e;
    app.hasAuth('scope.writePhotosAlbum').then(() => {
      wx.saveImageToPhotosAlbum({
        filePath: detail,
        success(res) {
          console.log(res)
          showToast('已保存到相册,快去分享吧！')
        }
      })
    }).catch(() => {
      showToast('请授权保存到相册')
      this.setData({
        hasAuth: false
      })
      wx.openSetting({
        success(res) {
          console.log(res.authSetting)
        }
      })
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 异步生成海报
   */
  onCreatePoster() {
    this.data.posterConfig.images[this.data.posterConfig.images.length - 1].url = `/images/recommend/qrcode.jpg`
    this.setData({
      posterConfig: this.data.posterConfig
    }, () => {
      Poster.create();
    });
  },
  create(){
    // wx.openSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   }
    // })
  }
})