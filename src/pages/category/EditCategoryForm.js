import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material'
import { fetchAllCategories } from 'src/utility/api'

const EditCategoryForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    parent_category_id: null,
    description: ''
  })

  const [categories, setCategories] = useState([])

  const getAllCategories = async () => {
    const response = await fetchAllCategories()
    setCategories(response.data)
  }


  useEffect(() => {
    getAllCategories()
    if (data) {
      setFormData({
        name: data.name || '',
        parent_category_id: data.parent_category_id || null,
        description: data.description || ''
      })
    }
  }, [data])

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(data._id, formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <Typography variant='h5'>Add Category</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Name'
            fullWidth
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Description'
            fullWidth
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Parent Category'
            select
            fullWidth
            name='parent_category_id'
            value={formData.parent_category_id}
            onChange={e => handleInputChange('parent_category_id', e.target.value)}
          >
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
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

EditCategoryForm.acl = {
  action: 'read',
  subject: 'enquiry'
}

export default EditCategoryForm
