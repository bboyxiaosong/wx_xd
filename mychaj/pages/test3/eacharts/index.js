var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var self = this;
    self.initEacharts();
  },
  initEacharts(){
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
  }

});