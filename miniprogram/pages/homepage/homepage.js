// miniprogram/pages/homepage/homepage.js

import {
  callFunction,
  getInfoByOrder,
  getInforWhere,
  showToast
} from "../../utils/toll";
const app = getApp()

Page({
  data: {
    swiperImgNo: 1,
    imgSwiperUrl: '',
    fruitInfo: [],
    typeCat: [{
        id: 0,
        name: "全部种类"
      },
      {
        id: 1,
        name: "营养价值"
      },
      {
        id: 2,
        name: "新鲜上架"
      },
      {
        id: 3,
        name: "店主推荐"
      },
    ],
    activeTypeId: 0,
    isShow: true,
    openid: '',
    offLine: null //是否维护
  },

  // 获取用户openid
  getOpenid() {
    callFunction('add').then(res => {
      this.setData({
        openid: res.result.openId
      })
    })

  },

  // 商品加入购物车
  addCartByHome: function (e) {
    // 获取商品 _id
    const _id = e.currentTarget.dataset._id;
    getInforWhere('fruit-board', {
      _id
    }).then(res => {
      // 获取到新添数据
      let newItem = res.data[0];
      newItem.num = 1;
      // 根据判断给出提示信息
      let title = app.isRepet(newItem) ? "已存在!" : "添加成功";
      showToast({
        title
      });
    });
  },


  // 分类展示切换
  typeSwitch: function (e) {
    getCurrentPages()["0"].setData({
      activeTypeId: parseInt(e.currentTarget.id)
    })
    const rule = ['time', 'time', 'time', 'time'];
    getInfoByOrder("fruit-board", rule[e.currentTarget.id], "desc").then(res => {
      console.log(res.data);
      getCurrentPages()["0"].setData({
        fruitInfo: res.data
      })
    })
  },


  // ---------点击跳转至详情页面-------------
  tapToDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?_id=' + e.currentTarget.dataset.fid,
    })
  },


  // ------------生命周期函数------------
  onLoad: function (options) {
    showToast({
      title: "猕猴桃大军来袭!"
    })
    this.setData({
      isShow: false
    })
    this.getOpenid();
  },

  onReady: function () {
    // console.log(getCurrentPages()["0"].data)
  },

  onShow: function () {
    getInfoByOrder('fruit-board', 'time', 'desc')
      .then(res => {
        getCurrentPages()["0"].setData({
          fruitInfo: res.data,
          isShow: true
        })
        // wx.hideLoading()
      })

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {
    return {
      title: '猕猴桃园',
      imageUrl: '../../images/icon/fruit.jpg',
      path: '/pages/homepage/homepage'
    }
  }

})