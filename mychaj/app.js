//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserName: function(){
    return "合租派你好啊"
  },

  globalData: {
    userInfo: null,
    time:'2017/2/28'
  }
})


var UTIL = require('./utils/util.js')

var WEBIM = require('./utils/webim.js');
var WEBIMHANDLER = require('./utils/webim_handler.js');

var NETWORK = require('./utils/network.js');
var API = require('./utils/api.js');
// App({
//   onLaunch: function () {
//     var app = this
//     app.setLaunchTime()
//     this.globalData.filterParam = this.globalData.defaultFilterParam
//     this.globalData.filterParamQiuzu = this.globalData.defaultFilterParamQ

//     this.setHouseRecommendFlag(true)
//     this.setRequestRecommendFlag(true)
//     app.setWxUserInfo(null, '', '')
//   },

//   setLaunchTime() {
//     var time = new Date().getTime()
//     wx.setStorageSync('launchTime', time)
//     wx.setStorageSync('commentTime', time)
//   },

//   getLaunchTime() {
//     return wx.getStorageSync('launchTime')
//   },

//   setCommentTime(time) {
//     getApp().commentData.readTime = time
//     wx.setStorageSync('commentTime', time)
//   },

//   getCommentTime() {
//     var app = getApp()
//     if (app.commentData.readTime == -1) {
//       app.commentData.readTime = wx.getStorageSync('commentTime')
//     }

//     return app.commentData.readTime
//   },

//   setCollectTime(time) {
//     getApp().collectData.readTime = time
//     wx.setStorageSync('collectTime', time)
//   },

//   getCollectTime() {
//     var app = getApp()
//     if (app.collectData.readTime == -1) {
//       app.collectData.readTime = wx.getStorageSync('collectTime')
//     }

//     return app.collectData.readTime
//   },

//   onShow: function () {
//     var self = this

//     if (wx.getStorageSync('user')) {
//       this.globalData.user = wx.getStorageSync('user')
//     }

//     if (wx.getStorageSync('wxUser')) {
//       this.globalData.wxUser = wx.getStorageSync('wxUser')
//     }

//     if (self.globalData.user != null) {
//       self.commentData.firstLoaded = false
//       self.reloadMessage(self)
//       self.loadCollectMessage(self)
//     }

//     if (self.globalData.imConfig == null) {
//       NETWORK.POST({
//         url: API.config,
//         params: {},
//         success: function (res) {
//           if (res.data.ret == 200) {
//             self.globalData.imConfig = {
//               sdkAppID: parseInt(res.data.data.imSdkAppId), //用户所属应用id,必填
//               accountType: res.data.data.accountType, //用户所属应用帐号类型，必填
//             }
//             self.initIm()

//             self.globalData.config = res.data.data
//           }
//         },
//         app: self
//       })
//     }
//     if (self.globalData.bannerList == null) {//我的运营位轮播
//       NETWORK.POST({
//         url: API.bannerList,
//         params: {},
//         success: function (res) {
//           if (res.data.ret == 200) {
//             self.globalData.bannerList = res.data.data;
//           }
//         },
//         app: self
//       })
//     }

//     setTimeout(function () {
//       self.regiestCommentJob()
//     }, 100)

//     setTimeout(function () {
//       self.regiestCollectJob()
//     }, 100)

//     // 获取设备信息
//     var res = wx.getSystemInfoSync()
//     self.globalData.widowWidth = res.screenWidth
//     self.globalData.windowHeight = res.screenHeight
//     self.globalData.isX = res.model == 'iPhone X'
//     try {
//       this.globalData.houseRecommendFlag = wx.getStorageSync('houseRecommendFlag')
//     } catch (e) {
//       UTIL.alert('获取本地缓存失败！')
//     }
//     try {
//       this.globalData.requestRecommendFlag = wx.getStorageSync('requestRecommendFlag')
//     } catch (e) {
//       UTIL.alert('获取本地缓存失败！')
//     }

//     // console.log('小程序被打开', this.globalData.user)
//   },

