//index.js
//获取应用实例
const app = getApp()
var page = 1;
var size = 20;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    hidden: true,
    searchKeyword: null, //需要搜索的字符
  },
  //输入框事件，每输入一个字符，就会触发一次
  bindKeywordInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  //点击搜索按钮，触发事件
  keywordSearch: function(e) {
    var that = this;
    if (that.data.searchKeyword == '') {
      wx.showToast({
        title: '请输入信息',
      });
    } else {
      var that = this;
      wx.showLoading({
        title: '正在获取...',
      });
      wx.request({
        url: 'https://apicloud.mob.com/v1/cook/menu/search?key=28ae771da3591&page=' + page + "&size=" + size + "&name=" + that.data.searchKeyword,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          if (res.data.retCode == "200") {
            that.setData({
              list: res.data.result.list,
              hidden: true
            });
          } else {
            that.setData({
              hidden: false
            });
            wx.showToast({
              title: res.data.msg
            })
          }
        }
      });
    }
  },
  detail(event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '正在获取...',
    });
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/menu/search?key=28ae771da3591&page=' + page + "&size=" + size,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.retCode == "200") {
          that.setData({
            list: res.data.result.list,
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
      url: 'https://apicloud.mob.com/v1/cook/menu/search?key=28ae771da3591&page=' + page + "&size=" + size,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.stopPullDownRefresh();
        that.setData({
          list: res.data.result.list
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page = page + 1;
    var that = this;
    that.setData({
      searchLoading: true //把"上拉加载"的变量设为false，显示
    });
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/menu/search?key=28ae771da3591&page=' + page + "&size=" + size,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.retCode == "200") {
          setTimeout(function() {
            that.setData({
              list: res.data.result.list,
              searchLoading: false //把"上拉加载"的变量设为false，显示
            });
          }, 2000);
        } else {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示
            searchLoading: false //把"上拉加载"的变量设为false，隐藏
          });

        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  top(event) {
    // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})