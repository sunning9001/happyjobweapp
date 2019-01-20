import { imgServerUrl } from '../../config/config.js'
import { getStoreDetail } from '../../services/index.js'
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
  }
})