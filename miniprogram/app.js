//app.js
import {
  showToast
} from './utils/toll.js'
App({
  onLaunch: function () {
    // 初始化 云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'kiwifruit-2gduq14a1ae36bde',
        traceUser: true,
      })
    }

    this.globalData = {
      cloudRoot: "kiwifruit-2gduq14a1ae36bde/",
      carts: [], //购物车
      tmpNum: 0,
      tempFilePaths: "",
      admin: ["Sanguine"],
      openId: null,
      appid: 'wx1fe6ff51173e8e8c',
      mch_id: '', // 商户号
      apikey: '',
      offLine: false,
    }
  },



  // 判断购物车中是否有重复后添加购物车
  isRepet: function (item) {
    let flag = false;
    this.globalData.carts.forEach(v => {
      if (v._id === item._id) flag = true;
    })
    flag ? "" : this.globalData.carts.push(item);
    return flag;
  },


  // 选择本地图片上传至云端
  selectImgUpToC: function (imgName, tmpUrlCallback) {
    const self = this
    // 获取图片临时地址
    new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          resolve(res.tempFilePaths["0"])
        }
      })
    }).then(e => self.upToClound("imgSwiper", imgName, e, tmpUrlCallback))
  },

  // 上传图片到云端（云端文件夹，云端文件名，文件临时地址）
  upToClound: (imgFolder, imgName, myFilePath, fileIDCallback) => {
    wx.cloud.uploadFile({
      cloudPath: imgFolder + "/" + imgName, // 上传至云端的路径
      filePath: myFilePath, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        wx.showToast({
          title: '图片已上传',
        })
        fileIDCallback(res.fileID)

      },
      fail: console.error
    })
  },

  // 获取云端文件tmpUrl
  getTmpUrl: (imgFolder, imgName, currentData) => {
    wx.cloud.getTempFileURL({
      fileList: [getApp().globalData.cloudRoot + imgFolder + "/" + imgName],
      success: res => {
        getCurrentPages().setData({
          currentData: res.fileList["0"].tempFileURL
        })
      },
      fail: console.error
    })
  }
})