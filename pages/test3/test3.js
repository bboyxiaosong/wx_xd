// pages/test3/test3.js

var flag = 0;
var classCatch = ['current', 'prev', 'next'];
var animationArr = []
var touch = [];
// 
var dataimg = [
'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',
'http://img.zcool.cn/community/018d4e554967920000019ae9df1533.jpg@900w_1l_2o_100sh.jpg',
'http://img.zcool.cn/community/01b52855dc4b6932f875a13252f0e4.jpg@1280w_1l_2o_100sh.jpg'
  
]
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
    flag:true,
    testClass: classCatch,
    animationArr: animationArr,
    testCurrentNav: 0,
    testNav: [{
      title: '押金险',
      word: '退不了押金？押金险来啦！只要您是在三个月内完成的租房交易，无论是提前退租、损坏家具家电设施、工作地点变动导致的意外退租，均可以享受上限5000元押金退还，申请简便，秒级到账！',
      btTxt: '获取押金险',
      img: '../../image/icons-Insurance-big.png',
      id: 1
    }, {
      title: '微信/芝麻信用/手机认证',
      word: '发布房源必须经过微信/芝麻信用/手机认证，并经过系统+人工筛选核实，合租派权利保障房源真实找到真房源，就在合租派',
      btTxt: '立即认证',
      img: '../../image/icons-tel-pay-big.png',
      id: 2
    }, {
      title: '在线签约',
      word: '合租派为租赁双方提供由专业法务出具的电子版合约，省去打印、签字盖章等复杂流程，看房成功后，手机确认即可生效，可下载保存，不怕丢失！',
      btTxt: '查看合同内容',
      img: '../../image/icons-sign-big.png',
      id: 3
    }
    ],
    classStyle: '',
    scaleWidth: "",
    scaleHeight: "",
    dataimg: 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.swipNext();

    var res = wx.getSystemInfoSync();  //获取系统信息的同步方法，我用了异步里面提示我this.setData错了  
    windowWidth = res.windowWidth;
    windowHeight = res.windowHeight;
    //那就给前面的图片进行赋值，高，宽以及路劲   
    this.setData({
      scaleHeight: windowHeight,
      // dataimg: options.img,
      scaleWidth: windowWidth
    })      
  },
  //这里是图片加载完毕之后的信息，因为滑动手指距离会变，我们要跟着图片的长宽进行缩放，不能跟着屏幕的长宽进行缩放  
  imgload: function (e) {
    console.log('e',e)
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
  //两手指进行拖动了  
  movetap: function (event) {
    var e = event;
    if (e.touches.length == 2) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离   
      if (olddistance == 0) {
        olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        console.log('olddistance', olddistance);
      }
      else {
        newdistance = distance; //第二次就可以计算它们的差值了  
        diffdistance = newdistance - olddistance;
        olddistance = newdistance; //计算之后更新  
        // console.log(diffdistance);
        var newScale = oldscale + 0.005 * diffdistance;  //比例
        console.log()
        console.log('newScale',newScale);
        //刷新.wxml  
        this.setData({
          scaleHeight: newScale * baseHeight,
          scaleWidth: newScale * baseWidth

        })
        oldscale = newScale;
        //更新比例  

      }
    }
  },
  endtap: function (event) {
    console.log("event", event);//抬起手指，保存下数据  
    // if (event.touches.length == 2) {
    //   olddistance = 0;
    // }

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

  },
  touchStart(e) {
    touch[0] = e.changedTouches[0].clientX
  },
  touchMove(e) {
    console.log(e)
  },
  touchEnd(e, navItem) {
    if (e.changedTouches[0].clientX - touch[0] > 0) {
      this.swipPrev(e)
    }
    if (e.changedTouches[0].clientX - touch[0] < 0) {
      this.swipNext(e)
    }
    if (e.changedTouches[0].clientX - touch[0] == 0) {
      if (navItem == 'current') { }
      if (navItem == 'next') { this.swipNext(e) }
      if (navItem == 'prev') { this.swipPrev(e) }
    }
  },
  ctrlClick(e) {
    var navItem = e.currentTarget.dataset.id;
    this.touchEnd(e, navItem)
  },
  // ctrlClick(e) {
  //   var navItem = e.currentTarget.dataset.id;
  //   console.log(navItem)
  // },
  swipNext(e) {
    let leftAnimation = this.data.testClass[2]
    let animationArr = this.data.testClass.slice(0, 2)
    animationArr.unshift(leftAnimation)
    this.setTransition(animationArr)
  },
  swipPrev(e) {
    let leftAnimation = this.data.testClass[0]
    let animationArr = this.data.testClass.slice(1)
    animationArr.push(leftAnimation)
    this.setTransition(animationArr)
  },
  setTransition(animationArr) {
    this.setData({
      testClass: animationArr
    })
  },
  preventD() { },
  closeWindow() {
    this.setData({
      flag: false
    })

  },


})