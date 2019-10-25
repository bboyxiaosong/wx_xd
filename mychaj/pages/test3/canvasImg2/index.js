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
    self.initEacharts();


    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../../image/qrcode.jpg',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    


    Promise.all([
      promise1
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')
      ctx.setFillStyle('#fff')
      ctx.fillRect(0, 0, 545, 771)

      ctx.setFillStyle('#000')
      ctx.setTextAlign('center')
      ctx.setFontSize(24)
      ctx.fillText('@用户昵称 的婚礼预算是：**** 元', 545/2,60)
      // ctx.drawImage('../../../' + res[0].path, 158, 320, 210, 210)

      self.cicleCtrl(ctx)

      ctx.setFillStyle('#ee7664')
      ctx.fillRect(80, 300, 20, 20)
      ctx.setFontSize(20)
      ctx.fillText('预算'+20, 140, 317)


      ctx.setFillStyle('#ee935e')
      ctx.fillRect(220, 300, 20, 20)
      ctx.setFontSize(20)
      ctx.fillText('预算' + 30, 280, 317)

      ctx.setFillStyle('#f3b86a')
      ctx.fillRect(360, 300, 20, 20)
      ctx.setFontSize(20)
      ctx.fillText('预算' + 40, 420, 317)



      ctx.setFillStyle('#000')
      ctx.setFontSize(28)
      ctx.setTextAlign('center')
      ctx.fillText('评价的话：***************************', 545 / 2, 700)

      
      //
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
          name: '预算1',
          data: 15,
          color: '#ee7664',
        }, {
          name: '预算2',
          data: 35,
          color: '#ee935e',
        }, {
          name: '预算3',
          data: 78,
          color: '#f3b86a',
        }],
      width: windowWidth,
      height: 300,
      dataLabel: true,
      drawWhiteLine: true,
      whiteLineCount: 0,
      legend: true,
      dataLabel: true
    });
  },
  cicleCtrl(context) {

    var array = [15, 35, 78];
    var colors = ["#ee7664", "#ee935e", "#f3b86a"];
    var total = 0;
    for (var val = 0; val < array.length; val++) {
      total += array[val];
    }
    var point = { x:260, y: 180 };
    var radius = 100;
    for (var i = 0; i < array.length; i++) {
      context.beginPath();
      var start = 0;
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += array[j] / total * 2 * Math.PI;
        }
      }
      context.arc(point.x, point.y, radius, start, start + array[i] / total * 2 * Math.PI, false);

      


      context.setLineWidth(0)
      context.lineTo(point.x, point.y);
      context.setStrokeStyle('#F5F5F5');
      context.setFillStyle(colors[i]);
      context.fill();
      context.closePath();
      context.stroke();
    }
    // context.strokeStyle = '#999';
    // context.beginPath();
    // context.moveTo(50, 100);
    // context.lineTo(200,100);
    // context.moveTo(200, 100);
    // context.lineTo(210, 110);
    // context.stroke();
  }


})