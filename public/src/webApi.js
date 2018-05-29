import axios from 'axios'
import { bus } from './components/common/bus'
import utils from './utils'
import router from './router'

// axios#request(config)
// axios#get(url[, config])
// axios#delete(url[, config])
// axios#head(url[, config])
// axios#options(url[, config])
// axios#post(url[, data[, config]])
// axios#put(url[, data[, config]])
// axios#patch(url[, data[, config]])

function request ({ needsToken = true, ...restConfig }) {
  const config = { ...restConfig }

  if (needsToken) {
    config.headers = utils.getHeaders()
  }

  return axios.request(config)
    .catch(error => {
      if (error.response.status === 401) {
        bus.$emit('logout')

        router.push('/login')
      } else {
        bus.$emit('error', error)
      }

      return Promise.reject(error)
    })
}

const webApi = {
  get: (url, config) => request({ url, method: 'get', ...config }),
  delete: (url, config) => request({ url, method: 'delete', ...config }),
  head: (url, config) => request({ url, method: 'head', ...config }),
  options: (url, config) => request({ url, method: 'options', ...config }),
  post: (url, data, config) => request({ url, method: 'post', data, ...config }),
  put: (url, data, config) => request({ url, method: 'put', data, ...config }),
  patch: (url, data, config) => request({ url, method: 'patch', data, ...config }),
  request,
}

export default webApi
