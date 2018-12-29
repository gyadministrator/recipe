const app = getApp();
var id = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    list: null,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    id = options.id;
    var that = this;
    wx.showLoading({
      title: '正在获取...',
    });
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/menu/query?key=28ae771da3591&id=' + options.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.retCode == "200") {
          wx.hideLoading();
          that.setData({
            data: res.data.result.recipe,
            list: JSON.parse(res.data.result.recipe.method),
            hidden: true
          });
        } else {
          that.setData({
            hidden: false
          });
        }
      }
    });
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
    var that = this;
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/menu/query?key=28ae771da3591&id=' + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.stopPullDownRefresh();
        if (res.data.retCode == "200") {
          that.setData({
            data: res.data.result.recipe,
            list: JSON.parse(res.data.result.recipe.method),
            hidden: true
          });
        } else {
          that.setData({
            hidden: false
          });
        }
      }
    });
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

  }
})