//   regiestCommentJob: function () {
//     var self = this
//     if (null == self.globalData.commentInterval) {
//       self.globalData.commentInterval = setInterval(function () {
//         if (self.globalData.user != null) {
//           if (self.commentData.firstLoaded) {
//             if (!self.commentData.listpage) {
//               self.getNewMessage()
//             }
//           }
//         }
//       }, 10 * 1000)
//     }
//   },

//   regiestCollectJob: function () {
//     var self = this
//     var _time = new Date().getTime()
//     self.setCollectTime(_time)
//     if (null == self.globalData.collectInterval) {
//       self.globalData.collectInterval = setInterval(function () {
//         if (self.globalData.user != null) {
//           if (self.collectData.firstLoaded) {
//             if (!self.collectData.listpage) {
//               self.getCollectNewMessage()
//             }
//           }
//         }
//       }, 10 * 1000)
//     }
//   },

//   globalData: {
//     wxUser: null,
//     hasAuth: false,
//     locationAuth: false,
//     onLaunch: false,
//     user: null,
//     unCompleteUser: null,
//     indexType: {
//       isPub: false,
//       type: 1
//     },
//     defaultFilterParam: {
//       a: 0,
//       b: 0,
//       c: 0,
//       d: 0,
//       e: 0,
//       f: 0,
//       g: 0,
//       i: '',
//       j: 0,
//       k: 0,
//       sort: 0,
//       sortFont: '',
//       sortColor: 0,
//       startRent: 0,
//       endRent: '8000+',
//       rentFont: '',
//       way: 'area',
//       itemWidth: '50%',
//       areaFont: '',
//       font: '',
//       areaId: 0,
//       arr1: [],
//       arr2: [],
//       leftL: 0,
//       leftR: 600,
//       leftFontL: 0,
//       leftFontR: 600,
//       leftW: 0,
//       rentWidth: 600,
//       houseSource: 0,
//       moreFont: ''
//     },
//     defaultFilterParamQ: {
//       aQ: 0,
//       bQ: 0,//区域
//       cQ: 0,//商圈
//       eQ: 0,
//       sortQ: 0,
//       sortFontQ: '',
//       sortColorQ: 0,
//       startRentQ: 0,//租金相关
//       endRentQ: '8000+',
//       rentFontQ: '',
//       leftLQ: 0,
//       leftRQ: 600,
//       leftFontLQ: 0,
//       leftFontRQ: 600,
//       leftWQ: 0,
//       rentWidthQ: 600,
//       way: 'area',
//       itemWidthQ: '50%',
//       areaFontQ: '',
//       fontQ: '',
//       areaIdQ: 0,
//       arr1Q: [],
//       arr2Q: [],
//       sexFontQ: '',
//     },
//     filterParam: null,
//     filterParamQiuzu: null,
//     isClicked: false,
//     cityId: 1,
//     city: '北京',
//     lon: '',
//     lat: '',
//     selectUrl: null,
//     selectUrlQiuzu: null,
//     keywords: '',
//     keywordsQiuzu: '',
//     rentType: ['', '主卧', '次卧', '整租'],
//     paymentArray: ['', '押一付一', '押一付三', '押一付六', '年付', '面议'],
//     imConfig: null,
//     // imConfig: {
//     //   sdkAppID: 1400055855, //用户所属应用id,必填
//     //   accountType: 20453, //用户所属应用帐号类型，必填
//     // },
//     imSessionList: [],
//     imAdminUser: {
//       id: 56,
//       //id: 178,//测试环境ID
//       nickname: '合租趣',
//       gender: 2,
//       avatar: 'http://test-1251500528.file.myqcloud.com/hzpwechartapp/im-logo.png'
//     },
//     imHasUnread: false,
//     houseRecommendFlag: true,
//     requestRecommendFlag: true,
//     widowWidth: 0,
//     windowHeight: 0,
//     commentInterval: null,
//     collectInterval: null,
//     detailVisiteCount: 0,
//     wecharCode: {
//       code: '',
//       time: -1
//     },

