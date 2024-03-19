const { Grid, Typography, TextField, Button, MenuItem } = require('@mui/material')

import { useState, useEffect } from 'react'
import { fetchAllCategories, fetchAllCustomers, fetchAllProducts } from 'src/utility/api'

const AddProductForm = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    price: "",
    customer_id: "",
    category_id: "",
    description: '',
    condition: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [customers, setCustomers] = useState([])
  const [categories, setCategories] = useState([])

  const getAllCustomers = async () => {
    const response = await fetchAllCustomers()
    setCustomers(response.data)
  }
  const getAllCategories = async () => {
    const response = await fetchAllCategories()
    setCategories(response.data)
  }


  useEffect(() => {
    getAllCustomers()
    getAllCategories()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
    getAllCustomers()
    getAllCategories()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <Typography variant='h5'>Add Product</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label='Name'
            fullWidth
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Price'
            fullWidth
            value={formData.number}
            onChange={e => handleInputChange('price', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Customer'
            select
            fullWidth
            value={formData.customer_id}
            onChange={e => handleInputChange('customer_id', e.target.value)}
          >
            {
              customers.map(customer => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Category'
            select
            fullWidth
            value={formData.category_id}
            onChange={e => handleInputChange('category_id', e.target.value)}
          >
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Description'
            fullWidth
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Condition'
            select
            fullWidth
            value={formData.condition}
            onChange={e => handleInputChange('condition', e.target.value)}
          >
            <MenuItem value={"new"}>new</MenuItem>
            <MenuItem value={"used"}>used</MenuItem>
            <MenuItem value={"damaged"}>damaged</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 2 }} spacing={2} justifyContent='flex-end'>
        <Grid item>
          <Button type='submit' variant='contained' color='primary'>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button type='button' onClick={onCancel} variant='outlined'>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddProductForm
