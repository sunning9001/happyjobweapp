function showToast(msg,type){
  wx.showToast({
    title: msg,
    icon:type||'none'
  })
}

module.exports={
  showToast
}