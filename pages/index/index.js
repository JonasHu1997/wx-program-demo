//index.js
//获取应用实例
import { loginDo, logoutDo } from '../../service/auth'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: function () {
    app.updateLogin().then(() => {
      this.bindGlobalData()
    })
    if (this.data.canIUse) {
      app.userInfoReadyCallback = (res) => {
        this.bindGlobalData()
      }
      return
    }
  },
  bindGlobalData: function () {
    console.log(app.globalData)
    this.setData({
      userInfo: app.globalData.userInfo || {},
      isLogin: app.globalData.isLogin,
    })
  },
  login: function (e) {
    if (this.canIUse && e['type'] == 'tap') {
      return
    }
    if (e['type'] == 'getuserinfo' && !e['detail'].userInfo) {
      return
    }
    loginDo()
      .then(() => {
        this.bindGlobalData()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  logout: function (e) {
    logoutDo().then(() => {
      this.bindGlobalData()
    })
  },
})
