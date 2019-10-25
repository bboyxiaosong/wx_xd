
var webim = require('webim.js');
var UTIL = require('util.js');
var DATE_UTIL = require('dateUtil.js');
var TX = require('txcloud.js');

var selToID
    ,loginInfo
    ,accountMode
    ,accountType
    ,sdkAppID
    ,avChatRoomId
    ,selType
    ,selToID
    ,selSess
    ,selSessHeadUrl
    ;

//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
  try{    
    var newMsg;
    for (var j in newMsgList) {//遍历新消息
      newMsg = newMsgList[j];
      handlderMsg(newMsg);//处理新消息
    }  
  }
  catch(e) {
    // console.log('--------- exception --------', e)
    // console.log('错误' + e.message + '发生在' + e.lineNumber + '行');  
  }
  // console.log(' ===================')
      
}

function onKickedEventCall () {
  // console.log('其他用户端登录')
}

//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
function handlderMsg(msg) {
    // console.log('有新的消息请注意查收', msg)
    
    var fromAccount, fromAccountNick, sessType, subType, contentHtml;
    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = fromAccount;
    }

    var msgTime = msg.getTime()
    if(!msgTime) {
      msgTime = 0
    }
    sessType = msg.getSession().type();
    subType = msg.getSubType();

    var app = getApp()
    var _length = getCurrentPages().length
    var currentPage = getCurrentPages()[_length - 1]
    var isNewUser = true
    var fromUserId = parseInt(fromAccountNick)
    if (fromUserId == getApp().globalData.user.id) {
      return
    }

    switch (sessType) {
      case webim.SESSION_TYPE.C2C://私聊消息
        switch (subType) {
          case webim.C2C_MSG_SUB_TYPE.COMMON://c2c普通消息  

            // var msgObjType = msg.elems[0].type
            // if(msgObjType == webIm.)
            // 更新列表
            var _msgObject = convertMsgToObject(msg)

            var _content = ''
            var _type = _msgObject.type
            if (_type == webim.MSG_ELEMENT_TYPE.IMAGE) {
              _content = '[图片]'
            }
            else if (_type == webim.MSG_ELEMENT_TYPE.SOUND) {
              _content = '[语音]'
            }
            else if (_type == webim.MSG_ELEMENT_TYPE.LOCATION) {
              _content = '[位置]'
            }
            else if (_type == webim.MSG_ELEMENT_TYPE.CUSTOM) {
              _content = '[其他]'
            }
            else {
              _content = _msgObject.msg
            }
            var _index = 0
            var _tempSession = {}
            for (var i = 0; i < app.globalData.imSessionList.length; i++) {
              if (app.globalData.imSessionList[i].id == parseInt(fromAccountNick)) {
                app.globalData.imSessionList[i].unReadCount++
                app.globalData.imSessionList[i].show = _content
                app.globalData.imSessionList[i].timestamp = msg.time
                app.globalData.imSessionList[i].timeString = UTIL.time(msg.time * 1000)
                app.globalData.imSessionList[i].msgType = _type
                isNewUser = false
                _index = i
                _tempSession = app.globalData.imSessionList[i]
                break
              }
            }                  
            if (isNewUser) {
              _tempSession = {
                id: parseInt(fromAccountNick),
                unReadCount: 1,
                show: _content,
                timestamp: msg.time,
                timeString: UTIL.time(msg.time * 1000),
                user: null,
                sending: false,
                senderr: false,
                msgType: _type
              }
            }
            else {
              for (var i = 0; i < app.imData.imDetailArray.length; i++) {
                if (app.imData.imDetailArray[i].id == parseInt(fromAccountNick)) {
                  var _obj = {}
                  var _history = app.imData.imDetailArray[i].history
                  if(_history.length > 0) {
                    _obj.showTime = msg.time - _history[_history.length - 1].timestamp > 5 * 60
                    _obj.id = _history[_history.length - 1].id + 1
                  }     
                  else {
                    _obj.id = 0
                  }                   
                  _obj.time = DATE_UTIL.imTimeFormater(msg.time * 1000)
                  _obj.timestamp = msg.time
                  _obj.listening = 'http://test-1251500528.file.myqcloud.com/hzpwechartapp/icon-msg-sound.png'
                  _obj.listeningRight = 'http://test-1251500528.file.myqcloud.com/hzpwechartapp/icon-msg-sound-right.png'
                  _obj.fromAccount = parseInt(fromAccountNick)
                  _obj.msgObj = _msgObject
                  _obj.isCurrentUser = true
                  app.imData.imDetailArray[i].history.push(_obj)
                }
              }
            }

            // 列表重新排序
            if (parseInt(fromAccountNick) != app.globalData.imAdminUser.id) {
              var _data = []
              if (!isNewUser) {
                app.globalData.imSessionList.splice(_index, 1)
              }
              for (var i = 0; i < app.globalData.imSessionList.length; i++) {
                _data.push(app.globalData.imSessionList[i])
                if (i == 0) {
                  _data.push(_tempSession)
                }
              }
              app.globalData.imSessionList = _data

            }

            if (typeof currentPage.notify != 'undefined') {
              currentPage.notify(parseInt(fromAccountNick), _content, msg.time, _msgObject)
            }

            if (!(currentPage.data.detailPage && currentPage.data.id == parseInt(fromAccountNick))) {
              // 需要加红点
              app.globalData.imHasUnread = true
              // console.log(' ========= ', currentPage)
              if (typeof currentPage.reloadUnread != 'undefined') {
                currentPage.reloadUnread(true)
              }
            }
              
        }
        break;
      case webim.SESSION_TYPE.GROUP://普通群消息，对于直播聊天室场景，不需要作处理
          break;
    }
}

