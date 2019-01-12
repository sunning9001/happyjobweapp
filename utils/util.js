const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//将年月日数组转成时间戳
const argusToTimestamp = arr => {
  if (arr.length < 3) {
    var i = 3 - arr.length
    for (var i = 0; i < 3 - arr.length; i++) {
      arr.push("01")
    }
  }
  return Date.parse(new Date(arr.join("/")))
}

module.exports = {
  formatTime: formatTime,
  formatNumber,
  argusToTimestamp
}
