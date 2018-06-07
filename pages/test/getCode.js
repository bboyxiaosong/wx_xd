var UTIL = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authCode: '',
    mobileAvailable: false,
    mobile: '',
    counting: false,
    errMessage: '',
    showErrMessage: false,
    btnCode: '获取验证码',
    infoDone: false,
    codeSendClicked: false,
    startDate: '',
    endDate: '',
    minute:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (self) {
    var date1 = UTIL.formatStartTime(new Date());
    var date2 = UTIL.formatEndTime(new Date());
    var date3 = UTIL.formatMinute(new Date());
    var startDate = this.data.startDate;
    var endDate = this.data.endDate;
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      startDate: date1,
      endDate: date2,
      minute:date3
    });  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    UTIL.checkAuth(app)
    app.globalData.isClicked = false
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.share
  },

  mobileInput: function (e) {
    var mobile = e.detail.value
    this.data.mobile = mobile
    var mobileAvailable = UTIL.checkMobile(mobile)
    if ('' == mobile) {
      this.setData({
        showErrMessage: true,
        errMessage: '手机号不能为空'
      })
    }
    else if (!mobileAvailable) {
      this.setData({
        showErrMessage: true,
        errMessage: '手机号格式不正确'
      })

    }
    else {
      this.setData({
        showErrMessage: false,
        errMessage: '',
        mobileAvailable: true
      })
    }

    this.checkInformationDone()
  },

  getCode: function (e) {
    var self = this
    if (self.data.codeSendClicked) {
      return
    }
    self.data.codeSendClicked = true

    if (this.data.mobileAvailable) {
      var count = 60;
      var interval = setInterval(function () {
        console.log(self.data.mobile)
        if (count == 0) {
          self.data.codeSendClicked = false
          clearInterval(interval);
          self.setData({
            btnCode: '发送验证码'
          })
        }
        else {
          var msg = count-- + '秒后重新发送'
          self.setData({
            btnCode: msg
          })
        }
      }, 1000)

      // NETWORK.GET({
      //   url: API.generateCode,
      //   params: {
      //     mobileNumber: self.data.mobile
      //   },
      //   success: function (result) {
      //     if (result.statusCode != 200) {
      //       self.setData({
      //         showErrMessage: true,
      //         errMessage: '验证码发送失败'
      //       })
      //     }
      //     else {
      //       self.setData({
      //         showErrMessage: false,
      //         errMessage: ''
      //       })
      //     }
      //   },
      //   fail: function (result) {
      //     self.setData({
      //       showErrMessage: true,
      //       errMessage: '验证码发送失败'
      //     })
      //   }
      // })
    }
    else {
      if ('' == this.data.mobile) {
        this.setData({
          showErrMessage: true,
          errMessage: '手机号不能为空'
        })
      }
      else if (!this.data.mobileAvailable) {
        this.setData({
          showErrMessage: true,
          errMessage: '手机号格式不正确'
        })

      }
      else {
        this.setData({
          showErrMessage: false,
          errMessage: '',
          mobileAvailable: true
        })
      }

      self.data.codeSendClicked = false
    }
  },

  codeInput: function (e) {
    this.data.authCode = e.detail.value
    this.checkInformationDone()
  },

  checkInformationDone: function () {
    this.setData({
      infoDone: this.data.mobileAvailable && '' != this.data.authCode
    })
  },

  saveBind: function () {
    var self = this;
    var infoDone = self.data.infoDone
    console.log(this.data.authCode +this.data.mobile)
    if (app.globalData.isClicked) {
      return;
    }
    
    app.globalData.isClicked = true

    // NETWORK.POST({
    //   url: API.bindMobile,
    //   params: {
    //     mobileNumber: this.data.mobile,
    //     code: this.data.authCode,
    //     token: app.globalData.user.token
    //   },
    //   success: function (result) {
    //     if (result.data.ret == 200) {
    //       UTIL.alert('绑定成功', function () {
    //         app.globalData.user.mobileNumber = self.data.mobile
    //         wx.reLaunch({
    //           url: './setUp',
    //           fail: function () {
    //             app.globalData.isClicked = false
    //           }
    //         })
    //       })
    //     }
    //     else {
    //       UTIL.alert(result.data.msg)
    //       app.globalData.isClicked = false
    //     }
    //   },
    //   fail: function (result) {
    //     app.globalData.isClicked = false
    //   }
    // })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})