// 新加了一条消息 填充全局信息
function addMsg(msg) {
  var app = getApp()
  var isNewUser = true
  switch (msg.subType) {
    case webim.C2C_MSG_SUB_TYPE.COMMON://c2c普通消息 
      var _index = 0
      var _tempSession = {}
      for (var i = 0; i < app.globalData.imSessionList.length; i++) {
        if (app.globalData.imSessionList[i].id == msg.toAccountId) {
          app.globalData.imSessionList[i].unReadCount = 0
          app.globalData.imSessionList[i].show = msg.contentHtml
          app.globalData.imSessionList[i].timestamp = msg.timestamp
          app.globalData.imSessionList[i].timeString = UTIL.time(msg.timestamp * 1000)
          app.globalData.imSessionList[i].sending = msg.seding,
          app.globalData.imSessionList[i].senderr = msg.senderr
          isNewUser = false
          _index = i
          _tempSession = app.globalData.imSessionList[i]
          break
        }
      }
      if (isNewUser) {
        _tempSession = {
          id: msg.toAccountId,
          unReadCount: 0,
          show: msg.contentHtml,
          timestamp: msg.timestamp,
          timeString: UTIL.time(msg.timestamp * 1000),
          user: null,
          sending: false,
          senderr: false
        }
      }

      for (var i = 0; i < app.imData.imDetailArray.length; i++) {
        if (app.imData.imDetailArray[i].id == msg.toAccountId) {
          var _obj = {}
          var _history = app.imData.imDetailArray[i].history
          _obj.showTime = msg.showTime
          _obj.time = DATE_UTIL.imTimeFormater(msg.timestamp)
          _obj.timestamp = app.getLaunchTime()
          _obj.id = msg.id
          _obj.fromAccount = parseInt(msg.fromAccountId)
          if (msg.msgObj) {
            _obj.msgObj = msg.msgObj
          }
          else {
            _obj.msgObj = {
              type: webim.MSG_ELEMENT_TYPE.TEXT,
              msg: msg.contentHtml
            }
          }          
          _obj.isCurrentUser = false
          _obj.sending = msg.seding
          _obj.senderr = msg.senderr
          app.imData.imDetailArray[i].history.push(_obj)
        }
      }
      
      // 列表重新排序
      var _data = []
      if (!isNewUser && _index != 0) {
        app.globalData.imSessionList.splice(_index, 1)
      } 
      for (var i = 0; i < app.globalData.imSessionList.length; i++) {
        _data.push(app.globalData.imSessionList[i])
        if (i == 0 && ((!isNewUser && _index != 0) || isNewUser)) {
          _data.push(_tempSession)
        }
      }
      app.globalData.imSessionList = _data
  }    
}

