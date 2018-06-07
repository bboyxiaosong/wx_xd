// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 100,
    all:280,
    _height:80,
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      // { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      // { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      // { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ] ,
    t:'',
    num:0
  },
  sureRadioCtrl(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var i = self.data.num;
    if(i >3){
      this.swiperGtCtrl(i)
    }
    if (i <= 3) {
      this.swiperLtCtrl(i)
    }
  },
  swiperGtCtrl(num) {
    var self = this;
    var i = 100;
    var k = num - 3
    var t = setInterval(function () {
     i=  i-50;
      self.setData({
        bottom: i
      });
      if (i <= (-k*50)){
        clearInterval(t)
      }
    }, 1000)
    self.setData({
      t: t
    })
  },
  swiperLtCtrl(num) {
    var self = this;
    var i = 100;
    var k = num -3;
    if(num == 1){
     k = 100
    }
    if (num == 2) {
      k = 50
    }
    if (num == 3) {
      k = 0
    }
    var t = setInterval(function () {
      self.setData({
        bottom: i
      });
      i=i-50;
      if (i < k) {
        clearInterval(t)
      }
    }, 1000)
    self.setData({
      t:t
    })
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
    var num = this.data.num;
    if(num == 0){
      var t = this.data.t;
      clearInterval(t)
    }
    if (num > 3) {
      this.swiperGtCtrl(num)
    }
    if (num <= 3) {
      this.swiperLtCtrl(num)
    }
  
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