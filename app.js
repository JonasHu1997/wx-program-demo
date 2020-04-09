import { getSession, setSession } from './model/auth'
import { getUserInfo } from './lib/wx'
//app.js
App({
  onLaunch: function () {},
  globalData: {
    userInfo: {},
    isLogin: false,
  },
  updateLogin: function () {
    let promise = [
      getSession()
        .then(() => (this.globalData.isLogin = true))
        .catch(() => {}),
      getUserInfo(false).catch(() => {}),
    ]
    return Promise.all(promise)
  },
})
