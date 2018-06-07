// pages/test2/test2.js
var UTIL = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    flag:false
  },
  nextBtCtrl(e){
    var self = this;
    if (!UTIL.checkMobile(self.data.mobile)) {
      UTIL.showToast('请输入正确的手机号码');
      return
    }
    console.log()
    wx.navigateTo({
      url: './telNum',
      fail: function () {
      }
    })
    
  },
  getMobile(e){
    var self = this;
    var mobile = e.detail.value
    if (!UTIL.checkMobile(mobile)) {
      // UTIL.showToast('请输入正确的手机号码');
      self.setData({
        flag: false
      })
    }
    if (UTIL.checkMobile(mobile)) {
      self.setData({
        flag:true
      })
    }
    self.data.mobile = mobile;
   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})