//     gift: false,
//     trade: null,
//     isX: false,
//     locationCity: '',
//     ageArray: ['未知', '80前', '80后', '85后', '90后', '95后'],
//     config: {},
//     contractConfig: null,
//     hasShowContract: false,
//     bannerList: null,
//     /* _fmOpt配置信息
//      * 填入对应partnerCode和appName
//      */
//     _fmOpt: {
//       partnerCode: "hezup",
//       appName: "hezup_xcx",
//       // 生产环境开启该选项
//       env: "PRODUCTION"
//     },
//     blackBox: '',
//     formId: 0
//   },
//   share: {
//     title: '有家，有友，有故事',
//     imageUrl: 'http://test-1251500528.file.myqcloud.com/hzpwechartapp/share-main.jpg',
//     path: '/pages/main/owning/index'
//   },
//   isBroker: function () {
//     return null != this.globalData.user && this.globalData.user.isBroker
//   },

//   setLoginUserInfo: function (user) {
//     wx.setStorageSync('user', user)
//     this.globalData.user = user
//   },

//   setWxUserInfo: function (wxUser, encryptedData, iv) {
//     if (wxUser == null) {
//       wx.removeStorageSync('wxUser')
//       this.globalData.wxUser = wxUser
//     }
//     else {
//       wxUser.encryptedData = encryptedData
//       wxUser.iv = iv
//       wx.setStorageSync('wxUser', wxUser)
//       this.globalData.wxUser = wxUser
//     }

//   },

//   setHouseRecommendFlag: function (houseRecommendFlag) {
//     try {
//       wx.setStorageSync('houseRecommendFlag', houseRecommendFlag)
//       this.globalData.houseRecommendFlag = houseRecommendFlag
//     }
//     catch (e) {
//       UTIL.alert('设置本地登录信息失败')
//     }
//   },

//   setRequestRecommendFlag: function (requestRecommendFlag) {
//     try {
//       wx.setStorageSync('requestRecommendFlag', requestRecommendFlag)
//       this.globalData.requestRecommendFlag = requestRecommendFlag
//     }
//     catch (e) {
//       UTIL.alert('设置本地登录信息失败')
//     }
//   },

//   logout: function (callbak) {
//     wx.removeStorage({
//       key: 'user',
//       success: function (res) {
//         getApp().globalData.user = null
//         getApp().globalData.imHasUnread = false
//         getApp().globalData.wxUser = null
//         WEBIMHANDLER.logout() // 登出IM
//         getApp().globalData.imSessionList = []
//         getApp().imData.imDetailArray = []
//         getApp().globalData.imSessionList.unshift({
//           id: getApp().globalData.imAdminUser.id,
//           unReadCount: 0,
//           show: 'Hi！我是合租趣。\n • 合租趣正全力维持一个无中介的个人合租转租平台，如您发现中介，请立即举报\n • 线上签约，安全方便，电子版合约同具法律效力\n • 提供押金保险，中国人寿承保，100%押金保障\n希望您有个愉快的租房生活！',
//           timestamp: getApp().getLaunchTime(),
//           timeString: UTIL.time(getApp().getLaunchTime()),
//           user: getApp().globalData.imAdminUser
//         })
//         getApp().commentData.commentArray = []
//         getApp().commentData.page = 1
//         getApp().globalData.detailVisiteCount = 0
//         callbak()
//       },
//     })
//   },
//   //全部重置筛选条件
//   resetFilter: function () {
//     this.globalData.filterParam = this.globalData.defaultFilterParam
//     this.globalData.filterParamQiuzu = this.globalData.defaultFilterParam
//   },

//   initIm: function () {
//     var self = this
//     self.imData.initing = true
//     if (null != this.globalData.user) {
//       if (!WEBIM.checkLogin() || self.globalData.imSessionList.length == 0) {//im未登陆
//         this.imLogin()
//       }
//       else {
//         self.imData.initing = false
//       }
//     }
//     else {
//       self.globalData.imSessionList = []
//       self.globalData.imSessionList.unshift({
//         id: self.globalData.imAdminUser.id,
//         unReadCount: 0,
//         show: 'Hi！我是合租趣。\n • 合租趣正全力维持一个无中介的个人合租转租平台，如您发现中介，请立即举报\n • 线上签约，安全方便，电子版合约同具法律效力\n • 提供押金保险，中国人寿承保，100%押金保障\n希望您有个愉快的租房生活！',
//         timestamp: self.getLaunchTime(),
//         timeString: UTIL.time(self.getLaunchTime()),
//         user: self.globalData.imAdminUser
//       })

