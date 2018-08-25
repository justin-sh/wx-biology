import * as echarts from '../../ec-canvas/echarts';
const util = require('../../utils/util.js')

const app = getApp();

Page({
  data: {
    xInterval: 5,
    xLabelInterval: 59,
    totalCount: '-',
    succRate: '-',
    ec: {
      lazyLoad: true,
    },
    // pullCnt:0
  },

  onReady: function() {
    this.ec = this.selectComponent('#mychart-dom-line');
    this.refreshData({
      first: true
    });
  },

  onPullDownRefresh: function() {
    // this.setData({
    //   pullCnt: this.data.pullCnt+1
    // })
    wx.stopPullDownRefresh();
    this.refreshData()
  },

  onShareAppMessage: function (res) {
    return {
      title: '陆投小帮手',
      path: '/pages/home/index',
      success: function () { },
      fail: function () { }
    }
  },

  goTest: function() {
    // wx.navigateTo({
    //   url: '../index/index',
    // })
    wx.startPullDownRefresh()
    console.log(this.chart)
    this.refreshData();
  },

  refreshData: function(opt) {
    wx.showLoading({
      mask: true
    })
    opt = opt || {}
    let first = opt.first || false;
    let that = this;
    wx.request({
      url: `${app.globalData.host}/amz/lu/product-count?first=${first}&_=${+new Date}`,
      success: function(d) {
        // console.log(d)
        d.ok = d.statusCode === 200;
        if (d.ok) {
          that.setData({
            totalCount: d.data.totalCount,
            succRate: Math.round(d.data.successRate[0].avgSuccessRatio * 10000) / 100,
          })
          if (first) {
            that.initChart({
              data: d.data
            })
          } else {
            that.updateChart({
              data: d.data
            });
          }
        }

        if (typeof opt.success === 'function') {
          opt.success(d)
        }
      },
      complete: function() {
        wx.hideLoading()
        if (typeof opt.complete === 'function') {
          opt.complete();
        }
      }
    })
  },

  initChart: function(res) {
    this.ec.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      var xData = [];
      let d = new Date(2018, 1, 1);
      let t = d.getTime();
      for (let i = 0; i <= 24 * 60; i = i + this.data.xInterval) {
        d.setTime(t+i*60*1000);
        xData.push(util.formatHm(d))
      }

      var option = {
        title: {
          text: '转让笔数趋势图',
          left: 'center'
        },
        legend: {
          data: ['今天', '昨天', '一周前'],
          top: 35,
          left: 'center',
          z: 100
        },
        grid: {
          bottom: 15,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
          axisLabel: {
            interval: this.data.xLabelInterval,
          }
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          name: '今天',
          type: 'line',
          smooth: true,
          data: this.getValidSeriesData(res.data.d0)
        }, {
          name: '昨天',
          type: 'line',
          smooth: true,
          data: this.getValidSeriesData(res.data.d1)
        }, {
          name: '一周前',
          type: 'line',
          smooth: true,
          data: this.getValidSeriesData(res.data.d7)
        }]
      };
      chart.setOption(option);
      return chart;
    });
  },

  updateChart: function(d) {
    var option = {
      series: [{
        name: '今天',
        data: this.getValidSeriesData(d.data.d0)
      }, {
        name: '昨天',
        data: this.getValidSeriesData(d.data.d1)
      }, {
        name: '一周前',
        data: this.getValidSeriesData(d.data.d7)
      }]
    };

    this.ec.chart.setOption(option);
  },

  getValidSeriesData: function(ds) {
    let r = [];
    for (let x in ds) {
      if (x.endsWith('0') || x.endsWith('5')) {
        r.push(ds[x])
      }
    }
    return r;
  }
})