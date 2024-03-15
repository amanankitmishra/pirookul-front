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

//customer

export const addCustomer = async (formData) => {
  return instance.post('/customers', formData)
}

export const fetchAllCustomers = async () => {
  return instance.get('/customers')
}

export const editCustomer = async (id,formData) => {
  return instance.patch(`/customers/${id}`, formData)
}

export const deleteCustomer = async (id) => {
  return instance.delete(`/customers/${id}`)
}


// Products

export const addProduct = async (formData) => {
  return instance.post('/products', formData)
}

export const fetchAllProducts = async () => {
  return instance.get('/products')
}

export const editProduct = async (id,formData) => {
  return instance.patch(`/products/${id}`, formData)
}

export const deleteProduct = async (id) => {
  return instance.delete(`/products/${id}`)
}







export default instance
