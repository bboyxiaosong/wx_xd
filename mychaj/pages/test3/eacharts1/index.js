var chart = require('../../../utils/f2.js');


// let chart = null;

function initChart(canvas, width, height, F2) {
  var data = [{
    name: '其他消费',
    y: 6371664,
    const: 'const'
  }, {
    name: '生活用品',
    y: 7216301,
    const: 'const'
  }, {
    name: '通讯物流',
    y: 1500621,
    const: 'const'
  }, {
    name: '交通出行',
    y: 586622,
    const: 'const'
  }, {
    name: '饮食',
    y: 900000,
    const: 'const'
  }];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });
  chart.source(data);
  chart.legend({
    position: 'right',
    itemFormatter(val) {
      return val + '  ' + map[val];
    }
  });

  chart.pieLabel({
    sidePadding: 40,
    label1: function label1(data, color) {
      return {
        text: data.name,
        fill: color
      };
    },
    label2: function label2(data) {
      return {
        text: '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        fill: '#808080',
        fontWeight: 'bold'
      };
    }
  });

  // 
  chart.source(data);
  chart.coord('polar', {
    transposed: true,
    radius: 0.75
  });
  chart.legend(false);
  chart.axis(false);
  chart.tooltip(false);
  // 

  chart.interval().position('const*y').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
  chart.render();
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'F2 微信小程序图表组件，你值得拥有~',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
