import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import AddProductForm from './AddProductForm'
import { fetchProducts } from 'src/utility/api'

const Product = () => {
  const [products, setProducts] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const getProducts = async () => {
    const response = await fetchProducts()
    setProducts(response.data)
  }

  const handleAddProduct = async (formData) => {
    //Make api request

    console.log(formData)

    setSidebarOpen(false)
  }

  const handleCancel = () => {
    setSidebarOpen(false)
  }

  const columns = [
    { field: "id", headerName: 'ID', flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "condition", headerName: "Condition", flex: 1 },
    { field: "iamge", headerName: "Image", flex: 1 },
    { fled: "gallery", headerName: "Gallery", flex: 1 }
  ]

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Products' />
          <CardContent>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={toggleSidebar} variant='contained' color='primary'>
                Add Products
              </Button>
            </div>
            <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={products}
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
        <AddProductForm onSubmit={handleAddProduct} onCancel={handleCancel} />
      </Sidebar>
    </Grid>
  )
}

export default Product
