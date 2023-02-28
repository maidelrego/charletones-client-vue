import axios from 'axios'
const axiosInstance = axios.create()
// const baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
const baseURL = 'http://localhost:3000/'
const apiServer = baseURL + 'api/v1/'

interface IOptions {
  ms?: number
  msg?: string
}

interface ITopts {
  clear?: boolean
  headers?: any
}

interface ITpath {
  path: string
}

interface ITparams {
  params: any | null
}

const timeoutWatcher = (promise: Promise<any>, options?: IOptions) => {
  const ms = options ? options.ms : 90000
  const msg = options ? options.msg : 'The API request has timed out.'
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(msg))
    }, ms)
  })

  return Promise.race([promise, timeout])
}

function addAuthHeader(opts: ITopts = {}) {
  let token: string | null = ''

  const authUser = JSON.parse(localStorage.getItem('charletonesUser') || '{}')

  if (authUser) {
    token = authUser.token
  }

  if (!opts.headers) {
    opts.headers = {}
  }

  opts.headers['Access-Control-Allow-Origin'] = '*'

  if (token) {
    opts.headers.Authorization = `Bearer ${token}`
  } else {
    opts.headers.Authorization = null
  }
  return opts
}

async function doAPIGet(path: string, params?: any) {
  if (path[0] === '/') {
    path = path.slice(1)
  }
  let url = apiServer + path
  if (params && typeof params === 'object') {
    let urlparams = ''
    for (const key in params) {
      if (urlparams !== '') {
        urlparams += '&'
      }
      urlparams += key + '=' + encodeURIComponent(JSON.stringify(params))
    }
    url += '?' + urlparams // + '?token=' + this.token
  }

  try {
    const res = await axiosInstance.get(url, addAuthHeader({ clear: false }))
    return res.data
  }
  catch (err: any) {
    console.log(err)
    return err.response.data
  }
}

function doAPIPost(path: string, params: any) {
  if (path === '/') {
    path = path.slice(1)
  }
  const url = apiServer + path

  const apicall = axiosInstance.post(url, params, addAuthHeader({ clear: false }))  
  return timeoutWatcher(apicall)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
      return err.response.data
    })
}

function doAPIPut(path: ITpath, params: ITparams) {
  if (path.path[0] === '/') {
    path.path = path.path.slice(1)
  }
  const url = apiServer + path.path
  const apicall = axiosInstance.put(url, params, addAuthHeader({ clear: false }))
  return timeoutWatcher(apicall)
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err.response.data
    })
}

function doAPIDelete(path: ITpath) {
  if (path.path[0] === '/') {
    path.path = path.path.slice(1)
  }
  const url = apiServer + path.path
  const apicall = axiosInstance.delete(url, addAuthHeader({ clear: false }))
  return timeoutWatcher(apicall)
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err.response.data
    })
}

export { doAPIGet, doAPIPost, doAPIDelete, doAPIPut }
