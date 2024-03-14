import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import { fetchAllCategories, addCategory } from 'src/utility/api'
import AddCategoryForm from './AddCategoryForm'
import toast from 'react-hot-toast'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleAddCategory = async formData => {
    try {
      const response = await addCategory(formData)
      toast.success('Category added successfully', { duration: 3000 })
      await getAllCategories()
    } catch {
      toast.error('Error in adding category', { duration: 3000 })
    }
    setSidebarOpen(false)
  }

  const handleCancel = () => {
    setSidebarOpen(false)
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'actions', headerName: 'Actions', flex: 1 }
  ]

  const getAllCategories = async () => {
    const response = await fetchAllCategories()

    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))

    setCategories(ccc)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Categories' />
          <CardContent>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={toggleSidebar} variant='contained' color='primary'>
                Add Client
              </Button>
            </div>
            <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={categories}
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
        <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancel} />
      </Sidebar>
    </Grid>
  )
}

export default Category