//       self.imData.initing = false
//     }
//   },

//   imLogin: function () {
//     var loginInfo = {
//       'sdkAppID': this.globalData.imConfig.sdkAppID, //用户所属应用id,必填
//       'appIDAt3rd': this.globalData.imConfig.sdkAppID, //用户所属应用id，必填
//       'accountType': this.globalData.imConfig.accountType, //用户所属应用帐号类型，必填
//       'identifier': this.globalData.user.id, //当前用户ID,必须是否字符串类型，选填
//       'identifierNick': this.globalData.user.nickname, //当前用户昵称，选填
//       'userSig': this.globalData.user.IMSignature, //当前用户身份凭证，必须是字符串类型，选填
//     };

//     //监听连接状态回调变化事件
//     var onConnNotify = function (resp) {
//       switch (resp.ErrorCode) {
//         case WEBIM.CONNECTION_STATUS.ON:
//           //webim.Log.warn('连接状态正常...');
//           break;
//         case WEBIM.CONNECTION_STATUS.OFF:
//           WEBIM.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
//           break;
//         default:
//           WEBIM.Log.error('未知连接状态,status=' + resp.ErrorCode);
//           break;
//       }
//     };

//     //监听事件
//     var listeners = {
//       "onConnNotify": WEBIMHANDLER.onConnNotify, //选填
//       "onMsgNotify": WEBIMHANDLER.onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
//       "onKickedEventCall": WEBIMHANDLER.onKickedEventCall
//     };

//     //其他对象，选填
//     var options = {
//       'isAccessFormalEnv': true,//是否访问正式环境，默认访问正式，选填
//       'isLogOn': false //是否开启控制台打印日志,默认开启，选填
//     };

//     WEBIMHANDLER.sdkLogin(loginInfo, listeners, options);
//   },

//   imData: {
//     accountDetail: [],
//     imDetailArray: [],
//     loadedIndex: false,
//     initing: true,
//     indexNeedReload: false
//   },

//   initSessionList: function (sessionList) {
//     var self = this
//     self.globalData.imSessionList = []

//     // 是否插入匹配消息
//     var endTimeStamp = Date.parse(new Date());
//     var startTime = wx.getStorageSync('startTimeStamp' + self.globalData.user.id);
//     wx.setStorageSync('startTimeStamp' + self.globalData.user.id, endTimeStamp);
//     if (startTime == '' || startTime == undefined) {
//       //console.log('第一次')
//     } else {

//       NETWORK.POST({
//         url: API.commend,
//         params: {
//           //startTime: '1539851273000',
//           startTime: startTime,
//           endTime: endTimeStamp
//         },
//         success: function (res) {
//           if (res.data.ret == 200) {
//             var matchList = wx.getStorageSync('matchList' + self.globalData.user.id) == undefined || wx.getStorageSync('matchList' + self.globalData.user.id) == '' ? [] : wx.getStorageSync('matchList' + self.globalData.user.id);
//             if (res.data.data.houseRequestMessage) {//发布了有房匹配无房
//               var houseRequests = res.data.data.houseRequests;
//               var houseRequestsAvatar = [];
//               for (var i = 0; i < houseRequests.length; i++) {
//                 var obj = {};
//                 obj.avatar = houseRequests[i].user.avatar;
//                 obj.gender = houseRequests[i].user.gender;
//                 obj.isAdministrators = houseRequests[i].user.isAdministrators;
//                 houseRequestsAvatar.unshift(obj);
//               }
//               var houseRequestMessageObj = {};
//               houseRequestMessageObj.title = res.data.data.houseRequestMessage;
//               houseRequestMessageObj.houseAvatar = houseRequestsAvatar;
//               houseRequestMessageObj.id = res.data.data.house.id;
//               houseRequestMessageObj.communityName = res.data.data.house.communityName;
//               houseRequestMessageObj.startTime = res.data.data.startTime;
//               houseRequestMessageObj.endTime = res.data.data.endTime;
//               houseRequestMessageObj.matchType = 'houseRequestMessage';
//               houseRequestMessageObj._unReadFlag = true;

