import { getSession, removeSession, cleanSession } from '../model/auth'
const NEED_LOGIN_CODE = 99
class HTTP {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  header() {
    const header = {
      'content-type': 'application/json',
    }
    return getSession()
      .then((session) => {
        return Promise.resolve({
          ...header,
          'wx-session': session,
        })
      })
      .catch(() => {
        return Promise.resolve({
          ...header,
        })
      })
  }

  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    return this.header().then((header) => {
      return new Promise((resolve, reject) => {
        wx.request({
          ...params,
          header,
          url: this.baseUrl + params.url,
          dataType: 'json',
          responseType: 'text',
          success: (res) => {
            let { code, data, msg } = res.data
            if (code == NEED_LOGIN_CODE) {
              reject('Need Login')
            }
            resolve(res)
          },
          fail: (err) => {
            // this._showToast()
            reject(err)
          },
        })
      }).catch((err) => {
        if (err == 'Need Login') {
          return cleanSession().then(() => Promise.reject(err))
        }
        return Promise.reject(err)
      })
    })
  }

  _showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
    })
  }
}
export default HTTP
