import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { addCustomer, deleteCustomer, editCustomer, fetchAllCsp, fetchAllCustomers } from 'src/utility/api'
import ConfirmationDialog from 'src/utility/confirmation'
import AddCsp from './AddCsp'

const CSP = () => {

  const [csp, setCsp] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const getAllCsp = async () => {
    const response = await fetchAllCsp()
    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))
    setCsp(ccc)
  }

  useEffect(() => {
    getAllCsp()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'district', headerName: 'District', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },

  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='CSP' />
          <CardContent>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={toggleSidebar} variant='contained' color='primary'>
                Add Category
              </Button>
            </div>
            <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={csp}
                columns={columns}
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      id: false
                    }
                  },
                  pagination: {
                    paginationModel: {
                      pageSize: 5
                    }
                  }
                }}
                pageSizeOptions={[5, 10, 20]}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Sidebar show={sidebarOpen} sx={{ padding: 5 }}>
        <AddCsp />
      </Sidebar>
    </Grid>
  )
}

CSP.acl = {
  action: 'read',
  subject: 'customer'
}

export default CSP