//               matchList.push(houseRequestMessageObj);
//               wx.setStorageSync('matchList' + self.globalData.user.id, matchList);
//             }
//             if (res.data.data.houseMessage) {//发布了无房匹配有房
//               var houses = res.data.data.houses;
//               var houseAvatar = [];
//               for (var i = 0; i < houses.length; i++) {
//                 var obj = {};
//                 obj.avatar = houses[i].user.avatar;
//                 obj.gender = houses[i].user.gender;
//                 obj.isAdministrators = houses[i].user.isAdministrators;
//                 houseAvatar.unshift(obj);
//               }
//               var houseMessageObj = {};
//               houseMessageObj.title = res.data.data.houseMessage;
//               houseMessageObj.houseAvatar = houseAvatar;
//               houseMessageObj.id = res.data.data.houseRequest.id;
//               houseMessageObj.communityName = '符合期望地点的附近出租';
//               houseMessageObj.startTime = res.data.data.startTime;
//               houseMessageObj.endTime = res.data.data.endTime;
//               houseMessageObj.matchType = 'houseMessage';
//               houseMessageObj._unReadFlag = true;

//               matchList.push(houseMessageObj);
//               wx.setStorageSync('matchList' + self.globalData.user.id, matchList);
//             }
//             // console.log(wx.getStorageSync('matchList' + self.globalData.user.id));            
//           }

//         },
//         fail: function () {

//         }
//       })
//     }

//     if (sessionList) {

//       var _account = []
//       for (var i = 0; i < sessionList.length; i++) {
//         _account.push(sessionList[i].To_Account)
//       }

//       if (_account.length == 0) {
//         _account.push(self.globalData.imAdminUser.id)
//       }
//       // 获取黑名单列表
//       var options = {
//         'From_Account': '' + self.globalData.user.id,
//         'StartIndex': 0,
//         'MaxLimited': 1000,
//         'LastSequence': 0
//       };
//       WEBIM.getBlackList(
//         options,
//         function (resp) {
//           WEBIM.syncMsgs(function () {

//             // 获取被封禁的用户
//             NETWORK.GET({
//               url: API.filterForbiddenUser,
//               params: {
//                 destUserIds: _account.join(',')
//               },
//               success: function (res) {
//                 if (res.data.ret == 200) {
//                   var _forbidUser = res.data.data
//                   self.globalData.imSessionList = []

//                   var sessMap = WEBIM.MsgStore.sessMap() // 所有会话
//                   var hasAdminUser = false
//                   var _adminSession = null

//                   for (var i = 0; i < sessionList.length; i++) {
//                     var _id = sessionList[i].To_Account

//                     var _blackListFlag = false
//                     if (resp.BlackListItem && resp.BlackListItem.length > 0) {
//                       for (var m = 0; m < resp.BlackListItem.length; m++) {
//                         if (parseInt(resp.BlackListItem[m].To_Account) == _id) {
//                           _blackListFlag = true
//                           break
//                         }
//                       }
//                       if (_blackListFlag) {
//                         continue
//                       }
//                     }

//                     var forbidFlag = false
//                     if (_forbidUser && _forbidUser.length > 0) {
//                       for (var _m = 0; _m < _forbidUser.length; _m++) {
//                         if (_id == _forbidUser[_m]) {
//                           forbidFlag = true
//                           break
//                         }
//                       }
//                       if (forbidFlag) {
//                         continue
//                       }
//                     }

//                     var _unReadCount = 0
//                     if (sessMap["C2C" + _id]) {
//                       _unReadCount = sessMap["C2C" + _id].unread()
//                     }

//                     var matchList = wx.getStorageSync('matchList' + self.globalData.user.id);
//                     var len = matchList.length - 1;

