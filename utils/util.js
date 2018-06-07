var MD5 = require('./md5.js')

function alert(msg, callbak) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    confirmText: '好的',
    success: function (res) {
      if (callbak) {
        callbak()
      }
    }
  })
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

function loading(msg) {
  var title = msg ? msg : '加载中'
  wx.showLoading({
    title: title,
  })
}

//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

//时间戳变为月-日，时间
function time(stamp) {
  var format;
  var currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  var currStamp = currDate.getTime();
  var formatDate = new Date();
  formatDate.setTime(stamp);
  if (stamp > currStamp) {
    var getMinutes = formatDate.getMinutes()
    if (getMinutes < 10) {
      getMinutes = '0' + getMinutes;
    }
    format = formatDate.getHours() + ":" + getMinutes;
  } else {
    var month = formatDate.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = formatDate.getDate()
    if (date < 10) {
      date = '0' + date;
    }
    format = month + "-" + date;
  }
  return format;
}

//时间戳变为年月日
function getLocalTime(stamp, type) {
  var format;
  var formatDate = new Date();
  formatDate.setTime(stamp);
  var month = formatDate.getMonth() + 1;
  var date = formatDate.getDate();
  if (type) {
    if (type == 1) {//形式2018.3.21
      if (month < 10) {
        month = '0' + month;
      }
      if (date < 10) {
        date = '0' + date;
      }
      format = formatDate.getFullYear() + "." + month + "." + date;
    } else if (type == 2) {//形式3月21日
      format = month + "月" + date + "日";
    }
  } else {//形式2018年3月21日
    format = formatDate.getFullYear() + "年" + month + "月" + date + "日";
  }

  return format;
}
function checkMobile(sMobile) {
  if (!(/^1[0-9][0-9]\d{8}$/.test(sMobile))) {
    return false;
  }

  return true;
}

/**
 * 随机字符串
 */
function randomFileName(str) {
  var timestamp = Date.parse(new Date());
  var len = 10;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return MD5.hexMD5(str + pwd);
}

function checkLogin(callbak) {
  if (null == getApp().globalData.user) {
    wx.navigateTo({
      url: '/pages/main/login/index',
      fail: function () {
        getApp().globalData.isClicked = false
      }
    })
  }
  else if (callbak) {
    callbak()
  }
}

function checkAuth(app, callbak) {
  if (null == app.globalData.wxUser) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '警告',
            content: '您已经拒绝微信授权，请勾选开启用户信息，以进行其他操作。',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    // console.log('openSetting', res)
                    if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                      wx.getUserInfo({
                        success: function (res) {
                          app.setWxUserInfo(res.userInfo)
                          // console.log('拉取用户信息', res)
                          if (callbak) {
                            callbak()
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
        else {
          if (callbak) {
            callbak()
          }
        }
      }
    })
  }
  else {
    if (callbak) {
      callbak()
    }
  }
}

function getLocation(app, callbak) {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      app.globalData.lon = res.longitude;
      app.globalData.lat = res.latitude;
      app.globalData.locationAuth = true
      if (callbak) {
        callbak();
      }
    }, fail: function () {
      app.globalData.locationAuth = true
      app.globalData.lon = '';
      app.globalData.lat = '';

      if (callbak) {
        callbak();
      }
    }
  })
}

// var numberArray = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
var numberArray = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九']
function numberFormater(index) {
  return numberArray[index]
}
// 转换时分 的时间
function formatMinute(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}  
function formatStartTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var date = year + '-' + month + '-' + day

  return date
}
function formatEndTime(date) {
  var year = date.getFullYear()+2
  var month = date.getMonth() + 1
  var day = date.getDate()
  var date = year + '-' + month + '-' + day

  return date
}

function generateContent(ageLabel, gender) {
  var ageStr = ''
  var genderStr = ''
  if (ageLabel == 1) {
    ageStr = '80前'
    if (gender == 1) {
      genderStr = "叔叔"
    } else if (gender == 2) {
      genderStr = "阿姨";
    }
  } else if (ageLabel == 2) {
    ageStr = '80后'
    if (gender == 1) {
      genderStr = "小叔叔"
    } else if (gender == 2) {
      genderStr = "大姐姐"
    }
  } else if (ageLabel == 3) {
    ageStr = '85后'
    if (gender == 1) {
      genderStr = "大哥哥"
    } else if (gender == 2) {
      genderStr = "小姐姐"
    }
  } else if (ageLabel == 4) {
    ageStr = '90后'
    if (gender == 1) {
      genderStr = "小哥哥"
    } else if (gender == 2) {
      genderStr = "小姑娘"
    }
  } else if (ageLabel == 5) {
    ageStr = '95后'
    if (gender == 1) {
      genderStr = "小弟弟"
    } else if (gender == 2) {
      genderStr = "小妹妹"
    }
  }

  return ageStr + genderStr
}

