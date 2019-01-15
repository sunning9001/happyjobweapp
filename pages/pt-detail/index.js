import { getGroupDetail } from '../../services/index.js'
import { imgServerUrl } from '../../config/config.js'

Page({

  data: {
    imgServerUrl: imgServerUrl,
    data:'',
  },

  onLoad: function (options) {
    this.data.hpPositionGroupId = options.hpPositionGroupId
    this.fetchData()
  },
  onShareAppMessage: function () {
    return {
      title: '开心工作参团有奖',
      path: '/pages/pt-detail/index?shareToken=' + shareToken,
      imageUrl: ''
    }
  },
   //获取历史记录
  fetchData() {
    
    getGroupDetail({
      hpPositionGroupId: this.data.hpPositionGroupId
    }).then(data => {
      data.data.leftTime = data.data.leftTime <= 0 ? 0 : (new Date().getTime() + data.data.leftTime * 1000)

      let userList = data.data.userList
      if (userList && userList.length<3){
        let i = userList.length;
        for (; i < 3;i++){
          userList[i] = { headerPic: this.data.imgServerUrl+'/images/avatar/1.png' }
        }
      }
      this.setData({
        data:data.data
      })
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