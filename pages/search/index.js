import { searchHistory, deleteHistory, getIndexList } from '../../services/index.js'
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
    console.log(e)
    let id = e.currentTarget.dataset.id
    let title = "删除提示"
    let content= ""
    if (id == 'all'){
      id = null
      content: "是否清除全部记录"
    }else{
      content: "是否清除选中记录"
    }
    wx.showModal({
      title: title,
      content: content,
      success:(res)=>{
        if (res.confirm){
          deleteHistory(id).then(data => {
            console.log(data)
            this.fetchData()
          })

        }
      }
    })
  },

  // 搜索框输入值
  bindKeyInput(e){
    this.data.searchVal = e.detail.value;
  },

  // 点击搜索记录
  selectMsg(e){
    this.data.searchVal = e.currentTarget.value
    this.toSearchPage(e)
  },
  toSearchPage(e) {
    console.log(this.data.searchVal);
    // wx.navigateTo({
    //   url: '../roadsLine/index?searchVal'+=this.data.searchVal,
    // })
    getIndexList({
      'keyWord': this.data.searchVal
    }).then(data => {
      console.log(data)
      this.fetchData()
    })
  },
})