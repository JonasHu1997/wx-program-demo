import { setSession, getSession, cleanSession } from '../model/auth'
import { getSetting, getUserInfo, login } from '../lib/wx'
import { login as loginAPI } from '../api/login'
const app = getApp()

export const userInfoWithAuth = (isLogin = false) => {
  return getSetting().then((setting) => {
    // 先判断是否授权 未授权跳转授权页
    if (!setting.authSetting['scope.userInfo']) {
      // @todo 跳转授权
      return Promise.reject()
    }
    return getUserInfo(isLogin)
  })
}

export const checkLogin = () => {
  return loginAPI().then((res) => {
    let { code, data, msg } = res.data
    if (code == 100) {
      return Promise.resolve(res.data)
    }
    return Promise.reject(res.msg)
  })
}

export const loginDo = () => {
  let ret = []
  return userInfoWithAuth(true)
    .then((res) => {
      ret.push(res)
      return login()
    })
    .then((res) => {
      ret.push(res)
      let [retUserInfo, retLogin] = ret
      let { code } = retLogin
      let { userInfo, rawData, signature, encryptedData, iv } = retUserInfo
      return loginAPI({
        code,
        signature,
        encryptedData,
        iv,
      })
    })
    .then((res) => {
      let { code, data, msg } = res.data
      if (code == 100) {
        return setSession(data)
      }
      return Promise.reject(msg)
    })
    .then((res) => {
      app.globalData.isLogin = true
      return Promise.resolve(res)
    })
}

export const logoutDo = () => {
  return cleanSession().then(()=>{
      app.globalData.isLogin = false
  })
}