//                     if (_id == self.globalData.imAdminUser.id) {//与系统消息有聊天记录
//                       hasAdminUser = true
//                       if (matchList) {//若插入匹配消息则+1    
//                         for (var j = 0; j < matchList.length; j++) {
//                           if (matchList[j]._unReadFlag) {
//                             self.globalData.imHasUnread = true
//                           }
//                         }
//                         var show = '';
//                         if (self.globalData.imHasUnread) {
//                           show = matchList[len].title;
//                           _unReadCount = _unReadCount + 1;
//                         } else {
//                           if (sessionList[i].MsgTimeStamp * 1000 > matchList[len].startTime) {
//                             show = sessionList[i].MsgShow;
//                           } else {
//                             show = matchList[len].title;
//                           }
//                         }
//                         _adminSession = {
//                           id: _id,
//                           unReadCount: _unReadCount,
//                           show: show,
//                           timestamp: sessionList[i].MsgTimeStamp,
//                           timeString: UTIL.time(sessionList[i].MsgTimeStamp * 1000),
//                           user: self.globalData.imAdminUser
//                         }
//                       } else {
//                         _adminSession = {
//                           id: _id,
//                           unReadCount: _unReadCount,
//                           show: sessionList[i].MsgShow,
//                           timestamp: sessionList[i].MsgTimeStamp,
//                           timeString: UTIL.time(sessionList[i].MsgTimeStamp * 1000),
//                           user: self.globalData.imAdminUser
//                         }
//                       }
//                       continue
//                     }

//                     self.globalData.imSessionList.push({
//                       id: sessionList[i].To_Account,
//                       unReadCount: _unReadCount,
//                       show: sessionList[i].MsgShow,
//                       timestamp: sessionList[i].MsgTimeStamp,
//                       timeString: UTIL.time(sessionList[i].MsgTimeStamp * 1000),
//                       user: null,
//                       sending: false,
//                       senderr: false
//                     })

//                     if (_unReadCount > 0) {
//                       self.globalData.imHasUnread = true
//                     }

//                   }
//                   // 管理员信息初始化
//                   if (_adminSession == null) {//没有和系统消息聊天
//                     if (wx.getStorageSync('matchList' + self.globalData.user.id)) {//若插入匹配消息则+1                   
//                       //若有匹配消息则插入
//                       self.globalData.imSessionList.unshift({
//                         id: self.globalData.imAdminUser.id,
//                         unReadCount: 0,
//                         show: matchList[len].title,
//                         timestamp: self.getLaunchTime(),
//                         timeString: UTIL.time(self.getLaunchTime()),
//                         user: self.globalData.imAdminUser
//                       })
//                       for (var i = 0; i < matchList.length; i++) {
//                         if (matchList[i]._unReadFlag) {
//                           self.globalData.imHasUnread = true
//                         }
//                       }
//                     } else {
//                       self.globalData.imSessionList.unshift({
//                         id: self.globalData.imAdminUser.id,
//                         unReadCount: 0,
//                         show: 'Hi！我是合租趣。\n • 合租趣正全力维持一个无中介的个人合租转租平台，如您发现中介，请立即举报\n • 线上签约，安全方便，电子版合约同具法律效力\n • 提供押金保险，中国人寿承保，100%押金保障\n希望您有个愉快的租房生活！',
//                         timestamp: self.getLaunchTime(),
//                         timeString: UTIL.time(self.getLaunchTime()),
//                         user: self.globalData.imAdminUser
//                       })
//                     }
//                   }
//                   else {
//                     self.globalData.imSessionList.unshift(_adminSession)
//                   }
//                   self.imData.initing = false

//                   setTimeout(function () {
//                     var currentPage = getApp().globalGetCurrentPage()
//                     if (typeof currentPage.reloadUnread != 'undefined') {
//                       currentPage.reloadUnread(self.globalData.imHasUnread)
//                     }

//                     if (currentPage.route.indexOf('/im/index') > 0) {
//                       currentPage.loadSessionList()
//                     }
//                   }, 300)
//                 }
//                 else {
//                 }
//               },
//               fail: function () {
//               }
//             })
//           }); //初始化最近会话的消息未读数          
//         },
//         function (err) {
//           self.imData.initing = false
//         }
//       );
//     }
//     else {
//       self.globalData.imSessionList.push({
//         id: self.globalData.imAdminUser.id,
//         unReadCount: 0,
//         show: 'Hi！我是合租趣。\n • 合租趣正全力维持一个无中介的个人合租转租平台，如您发现中介，请立即举报\n • 线上签约，安全方便，电子版合约同具法律效力\n • 提供押金保险，中国人寿承保，100%押金保障\n希望您有个愉快的租房生活！',
//         timestamp: self.getLaunchTime(),
//         timeString: UTIL.time(self.getLaunchTime()),
//         user: self.globalData.imAdminUser
//       })
//       self.imData.initing = false
//     }
//   },

