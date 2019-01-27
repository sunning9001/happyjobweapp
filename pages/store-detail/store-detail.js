import { imgServerUrl } from '../../config/config.js'
import { getStoreDetail } from '../../services/index.js'
var $ = require('../../libs/gdconf.js');

Page({
  data: {
    imgServerUrl:imgServerUrl
  },
  onLoad: function (options) {
    this.fetchData()
  },
  onShareAppMessage: function () {

  },
  fetchData(){
    this.setData({
      hpCompanyStoreId: this.options.hpCompanyStoreId
    })
    getStoreDetail({
      hpCompanyStoreId: this.data.hpCompanyStoreId
    }).then(data=>{
      console.log(data)
      this.setData({
        data:data.data
      })
    })
  },
  tomap() {
    var that = this
    wx.showLoading({ title: 'loading', mask: true });
    //获得当前位置坐标
    $.map.getRegeo({
      success(data) {        
        var data = data[0], cityd = data.regeocodeData.addressComponent.province;
        that.setData({
          latitude:data.latitude,
          longitude:data.longitude,
          myaddress:data.name,
          cityd:cityd,
        })
        that.keyword(that.data.data.storeAddr)        
      },
      fail(data){
        wx.hideLoading();
        that.setData({
          authMask:true
        })
      }
    });  
  },
  hideAuth(){
    this.setData({
      authMask:false
    })
  },
  //搜索关键字
  keyword(keyword) {
    var that = this;
    $.map.getInputtips({
      keywords: keyword,
      location: that.data.longitude + "," + that.data.latitude,
      success(data) {
        wx.hideLoading();
        if (data && data.tips && data.tips.length!=0) {
          data.tips.shift();
          that.setData({
            comLocation:data.tips[0].location
          });
          let POIlongitude = that.data.comLocation.split(",")[0]
          let POIlatitude = that.data.comLocation.split(",")[1]
          let storeAddr = that.data.data.storeAddr
          let provinceIndex = storeAddr.indexOf("省")
          let province = storeAddr.substring(0,provinceIndex+1)
          let obj = {
            POIlocation: that.data.comLocation,
            POIlongitude: POIlongitude,
            POIlatitude: POIlatitude,
            address: '',
            city: province,
            cityd: that.data.cityd,
            fromhistory: "0",
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            name: that.data.data.storeAddr,
            saddress: that.data.myaddress,
            sname: "我的位置",
          }
          let params = ''
          for (let key in obj) {
            params += key + "=" + obj[key] + "&"
          }
          wx.navigateTo({
            url: '../gdmap/index?' + params,
          })
        }else{
          wx.showToast({
            title:'没有检索到该地址',
            icon:'none',
          })
        }
      }
    });
  },
})