export const getSetting = () =>
  new Promise((resolve, reject) =>
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject()
      },
    })
  )

export const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject()
      },
      complete: () => {},
    })
  })
}

export const setStorage = (key, data) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: (result) => {
        resolve(result)
      },
      fail: () => {
        reject()
      },
      complete: () => {},
    })
  })
}

export const removeStorage = (key) => {
  return new Promise((resolve, reject) =>
    wx.removeStorage({
      key,
      success: (result) => {
        resolve()
      },
      fail: () => {
        reject()
      },
    })
  )
}

export const login = () =>
  new Promise((resolve, _) => wx.login({ success: (res) => resolve(res) }))

export const getUserInfo = (isLogin = false) =>
  new Promise((resolve, reject) =>
    wx.getUserInfo({
      withCredentials: isLogin,
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        getApp().globalData.userInfo = result.userInfo
        resolve(result)
      },
      fail: () => {
        reject()
      },
    })
  )
