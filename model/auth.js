import { setStorage, getStorage, removeStorage } from '../lib/wx'
import { unixTimestamp } from '../utils/util'
const SESSION_KEY = 'wx_session'
const app = getApp()
export const setSession = ({ session, expire }) =>
  setStorage(SESSION_KEY, { session, expire })

export const getSession = () =>
  getStorage(SESSION_KEY)
    .then((ret) => {
      let { session, expire } = ret.data
      let now = unixTimestamp(new Date())
      if (now > expire) {
        return Promise.reject()
      }
      app.globalData.isLogin = true
      return Promise.resolve(session)
    })
    .catch((err) => {
      app.globalData.isLogin = false
      return cleanSession().then(() => Promise.reject(err))
    })

export const cleanSession = () => {
  return removeStorage(SESSION_KEY).catch(() => Promise.resolve())
}
