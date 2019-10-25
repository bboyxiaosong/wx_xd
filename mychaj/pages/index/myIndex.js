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
      { url: 'https://images8.hunli.baihe.com/topic/m/bhhlw/pic06.jpg' },
      { url: 'https://images8.hunli.baihe.com/topic/m/bhhlw/pic02.jpg' },
      { url: 'https://images8.hunli.baihe.com/topic/m/bhhlw/pic03.jpg' },
      { url: 'https://images8.hunli.baihe.com/topic/m/bhhlw/pic04.jpg' }
    ] ,
    dataArr:[
      '第1名获取10元现金',
      '第2名获取20元现金',
      '第3名获取30元现金',
      '第4名获取40元现金',
      '第5名获取50元现金',
      '第6名获取60元现金',
      '第7名获取70元现金',
    ],
    t:'',
    num: 0
  },
  sureRadioCtrl(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({
        num:this.data.dataArr.length
      })

   
  },
  /* 生命周期函数--监听页面显示
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
  swiperGtCtrl(num) {
    var self = this;
    var i = 100;
    var k = num - 3;
    var dataArr = self.data.dataArr;
    var t = setInterval(function () {
     i=  i-50;
      self.setData({
        bottom: i
      });
      
      // console.log(self.data.dataArr)
      let top = Math.abs(self.data.bottom)
      let first = dataArr.slice(0, 1)[0];

      console.log(first)
      dataArr.push(first);

      console.log(dataArr)

      if (top > 100){
        

        

        self.setData({
          bottom: 0,
          
        });
      }
     

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