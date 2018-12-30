import { cities } from './city';
Page({
    data : {
        cities : [],
        scrollTop:0,
        areaH:0,
        isScroll:false,
    },
    onChange(event){
        console.log(event.detail,'click right menu callback data')
    },
    onReady(){
        let storeCity = new Array(26);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })
        cities.forEach((item)=>{
            let firstName = item.pinyin.substring(0,1);
            let index = words.indexOf( firstName );
            storeCity[index].list.push({
                name : item.name,
                key : firstName
            });
        })
        this.data.cities = storeCity;
        this.setData({
            cities : this.data.cities
        })

        const query = wx.createSelectorQuery()        
        query.select('.action-panel').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res)=>{
          console.log(res)
          res[0].scrollTop
          console.log(res[0].height)
          this.setData({
            areaH: res[0].height+10
            })
        })
    },
    onPageScroll: function (e) {
      console.log(e);//{scrollTop:99}
      this.setData({
        scrollTop:e.scrollTop
      })
    },
    move(e){
      console.log(e)
    },
    touchStart(e){
      console.log(e)
    },
  touchEnd(e){
    console.log(e)
  }
});