import axios from 'axios'

function callApi (config) {
  return axios.request(config)
    .catch(error => {
      console.log('callApi, catch: ', error)
    })
}

export default callApi
