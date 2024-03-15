import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

const instance = axios.create({
  baseURL: BASE_URL
})

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export function getStaticFileUrl(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, '/')

  return `${BASE_URL}/${normalizedPath}`
}

export const fetchAllCategories = async () => {
  return instance.get('/categories')
}

export const addCategory = async (formData) => {
  return instance.post('/categories', formData)
}

export const editCategory = async (id,formData) => {
  return instance.patch(`/categories/${id}`, formData)
}

export const deleteCategory = async (id) => {
  return instance.delete(`/categories/${id}`)
}


// Products

export const fetchProducts = async () => {
  return instance.get('/products');
}







export default instance
