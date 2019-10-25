// pages/test3/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ["list0", "list1", "list2", "list3", "list4", "list5", "list11", "list12", "list13", "list14", "list15", "list25", "list26", "list27", "list28", "list29", "list30"],
    toView: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickScroll: function (e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      toView: id
    })
    console.log(e.currentTarget.dataset);
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