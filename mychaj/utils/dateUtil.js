/**
 * 日期工具类
 */

/**
 * 清空时分秒
 */
function setDayStart(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

/**
 * im 消息格式转换
 */
function imTimeFormater (timestamp, detail) {
  var _timestamp = timestamp
  var _timeStampString = '' + _timestamp
  if (_timeStampString.length == 13) {
    _timestamp = _timestamp / 1000
  }
  else if (_timeStampString.length == 7) { // 补救、时间精度有损失 需要查找损失的位置 
    _timestamp = _timestamp * 1000
  }
  var format = '';
  var currDate = new Date();
  currDate = setDayStart(currDate);
  var currStamp = currDate.getTime();
  var formatDate = new Date(timestamp);
  // console.log(' ==================== ' + formatDate + ' @@@@@@@@@@@@@@@@@ ' + timestamp)
  if (formatDate.getFullYear() == currDate.getFullYear() && formatDate.getMonth() == currDate.getMonth() && formatDate.getDay() == currDate.getDay()) {
    // 今天 返回格式 17:09
    format = formatDate.getHours() + ":" + (formatDate.getMinutes() < 10 ? '0' + formatDate.getMinutes() : formatDate.getMinutes());
  }
  else if (formatDate.getFullYear() == currDate.getFullYear() && formatDate.getMonth() == currDate.getMonth() && formatDate.getDay() + 1 == currDate.getDay()) {
    format = "昨天" + formatDate.getHours() + ":" + (formatDate.getMinutes() < 10 ? '0' + formatDate.getMinutes() : formatDate.getMinutes());
  }
  else {
    if (formatDate.getFullYear() > currDate.getFullYear()) {
      format = formatDate.getFullYear() + '-'
    }
    // console.log(' ==================== ' + timestamp + ' -- ' + detail)
    
    var month = formatDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = formatDate.getDate()
    if (date < 10) {
      date = '0' + date;
    }
    format += (month + "-" + date + ' ' + formatDate.getHours() + ":" + (formatDate.getMinutes() < 10 ? '0' + formatDate.getMinutes() : formatDate.getMinutes()));
  }
  return format;
}

function tidy(timeStr) {
  var _timeStr = timeStr.replace(/-/g, "/");
  _timeStr = timeStr.replace(/\./g, "/");
  return _timeStr
}

/**
 * 添加 months 个月
 * timestamp: 
 * months:
 */
function addMonth(timestamp, months) {
  var _date = new Date(timestamp)
  var y = _date.getFullYear()
  var m = _date.getMonth()
  var d = _date.getDate()

  y += Math.floor((m + months) / 12); //计算年
  m = Math.floor((m + months) % 12) + 1; //计算月
  var d_max = new Date(y + "/" + (m + 1) + "/0").getDate();  //获取计算后的月的最大天数
  if (d > d_max) {
    d = d_max;
  }

  _date.setFullYear(y)
  _date.setMonth(m - 1)
  _date.setDate(d)
  return _date
}


module.exports = {
  imTimeFormater: imTimeFormater,
  setDayStart: setDayStart,
  tidy: tidy,
  addMonth: addMonth
}
