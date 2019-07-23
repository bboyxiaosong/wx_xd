var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;
    //self.initEacharts();


    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../../image/qrcode.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../../image/qrbg.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });


    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')
      // ctx.setFillStyle('#fff')
      // ctx.fillRect(0, 0, 545, 3001)//
      //主要就是计算好各个图文的位置
      ctx.drawImage('../../../' + res[0].path, 158, 190, 210, 210)

      ctx.drawImage('../../../' + res[1].path, 0, 0, 545, 771)

      // 

      // 

      ctx.setTextAlign('center')
      ctx.setFillStyle('#000')
      ctx.setFontSize(22)
      ctx.fillText('分享文字描述1', 545 / 2, 130)
      ctx.fillText('分享文字描述2', 545 / 2, 160)

      ctx.stroke()
      ctx.draw()
    })
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },

  /**
   * 生成分享图
  */
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 保存到相册
  */
  save: function () {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    console.log('1')
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.setData({
                hidden: true
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res);
        if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
          wx.showModal({
            title: '保存图片失败',
            content: '您已取消保存图片到相册！',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
            complete: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.openSetting({})      //打开小程序设置页面，可以设置权限
              } else {
                wx.showModal({
                  title: '保存图片失败',
                  content: '您已取消保存图片到相册！',
                  showCancel: false
                });
              }
            }
          });
        }
      }


    })

  },
  initEacharts() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      console.log(res)
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [
        {
          name: '成交量1',
          data: 15,
          color: '#ff7f02',
        }, {
          name: '成交量2',
          data: 35,
        }, {
          name: '成交量3',
          data: 78,
        }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
      drawWhiteLine: true,
      whiteLineCount: 1,
      legend: false,
      dataLabel: true
    });
  },
  cicleCtrl() {
    const ctx = wx.createCanvasContext('shareImg')
    var array = [20, 30, 40];
    var colors = ["#ff0000", "#ffff00", "#0000ff"];
    var total = 0;// 计算问题   
    for (var index = 0; index < array.length; index++) {
      total += array[index];
    }//    定义圆心坐标
    var point = { x: 100, y: 100 };//    定义半径大小
    var radius = 60;/*    循环遍历所有的pie */
    for (let i = 0; i < array.length; i++) {
      ctx.beginPath();//        起点弧度
      var start = 0; if (i > 0) {
        //计算开始弧度是前几项的总和，即从之前的基础的上继续作画
        for (let j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      console.log("i:" + i);
      console.log("start:" + start);
      //1.先做第一个pie
      //2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，
      //第3参数为半径，第
      //4参数起始旋转弧度数，
      //第5参数本次扫过的弧度数
      //第6个参数为时针方向-false为顺时针
      ctx.arc(point.x, point.y, radius, start, array[i] / total * 2 * Math.PI, false);

      //      3.连线回圆心
      ctx.lineTo(point.x, point.y);//      4.填充样式
      ctx.setFillStyle(colors[i]);//      5.填充动作
      ctx.fill();
      ctx.closePath();

    }
  }

})