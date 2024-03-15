const { Grid, Typography, TextField, Button, MenuItem } = require('@mui/material')

import { useState, useEffect } from 'react'
import {fetchAllCustomers } from 'src/utility/api'

const AddCustomerForm = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    mobile: "",
    email:"",
    aadharNumber:""
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  console.log(initialFormData)

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
    getAllCustomers()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <Typography variant='h5'>Add Customer</Typography>
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
            label='Mobile'
            type="number"
            fullWidth
            value={formData.mobile}
            onChange={e => handleInputChange('mobile', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Email'
            fullWidth
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Aadhar'
            fullWidth
            value={formData.aadharNumber}
            onChange={e => handleInputChange('aadharNumber', e.target.value)}
          />
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

export default AddCustomerForm
