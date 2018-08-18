import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '转让笔数趋势图',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['T日', 'T-1日', 'T-7日'],
      top: 35,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'T日',
      type: 'line',
      smooth: true,
      data: [1, 3, 18, 36, 65, 30]
    }, {
      name: 'T-1日',
      type: 'line',
      smooth: true,
      data: [2, 3, 5, 12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'T-7日',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 10,
    succRate : 72.92,
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh");
    // wx.showToast({
    //   title: 'Loading',
    //   icon: 'loading',
    //   duration: 500
    // })
    var tc = this.data.totalCount;
    tc = tc + Math.round(Math.random()*10);
    this.setData({
      totalCount: tc
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  refresh: function() {
    console.log(new Date())
    this.setData({
      totalCount: 30
    })
  },
  goTest: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  }
})