import { apiUrl } from '../config/config.js'
const api = require('../api/api.js')
const { imgUpOne } = api.url
var app = getApp()

module.exports={
  //图片上传
  uploadImg(options){
    return new Promise((resolve,reject)=>{
      wx.uploadFile({
        url: apiUrl + imgUpOne,
        filePath: options.filePath,
        name: 'file',
        header: {
          oid: app.globalData.oid
        },
        formData: {
          code: options.code
        },
        success: function (res) {
          console.log(res)
          let data = JSON.parse(res.data)
          //TODO:数据状态处理
          resolve(data)
        },
        fail: function (res) {
          console.log(res)
          reject(res)
        },
      })
    })    
  }
}

