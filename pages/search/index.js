// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  tmpData:{
    k:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  search:function(e){
    var k = e.detail.value
    console.log(`will search for ${k}`)
  },

  clearSearch:function(e){
    if(this.tmpData.k){
      this.setData({
        k:''
      })
    }

  },
  sBlur:function(e){
    this.tmpData['k'] = e.detail.value
  }
})