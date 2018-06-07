var UTIL = require('./util.js')

var requestHandler = {
  url: '',
  params: {},
  success: function (res) {
    // success  
  },
  fail: function () {
    // fail  
  },
}

//GET请求  
function GET(requestHandler) {
  request('GET', requestHandler, { "Content-Type": "application/json" })
}
//POST请求  
function POST(requestHandler) {
  request('POST', requestHandler, { "Content-Type": "application/x-www-form-urlencoded" })
}

function request(method, requestHandler, header) {
  //注意：可以对params加密等处理  
  var _url = requestHandler.url;
  var params = requestHandler.params;

  wx.request({
    url: _url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    header: header, // 设置请求的 header  
    success: function (res) {
      var isForbidden = false
      if (res.statusCode == 403) {
        isForbidden = true
        UTIL.alert('用户在其他手机登录', function () {
          getApp().logout(function () {
            getApp().globalData.unCompleteUser = null
          })
        })
      }

      else if (res.statusCode == 200 && res.data.ret == 500) {
        if (res.data.code == 10020 || res.data.code == 10022) {
          console.log(res.data.msg)
          isForbidden = true
          UTIL.alert(res.data.msg, function () {
            getApp().logout(function () {
              getApp().globalData.unCompleteUser = null
            })
          })
        }
      }

      requestHandler.success(res, isForbidden)
    },
    fail: function () {
      requestHandler.fail()
    },
    complete: function () {
      // complete  
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}  