//   globalGetCurrentPage() {
//     var currentPages = getCurrentPages()
//     return currentPages[currentPages.length - 1]
//   },

//   commentData: {
//     commentArray: [],
//     listpage: false,
//     page: 1,
//     pageSize: 20,
//     noOldData: false,
//     loading: false,
//     hasUnread: false,
//     readTime: -1,
//     firstLoaded: false
//   },

//   collectData: {
//     collectArray: [],
//     listpage: false,
//     page: 1,
//     pageSize: 20,
//     noOldData: false,
//     loading: false,
//     hasUnread: false,
//     readTime: -1,
//     firstLoaded: false
//   },

//   getNewMessage() {
//     var app = this
//     NETWORK.GET({
//       url: API.messageByLoginUserId,
//       params: {
//         page: 1,
//         pageSize: app.commentData.pageSize
//       },
//       success: function (resp) {
//         if (resp.data.ret == 200) {
//           // 本地存储的一个时间
//           var _length = app.commentData.commentArray.length
//           var _commentTime = app.getCommentTime()

//           if (resp.data.data.length > 0) {
//             for (var i = resp.data.data.length - 1; i >= 0; i--) {
//               if (resp.data.data[i].messageInfoType == "PERSONAL_HOME_PAGE" || resp.data.data[i].messageInfoType == "HOUSE" || resp.data.data[i].messageInfoType == "HOUSE_REQUEST") {
//                 // 这三种状态的数据需要展示出来 
//                 if (resp.data.data[i].sentTime > _commentTime) {
//                   app.commentData.hasUnread = true
//                   if (_length == 0) {
//                     app.commentData.commentArray.unshift(resp.data.data[i])
//                   }
//                   else if (_length > 0 && app.commentData.commentArray[_length - 1].sentTime < resp.data.data[i].sentTime) {
//                     // 非社区的留言数据
//                     resp.data.data[i].timeString = UTIL.time(resp.data.data[i].sentTime)
//                     var _flag = false
//                     // 判断是否可以插入
//                     for (var j = 0; j < app.commentData.commentArray.length; j++) {
//                       if (app.commentData.commentArray[j].id == resp.data.data[i].id) {
//                         _flag = true
//                         break
//                       }
//                     }
//                     if (!_flag) {
//                       app.commentData.commentArray.unshift(resp.data.data[i])
//                     }
//                   }
//                 }
//               }
//             }
//           }


//           var _currentPage = app.globalGetCurrentPage()
//           if (_currentPage && typeof _currentPage.reloadUnread != 'undefined') {
//             _currentPage.reloadUnread()
//           }
//         }
//       },
//       fail: function () { },
//       app: app
//     })
//   },

//   getCollectNewMessage() {
//     var app = this
//     NETWORK.GET({
//       url: API.passiveLikeList,
//       params: {
//         page: 1,
//         pageSize: app.collectData.pageSize
//       },
//       success: function (resp) {
//         if (resp.data.ret == 200) {
//           // 本地存储的一个时间
//           var _length = app.collectData.collectArray.length
//           var _collectTime = app.getCollectTime()

