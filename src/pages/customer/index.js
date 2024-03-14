import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import AddCustomerForm from './AddCustomerForm'

const Customer = () => {
    const [customers, setCustomers] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleAddCustomer = async (formData) => {
        //Make api request

        console.log(formData)

        setSidebarOpen(false)
    }

    const handleCancel = () => {
        setSidebarOpen(false)
    }

    const columns = [
        {field : "id", headerName: 'ID', flex:1},
        {field: "name", headerName: "Name", flex: 1 },
        {field: "mobile", headerName: "Mobile", flex: 1},
        {field: "email", headerName:"Email", flex: 1},
        {field: "pin", headerName: "Pin", flex: 1},
        {field: "Photo", headerName:"Photo", flex: 1},
    ]

    useEffect(() => {
        handleAddCustomer()
    }, [])

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Customers' />
        <CardContent>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={toggleSidebar} variant='contained' color='primary'>
              Add Customers
            </Button>
          </div>
          <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={customers}
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
      <AddCustomerForm onSubmit={handleAddCustomer} onCancel={handleCancel} />
    </Sidebar>
  </Grid>
  )
}

export default Customer
