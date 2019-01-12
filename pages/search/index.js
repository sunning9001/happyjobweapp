import { searchHistory, deleteHistory } from '../../services/index.js'
const app = getApp();

Page({
  data: {
    historyList:[]
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.fetchData()
  },

  //获取历史记录
  fetchData(){
    searchHistory().then(data=>{
      console.log(data)
      this.setData({
        historyList:data.list
      })
    })
  },

  //删除历史记录
  delHistory(e){
    
    deleteHistory(id).then(data=>{
      console.log(data)
    })
  }

})