// 消息发送成功
function sendOk(msg, resp) {
  var app = getApp()
  for (var i = 0; i < app.globalData.imSessionList.length; i++) {
    if (app.globalData.imSessionList[i].id == msg.toAccountId) {
      app.globalData.imSessionList[i].timestamp = resp.MsgTime
      app.globalData.imSessionList[i].timeString = UTIL.time(resp.MsgTime * 1000)
      app.globalData.imSessionList[i].sending = false,
      app.globalData.imSessionList[i].senderr = false
    }
  }
  var flag = false
  for (var i = 0; i < app.imData.imDetailArray.length; i++) {
    if (app.imData.imDetailArray[i].id == msg.toAccountId) {

      for (var j = 0; j < app.imData.imDetailArray[i].history.length; j++) {
        if (app.imData.imDetailArray[i].history[j].id == msg.id) {
          app.imData.imDetailArray[i].history[j].sending = false
          app.imData.imDetailArray[i].history[j].senderr = false
          app.imData.imDetailArray[i].history[j].time = DATE_UTIL.imTimeFormater(resp.MsgTime * 1000)
          app.imData.imDetailArray[i].history[j].timestamp = resp.MsgTime

          flag = true
          break
        }        
      }
    }
    if(flag) {
      break
    }
  }
}

// 消息发送成功
function sendError(msg) {
  var app = getApp()
  for (var i = 0; i < app.globalData.imSessionList.length; i++) {
    if (app.globalData.imSessionList[i].id == msg.toAccountId) {
      app.globalData.imSessionList[i].sending = false
      app.globalData.imSessionList[i].senderr = true
    }
  }
  var flag = false
  for (var i = 0; i < app.imData.imDetailArray.length; i++) {
    if (app.imData.imDetailArray[i].id == msg.toAccountId) {

      for (var j = 0; j < app.imData.imDetailArray[i].history.length; j++) {
        if (app.imData.imDetailArray[i].history[j].id == msg.id) {
          app.imData.imDetailArray[i].history[j].sending = false
          app.imData.imDetailArray[i].history[j].senderr = true

          flag = true
          break
        }
      }
    }
    if( flag ) {
      break
    }
  }
}

//sdk登录
function sdkLogin(userInfo, listeners, options) {
    //web sdk 登录
    webim.login(userInfo, listeners, options,
        function (identifierNick) {

            webim.getRecentContactList({
              'Count': 100 //最近的会话数 ,最大为100
            }, function (resp) {
              if ('OK' == resp.ActionStatus) {
                getApp().initSessionList(resp.SessionItem)            
              }

            }, function (resp) {
            });
        },
        function (err) {
            console.error(err.ErrorInfo);
        }
    );
}

//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
    var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
    var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = '未知用户';
    }
    //解析消息
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();
    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();

    isSelfSend = msg.getIsSend();//消息是否为自己发的
    var content = "";
    switch (subType) {

        case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
            content = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET://群红包消息
            content = "[群红包消息]" + convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG://群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            content = "[群点赞消息]" + convertMsgtoHtml(msg);
            //展示点赞动画
            showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP://群提示消息
            content = "[群提示消息]" + convertMsgtoHtml(msg);
            break;
    }

    return {
        fromAccountNick : fromAccountNick,
        content : content
    }
}

function convertMsgToObject(msg) {
  var html = "", elems, elem, type, content;
  elems = msg.getElems();//获取消息包含的元素数组

  // 单条消息
  elem = elems[0]
  type = elem.getType();//获取元素类型
  content = elem.getContent();//获取元素对象
  var _rs = {}
  switch (type) {
    case webim.MSG_ELEMENT_TYPE.TEXT:
      _rs.msg = webim.Tool.formatHtml2Text(convertTextMsgToHtml(content))
      _rs.type = webim.MSG_ELEMENT_TYPE.TEXT
      break;
    case webim.MSG_ELEMENT_TYPE.IMAGE:
      var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL);//小图
      var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE);//大图
      var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN);//原图
      if (!bigImage) {
        bigImage = smallImage;
      }
      if (!oriImage) {
        oriImage = smallImage;
      }
      _rs.smallImage = smallImage.getUrl()
      _rs.bigImage = bigImage.getUrl()
      _rs.oriImage = oriImage.getUrl()
      _rs.width = oriImage.getWidth()
      _rs.height = oriImage.getHeight()

      if (_rs.width > _rs.height) {
        _rs.height = (_rs.height * 280) / _rs.width
        _rs.width = 280
      }
      else {

        _rs.width = (_rs.width * 280) / _rs.height
        _rs.height = 280
      }
      _rs.type = webim.MSG_ELEMENT_TYPE.IMAGE
      break;
    case webim.MSG_ELEMENT_TYPE.SOUND:
      // console.log(msg)
      var second = content.getSecond();//获取语音时长
      var downUrl = content.getDownUrl();
      _rs.second = second
      _rs.downUrl = downUrl
      _rs.width = (280 / 60 * second + 120)
      _rs.width = (_rs.width > 400) ? 400 : _rs.width
      _rs.type = webim.MSG_ELEMENT_TYPE.SOUND
      break;
    case webim.MSG_ELEMENT_TYPE.LOCATION:
      var _arr = content.desc.split('@@@@')
      _rs.title = _arr[0]
      _rs.desc = _arr.length > 1 ? _arr[1]:''
      _rs.lon = content.longitude
      _rs.lat = content.latitude
      _rs.mapLink = 'http://api.map.baidu.com/staticimage?ak=Aq29OgVAybRhy04nv2kYaGP3kM8Eew9S&zoom=15&center=' + content.longitude + ',' + content.latitude + '&markers=' + content.longitude + ',' + content.latitude + '&width=230&height=95&scale=2&markerStyles=-1,http://prod-1251500528.file.myqcloud.com/hzp/img/baidu-point-2.png,-1'
      _rs.type = webim.MSG_ELEMENT_TYPE.LOCATION
      break;

    case webim.MSG_ELEMENT_TYPE.CUSTOM:
      try{
        var _obj = JSON.parse(msg.elems[0].content.data);
        var _houseType = _obj.type
        _rs = _obj
        _rs.type = webim.MSG_ELEMENT_TYPE.CUSTOM
        _rs.houseType = _houseType
        _rs.tags = _rs.tag
      }
      catch(e) {
        _rs = {}
        
        webim.Log.error('未知消息元素类型: elemType=' + type);
        _rs.msg = '暂不支持该类型消息'
        _rs.type = webim.MSG_ELEMENT_TYPE.CUSTOM
      }
      break;
    default:
      
      webim.Log.error('未知消息元素类型: elemType=' + type);
      _rs.msg = '暂不支持该类型消息'
      _rs.type = webim.MSG_ELEMENT_TYPE.TEXT
      break;
  }
  return _rs
}

