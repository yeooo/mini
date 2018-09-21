//引入本地json数据，这里引入的就是第一步定义的json数据
const userInfo = require('../../data/userInfo.js');
const app = getApp();
Page({
  data: {
    // tab切换  
    currentTab: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    foodInfo: [],
    //所有图片的高度
    swiperHeights: [],
  },
  // 生命周期函数--监听页面加载
  onLoad() {
    this.getUserData();
    this.getFoodData();
    wx.setNavigationBarTitle({
      title: this.data.userInfo.nickName
    });
  },
  onPullDownRefresh: function () {
    this.getUserData();
  },
  getUserData() {
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl + '/users/userInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        let data = res.data;
        if (data.status == '0') {
          _this.setData({
            userInfo: data.result
          });
        }
      }
    })
  },
  getFoodData() {
    let _this = this;
    wx.request({
      url: app.globalData.apiUrl + '/users/foodDataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        pageIndex: 1,
        pageSize: 10
      },
      method: "POST",
      success: function (res) {
        let data = res.data;
        if (data.status == '0') {
          _this.setData({
            foodInfo: data.result
          });
          _this.initHeight(3);
        }
      }
    });
    console.log(this.foodInfo);
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  initHeight(num) {
    let self = this;
    let imgheights = this.data.swiperHeights;
    let query = wx.createSelectorQuery();
    for (let i = 0; i < num; i++) {
      query.select('#swiper-item' + i).boundingClientRect(function (res) {
        imgheights[i] = res.height;
        self.setData({
          swiperHeights: imgheights
        });
      }).exec();
    }
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})