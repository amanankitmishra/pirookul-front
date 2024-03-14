const { Grid, Typography, TextField, Button, MenuItem } = require('@mui/material')

import { useState, useEffect } from 'react'
import { fetchAllCategories } from 'src/utility/api'

const AddProductForm = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    customer: "",
    category: null,
    description:'',
    condition: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {

  }

  useEffect(() => {
    getAllProducts()
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
            label='Customer'
            select
            fullWidth
            value={formData.customer}
            onChange={e => handleInputChange('customer', e.target.value)}
          >
            <MenuItem value={"Customer 1"}>Customer 1</MenuItem>
            <MenuItem value={"Customer 2"}>Customer 2</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Category'
            select
            fullWidth
            name='category'
            value={formData.category}
            onChange={e => handleInputChange('category', e.target.value)}
          >
            {products.map(product => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
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
        <Grid item xs={12}>
          <TextField
            label='Condition'
            select
            fullWidth
            value={formData.condition}
            onChange={e => handleInputChange('condition', e.target.value)}
          >
            <MenuItem value={"New"}>New</MenuItem>
            <MenuItem value={"used"}>Used</MenuItem>
        </TextField>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item>
            <Button>
                <input type="file" hidden />
                Add Image
            </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
            <Button>
                <input type="file" hidden multiple />
                Add Gallery
            </Button>
        </Grid>
      </Grid> */}
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