//           if (resp.data.data.length > 0) {
//             for (var i = resp.data.data.length - 1; i >= 0; i--) {
//               // 这三种状态的数据需要展示出来 
//               if (resp.data.data[i].likeTime > _collectTime) {
//                 app.collectData.hasUnread = true
//                 if (_length == 0) {
//                   app.collectData.collectArray.unshift(resp.data.data[i])
//                 }
//                 else if (_length > 0 && app.collectData.collectArray[_length - 1].likeTime < resp.data.data[i].likeTime) {
//                   // 非社区的留言数据
//                   resp.data.data[i].timeString = UTIL.time(resp.data.data[i].likeTime)
//                   var _flag = false
//                   // 判断是否可以插入
//                   for (var j = 0; j < app.collectData.collectArray.length; j++) {
//                     if (app.collectData.collectArray[j].id == resp.data.data[i].id) {
//                       _flag = true
//                       break
//                     }
//                   }
//                   if (!_flag) {
//                     app.collectData.collectArray.unshift(resp.data.data[i])
//                   }
//                 }
//               }
//             }
//           }

//           var _currentPage = app.globalGetCurrentPage()
//           if (_currentPage && typeof _currentPage.realoadCollectUnread != 'undefined') {
//             _currentPage.realoadCollectUnread()
//           }
//         }
//       },
//       fail: function () { },
//       app: app
//     })
//   },

//   reloadMessage(app, callbak) {
//     NETWORK.GET({
//       url: API.messageByLoginUserId,
//       params: {
//         page: app.commentData.page,
//         pageSize: app.commentData.pageSize
//       },
//       success: function (resp) {
//         if (resp.data.ret == 200) {
//           var _commentTime = app.getCommentTime()
//           var _data = app.commentData.commentArray
//           for (var i = 0; i < resp.data.data.length; i++) {
//             resp.data.data[i].timeString = UTIL.time(resp.data.data[i].sentTime)
//             // console.log(resp.data)
//             if (resp.data.data[i].messageInfoType == "PERSONAL_HOME_PAGE" || resp.data.data[i].messageInfoType == "HOUSE" || resp.data.data[i].messageInfoType == "HOUSE_REQUEST") {
//               // 这三种状态的数据需要展示出来 
//               if (resp.data.data[i].sentTime > _commentTime) {
//                 app.commentData.hasUnread = true
//               }
//               _data.push(resp.data.data[i])
//             }
//           }

//           var _currentPage = app.globalGetCurrentPage()
//           if (_currentPage && typeof _currentPage.reloadUnread != 'undefined') {
//             _currentPage.reloadUnread()
//           }

//           app.commentData.noOldData = resp.data.data.length < app.commentData.pageSize
//           app.commentData.page++
//           if (callbak) {
//             callbak()
//           }
//         }
//         if (!app.commentData.firstLoaded) {
//           app.commentData.firstLoaded = true
//         }
//       },
//       fail: function () {

//       },
//       app: app
//     })
//   },

//   loadCollectMessage(app, callbak) {
//     NETWORK.GET({
//       url: API.passiveLikeList,
//       params: {
//         page: app.collectData.page,
//         pageSize: app.collectData.pageSize
//       },
//       success: function (resp) {
//         if (resp.data.ret == 200) {
//           var _collectTime = app.getCollectTime()
//           var _data = app.collectData.collectArray
//           for (var i = 0; i < resp.data.data.length; i++) {
//             resp.data.data[i].timeString = UTIL.time(resp.data.data[i].likeTime)
//             if (resp.data.data[i].likeTime > _collectTime) {
//               app.collectData.hasUnread = true
//             }
//             _data.push(resp.data.data[i])
//           }

//           var _currentPage = app.globalGetCurrentPage()
//           if (_currentPage && typeof _currentPage.realoadCollectUnread != 'undefined') {
//             _currentPage.realoadCollectUnread()
//           }

//           app.collectData.noOldData = resp.data.data.length < app.collectData.pageSize
//           app.collectData.page++
//           if (callbak) {
//             callbak()
//           }
//         }
//         if (!app.collectData.firstLoaded) {
//           app.collectData.firstLoaded = true
//         }
//       },
//       fail: function () {

//       },
//       app: app
//     })
//   },

//   getContractConfig: function (cbk) {
//     var app = this
//     if (app.globalData.contractConfig == null) {
//       NETWORK.GET({
//         url: API.operate,
//         params: {},
//         success: function (res) {
//           var _data = res.data.data
//           app.globalData.contractConfig = _data
//           cbk && cbk()
//         },
//         fail: function () { }
//       })
//     }
//     else {
//       cbk && cbk()
//     }
//   },
// })