//随机简介
var profileArray = ['等你发现时间是贼了，它早已偷光你的选择。',
  '便宜的不一定真便宜，不要为了省钱买16G的手机。',
  '努力是有惯性的，堕落和颓废亦是如此。',
  '不要把梦遗落在床上，不要画个月亮挂在天空。',
  '要努力，但是不要着急，凡事都应该有过程。',
  '人的本能是追逐从他身边飞走的东西，却逃避追逐他的东西。',
  '生命该是人类俯瞰万象的顶峰，而不是人赖以藏身的隧洞。',
  '你不可能要求一个没有风暴的海洋。那不是海，是泥潭。',
  '被安静吵醒。',
  '远在远方的风比远方更远。',
  '我不是归人，我只是个过客。',
  '就像水消失在水中。',
  '城市里应该有匹马。',
  '学会思考，学会倾听，学会辨别。',
  '控制自己的欲望。',
  '让自己做一个有趣的人。',
  '瓦上四季，檐下人生。岁月斑驳，安之若素。',
  '躲得过对酒当歌的夜，躲不过四下无人的街。',
  '光而不耀，静水流深。',
  '故事还长，你别失望。',
  '和世界交手的这许多年，你是否光彩依旧，兴趣盎然。',
  '故事不见得非得有个结尾。',
  '永远年轻，永远热泪盈眶。',
  '你不用很厉害的开始，但你要开始变得很厉害。',
  '与众不同却又令人心悦诚服。',
  '你要搞清楚你人生的剧本——不是你父母的续集，不是你子女的前传，更不是你朋友的外篇。对待生命不妨大胆冒险一下，因为最终你要失去它。生命中最难的阶段不是没有人懂你，而是你不懂你自己。',
  '不辜负自己，不委屈别人。',
  '不要因为别人有什么就忘了你自己有什么了，同时不要忘了自己要什么。',
  '因为害怕自己并非明珠而不敢刻苦琢磨，又因为有几分相信自己是明珠而不能与瓦砾碌碌为伍，遂逐渐远离时间，疏避人群，结果在内心不断地用愤懑和羞怒饲育着自己懦弱的自尊心，世上每个人都是驯兽师，而那匹猛兽，就是每个人各自的性情。',
  '所谓学习：你突然间对一些对之了解贯穿过去整个人生的事物有了新的发现，并且以一种全新的方式。',
  '走过千帆，仍能方寸不乱。',
  '以前总觉得时间可以任意挥霍，如今竟然对它斤斤计较起来。',
  '君子慎其独也。',
  '后来，尽管生活艰难，但再也找不到醉酒的理由。',
  '我们是不可能不负创伤地走出人生的竞技场的。',
  '桃李春风一杯酒，江湖夜雨十年灯。',
  '船在海上，马在山中。',
  '要么不做，要么就做好，把力所能及的事情做到极致。',
  '能力是看最后能让大家做成多大的事情，而不是看你会什么，那叫技能。',
  '把答应自己的事一一做到才叫酷。',
  '明朗坦荡钟情豁达。',
  '不是所有的鱼都会生活在同一片海里。',
  '知世故，而不世故。',
  '人生最棒的感觉，就是你做到别人说你做不到的事。',
  '实打实的娴熟，总要胜过很浮夸的捷径。',
  '早日完成里程碑，才能从容不迫。'
];
function randomProfile() {
  var i = Math.floor(Math.random() * profileArray.length)
  return profileArray[i]
}
//util.js 
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽 
  var originalHeight = e.detail.height;//图片原始高 
  var originalScale = originalHeight / originalWidth;//图片高宽比 
  // console.log('originalWidth: ' + originalWidth)
  // console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高 
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比 
      // console.log('windowWidth: ' + windowWidth)
      // console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
        //图片缩放后的宽为屏幕宽 
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比 
        //图片缩放后的高为屏幕高 
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  // console.log('缩放后的宽: ' + imageSize.imageWidth)
  // console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}
module.exports = {
  imageUtil: imageUtil,
  alert: alert,
  loading: loading,
  showToast: showToast,
  formatTime: formatTime,
  checkMobile: checkMobile,
  randomFileName: randomFileName,
  checkAuth: checkAuth,
  getLocation: getLocation,
  time: time,
  getLocalTime: getLocalTime,
  checkLogin: checkLogin,
  numberFormater: numberFormater,
  generateContent: generateContent,
  randomProfile: randomProfile,
  formatStartTime: formatStartTime,
  formatEndTime: formatEndTime ,
  formatMinute: formatMinute
}
