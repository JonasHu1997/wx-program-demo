import HTTP from './http'
import apiConf from '../conf/api'
const baseUrl = apiConf.baseUrl

const request = new HTTP(baseUrl)
export default request