const { PROD, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL, VITE_TIMEOUT = 60e3 } = import.meta.env
const API_BASE_URL = window.API_BASE_URL || (PROD ? VITE_PROD_BASE_URL : VITE_DEV_BASE_URL)

const createRequest = options => {
  const request = axios.create({
    baseURL: API_BASE_URL,
    timeout: VITE_TIMEOUT * 1,
    ...options
  })

  request.interceptors.request.use(config => {
    return config
  }, error => {
    console.error(error)
  })

  request.interceptors.response.use(res => {
    return res
  }, error => {
    console.error(error)
  })

  return request
}

const fetchRequest = (url, opts = {}) => {
  url = url.startsWith('http') ? url : API_BASE_URL + url
  const { method = 'GET', headers, body, ...others } = opts
  const options = {
    method,
    ...others,
    headers: {
      'content-type': 'application/json',
      ...headers
    }
  }
  if (['PUT', 'POST'].includes(method.toUpperCase())) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body)
  }
  return fetch(url, options)
}

export default createRequest()

export {
  API_BASE_URL,
  createRequest,
  fetchRequest
}