//把消息转换成Html
function convertMsgtoHtml(msg) {
    var html = "", elems, elem, type, content;
    elems = msg.getElems();//获取消息包含的元素数组
    for (var i in elems) {
        elem = elems[i];
        type = elem.getType();//获取元素类型
        content = elem.getContent();//获取元素对象
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                html += convertTextMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                html += convertImageMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
                html += convertSoundMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.LOCATION://暂不支持地理位置
                //html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                html += convertCustomMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                html += convertGroupTipMsgToHtml(content);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
    }
    return webim.Tool.formatHtml2Text(html);
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
    return content.getText();
}
//解析表情消息元素
function convertFaceMsgToHtml(content) {
    return content.getData();
    return content;
    var faceUrl = null;
    var data = content.getData();
    var index = webim.EmotionDataIndexs[data];

    var emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
        faceUrl = emotion[1];
    }
    if (faceUrl) {
      return "<image src='" + faceUrl + "'/>";
    } else {
        return data;
    }
}
//解析图片消息元素
function convertImageMsgToHtml(content) {
    var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL);//小图
    var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE);//大图
    var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN);//原图
    if (!bigImage) {
        bigImage = smallImage;
    }
    if (!oriImage) {
        oriImage = smallImage;
    }
    return "<image src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' class='msg-image' ></image>";
}
//解析语音消息元素
function convertSoundMsgToHtml(content) {
    var second = content.getSecond();//获取语音时长
    var downUrl = content.getDownUrl();
    if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
    }
    return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}
//解析文件消息元素
function convertFileMsgToHtml(content) {
    var fileSize = Math.round(content.getSize() / 1024);
    return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + 'KB)</i></a>';

}
//解析位置消息元素
function convertLocationMsgToHtml(content) {
    return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}
//解析自定义消息元素
function convertCustomMsgToHtml(content) {
    var data = content.getData();
    var desc = content.getDesc();
    var ext = content.getExt();
    return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}
//解析群提示消息元素
function convertGroupTipMsgToHtml(content) {
    var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    var text = "";
    var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    var opType, opUserId, userIdList;
    var memberCount;
    opType = content.getOpType();//群提示消息类型（操作类型）
    opUserId = content.getOpUserId();//操作人id
    switch (opType) {
        case webim.GROUP_TIP_TYPE.JOIN://加入群
            userIdList = content.getUserIdList();
            //text += opUserId + "邀请了";
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text = text.substring(0, text.length - 1);
            text += "进入房间";
            //房间成员数加1
            // memberCount = $('#user-icon-fans').html();
            memberCount = parseInt(memberCount) + 1;
            break;
        case webim.GROUP_TIP_TYPE.QUIT://退出群
            text += opUserId + "离开房间";
            //房间成员数减1
            if (memberCount > 0) {
                memberCount = parseInt(memberCount) - 1;
            }
            break;
        case webim.GROUP_TIP_TYPE.KICK://踢出群
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "踢出该群";
            break;
        case webim.GROUP_TIP_TYPE.SET_ADMIN://设置管理员
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "设为管理员";
            break;
        case webim.GROUP_TIP_TYPE.CANCEL_ADMIN://取消管理员
            text += opUserId + "取消";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "的管理员资格";
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO://群资料变更
            text += opUserId + "修改了群资料：";
            var groupInfoList = content.getGroupInfoList();
            var type, value;
            for (var m in groupInfoList) {
                type = groupInfoList[m].getType();
                value = groupInfoList[m].getValue();
                switch (type) {
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                        text += "群头像为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                        text += "群名称为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                        text += "群主为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                        text += "群公告为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                        text += "群简介为" + value + "; ";
                        break;
                    default:
                        text += "未知信息为:type=" + type + ",value=" + value + "; ";
                        break;
                }
            }
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO://群成员资料变更(禁言时间)
            text += opUserId + "修改了群成员资料:";
            var memberInfoList = content.getMemberInfoList();
            var userId, shutupTime;
            for (var m in memberInfoList) {
                userId = memberInfoList[m].getUserId();
                shutupTime = memberInfoList[m].getShutupTime();
                text += userId + ": ";
                if (shutupTime != null && shutupTime !== undefined) {
                    if (shutupTime == 0) {
                        text += "取消禁言; ";
                    } else {
                        text += "禁言" + shutupTime + "秒; ";
                    }
                } else {
                    text += " shutupTime为空";
                }
                if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + memberInfoList.length + "人";
                    break;
                }
            }
            break;
        default:
            text += "未知群提示消息类型：type=" + opType;
            break;
    }
    return text;
}


//单击图片事件
function imageClick(imgObj) {
    var imgUrls = imgObj.src;
    var imgUrlArr = imgUrls.split("#"); //字符分割
    var smallImgUrl = imgUrlArr[0];//小图
    var bigImgUrl = imgUrlArr[1];//大图
    var oriImgUrl = imgUrlArr[2];//原图
    webim.Log.info("小图url:" + smallImgUrl);
    webim.Log.info("大图url:" + bigImgUrl);
    webim.Log.info("原图url:" + oriImgUrl);
}


//切换播放audio对象
function onChangePlayAudio(obj) {
    if (curPlayAudio) {//如果正在播放语音
        if (curPlayAudio != obj) {//要播放的语音跟当前播放的语音不一样
            curPlayAudio.currentTime = 0;
            curPlayAudio.pause();
            curPlayAudio = obj;
        }
    } else {
        curPlayAudio = obj;//记录当前播放的语音
    }
}

//单击留言图片
function smsPicClick() {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.error('请填写帐号和票据');
        }
        return;
    } else {
        hideDiscussTool();//隐藏留言工具栏
        showDiscussForm();//显示留言表单
    }
}

//发送消息(普通消息)
function onSendMsg(msg, callback) {
    //获取消息内容
    var msgtosend = msg;
    var msgLen = webim.Tool.getStrBytes(msg);

    if (msgtosend.length < 1) {
        console.error("发送的消息不能为空!");
        return;
    }
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";

    if (msgLen > maxLen) {
        console.error(errInfo);
        return;
    }

    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true;//是否为自己发送
    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    var subType;//消息子类型
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
    } else {//有表情

        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];
            if (emotion) {
                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new webim.Msg.Elem.Text(emotions[i]);
                msg.addText(text_obj);
            }
            restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
            msgtosend = msgtosend.substring(restMsgIndex);
        }
        if (msgtosend) {
            text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
        }
    }
    webim.sendMsg(msg, function (resp) {
        webim.Log.info("发消息成功");
        callback && callback(resp);
    }, function (err) {
        webim.Log.error("发消息失败:" + err.ErrorInfo);
        console.error("发消息失败:" + err.ErrorInfo);
    });
}

//隐藏留言文本框
function hideDiscussForm() {
    //$(".video-discuss-form").hide();
}
//显示留言文本框
function showDiscussForm() {
    //$(".video-discuss-form").show();
}
//隐藏留言工具栏
function hideDiscussTool() {
    //$(".video-discuss-tool").hide();
}
//显示留言工具栏
function showDiscussTool() {
    //$(".video-discuss-tool").show();
}
//隐藏表情框
function hideDiscussEmotion() {
    //$(".video-discuss-emotion").hide();
    ////$(".video-discuss-emotion").fadeOut("slow");
}
//显示表情框
function showDiscussEmotion() {
    //$(".video-discuss-emotion").show();
    //$(".video-discuss-emotion").fadeIn("slow");

}
//展示点赞动画
function showLoveMsgAnimation() {
    //点赞数加1
    // var loveCount = $('#user-icon-like').html();
    // $('#user-icon-like').html(parseInt(loveCount) + 1);
    // var toolDiv = document.getElementById("video-discuss-tool");
    // var loveSpan = document.createElement("span");
    // var colorList = ['red', 'green', 'blue'];
    // var max = colorList.length - 1;
    // var min = 0;
    // var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
    // var color = colorList[index];
    // loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
    // toolDiv.appendChild(loveSpan);
}

//初始化表情
function initEmotionUL() {
    return;
    for (var index in webim.Emotions) {
        var emotions = $('<img>').attr({
            "id": webim.Emotions[index][0],
            "src": webim.Emotions[index][1],
            "style": "cursor:pointer;"
        }).click(function () {
            selectEmotionImg(this);
        });
        $('<li>').append(emotions).appendTo($('#emotionUL'));
    }
}

//打开或显示表情
function showEmotionDialog() {
    if (openEmotionFlag) {//如果已经打开
        openEmotionFlag = false;
        hideDiscussEmotion();//关闭
    } else {//如果未打开
        openEmotionFlag = true;
        showDiscussEmotion();//打开
    }
}
//选中表情
function selectEmotionImg(selImg) {
    $("#send_msg_text").val($("#send_msg_text").val() + selImg.id);
}

//登出
function logout() {
    //登出
    webim.logout(
        function (resp) {
          webim.Log.info('登出成功');
          if (loginInfo) {
            loginInfo.identifier = null;
            loginInfo.userSig = null;
          }          
        }
    );
}

function delChat(uid, callbak) {
  // sess_type == 'C2C' ? 1 : 2;
  var data = {
    'To_Account': '' + uid,
    'chatType': 1
  }
  webim.deleteChat(
    data,
    function (resp) {
      if (resp.ActionStatus == 'OK') {
        var app = getApp()
        for (var i = 0; i < app.globalData.imSessionList.length; i++) {
          if (app.globalData.imSessionList[i].id == uid) {
            app.globalData.imSessionList.splice(i, 1)
            break
          }
        }
        var flag = false
        for (var i = 0; i < app.imData.imDetailArray.length; i++) {
          if (app.imData.imDetailArray[i].id == uid) {
            app.imData.imDetailArray.splice(i, 1)
            break
          }
        }

        // 删除缓存数据
        if (callbak) {
          callbak(true)
        }
      } else {
        if (callbak) {
          callbak(false)
        }
      }
    },
    function (e) {
      // console.log('不知道发生了什么', e)
    }
    
  );
}

module.exports = {
    onMsgNotify : onMsgNotify,
    handlderMsg : handlderMsg,
    sdkLogin : sdkLogin,
    showMsg : showMsg,
    convertMsgToObject: convertMsgToObject,
    convertMsgtoHtml : convertMsgtoHtml,
    convertTextMsgToHtml : convertTextMsgToHtml,
    convertFaceMsgToHtml : convertFaceMsgToHtml,
    convertImageMsgToHtml : convertImageMsgToHtml,
    convertSoundMsgToHtml : convertSoundMsgToHtml,
    convertFileMsgToHtml : convertFileMsgToHtml,
    convertLocationMsgToHtml : convertLocationMsgToHtml,
    convertCustomMsgToHtml : convertCustomMsgToHtml,
    imageClick : imageClick,
    onChangePlayAudio : onChangePlayAudio,
    smsPicClick : smsPicClick,
    onSendMsg : onSendMsg,
    hideDiscussForm : hideDiscussForm,
    showDiscussForm : showDiscussForm,
    hideDiscussTool : hideDiscussTool,
    showDiscussTool : showDiscussTool,
    hideDiscussEmotion : hideDiscussEmotion,
    showDiscussEmotion : showDiscussEmotion,
    showLoveMsgAnimation : showLoveMsgAnimation,
    initEmotionUL : initEmotionUL,
    showEmotionDialog : showEmotionDialog,
    selectEmotionImg : selectEmotionImg,
    logout : logout,
    addMsg: addMsg,
    sendOk: sendOk,
    sendError: sendError,
    delChat: delChat
};