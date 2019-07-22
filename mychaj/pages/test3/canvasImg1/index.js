
const ImageCreator = require('../../../utils/imageCreator_1.js').default;
const {baseConfig} = require("./../../../utils/base.config.js")
// pages/test3/canvasImg1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setState: function(data) {
    this.setData(data)
  },
  createIamge: function() {
    console.log('this.canvas', baseConfig())
    this.canvas = new ImageCreator(this,baseConfig())
   
    this.canvas.draw().then((res) => {
      console.log('res', res)
    })
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