// pages/index/swiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    data: [
      { 
        'picSrc': 'https://public.baihe.com/hunli//2019/06/20/1561019287.png', 
        'videoSrc': 'https://hunli-1255482171.file.myqcloud.com/event/5%E4%B9%90%E7%BE%8E.mp4',           
        'downNum':'212312'
      },
      {
        'picSrc':"https://public.baihe.com/hunli//2019/06/20/1561019103.png",
        'videoSrc': 'https://hunli-1255482171.file.myqcloud.com/event/5%E4%B9%90%E7%BE%8E.mp4',
        'downNum': '22312'
      },
      {
        'picSrc': "https://public.baihe.com/hunli//2019/06/20/1561019027.png",
        'videoSrc':'https://hunli-1255482171.file.myqcloud.com/event/5%E4%B9%90%E7%BE%8E.mp4',
        'downNum': '2212'
      }
    ],
    is6: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindChange(e) {
    this.setData({ current: e.detail.current })
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