const { Grid, Typography, TextField, Button, MenuItem } = require('@mui/material')

import { useState, useEffect } from 'react'

const AddCspForm = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    cspName: '',
    address: '',
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

        <Grid item xs={12}>
          <Typography variant='h6' padding={2}>
            User Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
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
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' padding={2}>
            CSP Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label='CSP Name'
                fullWidth
                value={formData.cspName}
                onChange={e => handleInputChange('cspName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Address'
                fullWidth
                value={formData.address}
                onChange={e => handleInputChange('address', e.target.value)}
                required
              />
            </Grid>

          </Grid>
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

export default AddCspForm
