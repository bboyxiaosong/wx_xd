// pages/mine/hotelTab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    currentTab: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    winHeight: 1000,
    flag: false,
    targeLeftArr:[80,266,453,643],
    targeLeft:80

  },
  clickTab: function (e) {
    let id = parseInt(e.currentTarget.dataset.id);
    let targeLeft = this.data.targeLeftArr[id];
    this.setData({
      status: id,
      currentTab: id,
      targeLeft: targeLeft
    })
  },
  swiperChange: function (e) {
    let len = e.detail.current;
    let targeLeft = this.data.targeLeftArr[len];
    if (e.detail.current == 0) {
      this.setData({
        status: len,
        targeLeft: targeLeft,
        winHeight: 1100
      })
    }
    if (e.detail.current == 1) {
      this.setData({
        status: len,
        targeLeft: targeLeft,
        winHeight: 1100
      })
    }
    if (e.detail.current == 2) {
      this.setData({
        status: len,
        targeLeft: targeLeft,
        winHeight: 3500
      })
    } 
    if (e.detail.current == 3)  {
      this.setData({
        status: len,
        targeLeft: targeLeft,
        winHeight: 1700
      })
    }
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