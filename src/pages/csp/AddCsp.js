const { Grid, Typography, TextField, Button, MenuItem } = require('@mui/material')

import { useState, useEffect } from 'react'

const AddCsp = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    cspName: '',
    add1: '',
    add2: '',
    district: '',
    state: '',
    pincode: '',
    role: 'csp'
  }

  const [formData, setFormData] = useState(initialFormData)

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <Typography variant='h5'>Add CSP</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            User Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Name'
            fullWidth
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Email'
            fullWidth
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Password'
            fullWidth
            type='password'
            value={formData.password}
            onChange={e => handleInputChange('password', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            CSP Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='CSP Name'
            fullWidth
            type='cspName'
            value={formData.cspName}
            onChange={e => handleInputChange('cspName', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Address Line 1'
            fullWidth
            type='add1'
            value={formData.add1}
            onChange={e => handleInputChange('add1', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Address Line 2'
            fullWidth
            type='add2'
            value={formData.add2}
            onChange={e => handleInputChange('add2', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='District'
            fullWidth
            type='district'
            value={formData.password}
            onChange={e => handleInputChange('district', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='State'
            fullWidth
            type='state'
            value={formData.password}
            onChange={e => handleInputChange('state', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Pincode'
            fullWidth
            type='pincode'
            value={formData.password}
            onChange={e => handleInputChange('pincode', e.target.value)}
            required
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

export default AddCsp
