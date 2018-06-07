// pages/test5/test5.js
var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var baseHeight;       //上一次触摸完之后的高  
var baseWidth;        //上一次触摸完之后的宽  
var windowWidth = 0;  //咱们屏幕的宽  
var windowHeight = 0; //咱们屏幕的高  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    olddistance:0,//上一次两个手指的距离
    newdistance: "",//本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
    diffdistance: '', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
    Scale: 1,//图片放大的比例，
    baseHeight: 400,       //原始高  
    baseWidth: 400,        //原始宽  
    oldscaleA:'',
    src:'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
  
  },
  imgload: function (e) {
    var originalWidth = e.detail.width;//图片原始宽  
    var originalHeight = e.detail.height;//图片原始高  
    var originalScale = originalHeight / originalWidth;//图片高宽比  
    var windowscale = windowHeight / windowWidth;//屏幕高宽比  
    if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
      //图片缩放后的宽为屏幕宽  
      baseWidth = windowWidth;

      baseHeight = (windowWidth * originalHeight) / originalWidth;
    } else {//图片高宽比大于屏幕高宽比  
      //图片缩放后的高为屏幕高  
      baseHeight = windowHeight;
      baseWidth = (windowHeight * originalWidth) / originalHeight;
    }
  },
  //手指在屏幕上移动
  scroll: function (e) {
    var _this = this;
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {//两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离

      // console.log(xMove,"xMove")
      // console.log(yMove, "yMove")
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离  
      if (_this.data.olddistance == 0) {
        _this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        // console.log("第一次");
      } else {
        _this.data.newdistance = distance; //第二次就可以计算它们的差值了  
        _this.data.diffdistance = _this.data.newdistance - _this.data.olddistance;//两次差值
        _this.data.olddistance = _this.data.newdistance; //计算之后更新比例  
        _this.data.Scale = _this.data.oldscaleA + 0.005 * _this.data.diffdistance;//这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验

        console.log(_this.data.newdistance );
        console.log(_this.data.diffdistance )
        console.log(_this.data.olddistance)
        console.log(_this.data.Scale)
        // _this.setData({
        //   newdistance: distance,
        //   diffdistance: _this.data.newdistance - _this.data.olddistance,
        //   olddistance: _this.data.newdistance,
        //   Scale: _this.data.oldscaleA + 0.005 * _this.data.diffdistance
        // })

        if (_this.data.Scale > 2.5) {//放大的最大倍数
          return;
        } else if (_this.data.Scale < 1) {//缩小不能小于当前
          return;
        }
        //刷新.wxml ，每次相乘，都是乘以图片的显示宽高
        _this.setData({
          height: _this.data.baseHeight * _this.data.Scale,
          width: _this.data.baseWidth * _this.data.Scale,
          // oldscaleA: _this.data.Scale
        })
        _this.data.oldscaleA = _this.data.Scale;//更新比例 


      }
    }
  },
  //手指离开屏幕
  endTou: function (e) {
    this.data.olddistance = 0;//重置
    // this.getRect();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.chooseImage({
      count: 12,
      sizeType: ['original'],
      success: function (res) {
        console.log(res.tempFilePaths[0])
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            //console.log(res.width);
            //console.log(res.height);
            var str = res.width / res.height;//图片的宽高比
            if (str > 1) {//横版图片
              _this.data.height = 400;//图片的显示高度为400
              _this.data.width = str * _this.data.height; //图片的宽度 = 宽高比 * 图片的显示高度
              _this.setData({
                width: str * _this.data.width,
                height: 400
              })

            } else {//竖版图片
              _this.data.width = 400;//图片的显示宽度为400
              _this.data.height = str * _this.data.width; //图片的高度 = 宽高比 * 图片的显示宽度
              _this.setData({
                width: 400,
                height : str * _this.data.width
              })
            }
          }
        });
        _this.setData({
          src: res.tempFilePaths[0],
        })
      }
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