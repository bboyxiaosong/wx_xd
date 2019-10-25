// var chart = require('../../../utils/f2.js');

import F2 from '@antv/wx-f2'
let chart = null;

function initChart(canvas, width, height, F2,data) {
  var data = [
    {
    name: '消费1',
    y: 80,
    const: 'const'
    },
   {
    name: '消费2',
    y: 70,
    const: 'const'
    },
    {
      name: '消费3',
      y: 30,
      const: 'const'
    }
  
  ];
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

  chart.interval().position('const*y').color('name', [ '#2FC25B', '#FACC14', '#F04864']).adjust('stack');
  chart.render();
  return chart;
}

Page({
  
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
  },
  onShow(){
    // console.log(F2)
  }
});
