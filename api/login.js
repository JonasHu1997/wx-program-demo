import http from '../lib/request'

// export const login = ({ code, signature, encryptedData, iv }) => {
//   // code 为空 提供检查登录功能
//   return http.request({
//     url: '/auth',
//     method: 'POST',
//     data: {
//       code,
//       signature,
//       encryptedData,
//       iv,
//     },
//   })
// }

export const login = ({ code, signature, encryptedData, iv }) => {
  console.log('Call login API:', code, signature, encryptedData, iv)
  return Promise.resolve({
    data: {
      code: 100,
      data: {
        session: '212312321312',
        expire: 1586512489,
      },
      msg: '登录成功',
    },
  })
}

export const checkLogin = () => {
  return http.request({
    url: '/auth',
    method: 'GET',
  })
}

export const logout = () => {
  return http.request({
    url: '/auth',
    method: 'DELETE',
  })
}
