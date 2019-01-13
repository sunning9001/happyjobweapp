import { getGroupDetail } from '../../services/index.js'

Page({

  data: {
    data:'',
  },

  onLoad: function (options) {
    this.fetchData()
  },
  onShareAppMessage: function () {

  },
   //获取历史记录
  fetchData() {
    
    getGroupDetail({
      hpPositionGroupId: this.options.hpPositionGroupId
    }).then(data => {
      data.data.leftTime = data.data.leftTime <= 0 ? 0 : (new Date().getTime() + data.data.leftTime * 1000)
      

      let userList = data.data.userList
      if (userList && userList.length<3){
        let i = userList.length;
        for (; i < 3;i++){
          userList[i] = { headerPic: '../../images/avatar/1.png' }
        }
      }
      
      console.log(data)
      
      this.setData({
        data:data.data
      })
      console.log(this.data.leftTime)
    })
  },
// 拼团倒计时结束
  myLinsterner(e){
    console.log("拼团已结束")
  },
// 一键参团
  joinGroup(e){
    groupApply(this.options.hpPositionGroupId).then(data=>{
      this.fetchData()
    })
  }

  // TODO 拼团分享、分享图片
  
})