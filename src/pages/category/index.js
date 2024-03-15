import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import { fetchAllCategories, addCategory, editCategory, deleteCategory } from 'src/utility/api'
import AddCategoryForm from './AddCategoryForm'
import EditCategoryForm from './EditCategoryForm'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import ConfirmationDialog from 'src/utility/confirmation'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [editSidebarOpen, setEditSidebarOpen] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)

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

  const handleEdit = rowData => {
    setSelectedRowData(rowData)
    setEditSidebarOpen(true)
  }

  const handleDelete = id => {
    setDeleteCategoryId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteCategory(deleteCategoryId)
      toast.success('Category deleted successfully', { duration: 3000 })
      getAllCategories()
    } catch {
      toast.error('Error deleting category', { duration: 3000 })
    } finally {
      setConfirmationDialogOpen(false)
    }
  }


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px',
              color:'#006400'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconEdit onClick={() => handleEdit(params.row)} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px',
              color: 'red'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconTrash onClick={() => handleDelete(params.row.id)} />
          </div>
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false
    }
  ]

  const getAllCategories = async () => {
    const response = await fetchAllCategories()

    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))

    setCategories(ccc)
  }

  const handleEditModalClose = () => {
    setEditSidebarOpen(false)
  }

  const handleEditSubmit = async (id, editedData) => {
    try {
      const response = await editCategory(id, editedData)

      toast.success('Category Updated successfully', { duration: 3000 })
    } catch {
      toast.error('Error in updating Category', { duration: 3000 })
    }

    // Close the edit modal
    setEditSidebarOpen(false)
    getAllCategories()
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
                Add Category
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
      <Sidebar show={editSidebarOpen} sx={{ padding: 5 }}>
        <EditCategoryForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose}/>
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />

    </Grid>
  )
}

export default Category
