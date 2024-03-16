import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import AddProductForm from './AddProductForm'
import { addProduct, deleteProduct, editProduct, fetchAllProducts, fetchProducts } from 'src/utility/api'
import EditProductForm from './EditProducts'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import ConfirmationDialog from 'src/utility/confirmation'

const Product = () => {
  const [products, setProducts] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [editSidebarOpen, setEditSidebarOpen] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleAddProducts = async (formData) => {
    //Make api request
    try {
      const response = await addProduct(formData)
      toast.success("Product added successfully", {duration: 3000})
      await getAllProducts()
    } catch (error) {
      toast.error("Error in adding Products", {duration: 3000})
    }
    setSidebarOpen(false)
  }

  const handleCancel = () => {
    setSidebarOpen(false)
  }

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData)
    setEditSidebarOpen(true)
  }

  const handleDelete = (id) => {
    setDeleteProductId(id)
    setConfirmationDialogOpen(true)
  }
  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      await deleteProduct(deleteProductId)
      toast.success('Product deleted successfully', { duration: 3000 })
      await getAllProducts()
    } catch {
      toast.error('Error deleting product', { duration: 3000 })
    } finally {
      setConfirmationDialogOpen(false)
    }
  }


  const columns = [
    { field: "id", headerName: 'ID', flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "customer_id", headerName: "Customer", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "category_id", headerName: "Category", flex: 1 },
    { field: "condition", headerName: "Condition", flex: 1 },
    { field: "image", headerName: "Image", flex: 1 },
    { field: "gallery", headerName: "Gallery", flex: 1 },
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
              color: '#006400'
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

  const getAllProducts = async () => {
    const response = await fetchAllProducts()

    const ccc = response.data.map(row => ({
      ...row,
      id:row._id
    }))
    setProducts(ccc)
  }

  const handleEditModalClose = () => {
    setEditSidebarOpen(false)
  }

  const handleEditSubmit = async (id, editedData) => {
    try {
      const response = await editProduct(id, editedData)

      toast.success('Product Updated successfully', { duration: 3000 })
    } catch {
      toast.error('Error in updating Product', { duration: 3000 })
    }

    // Close the edit modal
    setEditSidebarOpen(false)
    await getAllProducts()
  }

  useEffect(() => {
    getAllProducts()
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
        <AddProductForm onSubmit={handleAddProducts} onCancel={handleCancel} />
      </Sidebar>
      <Sidebar show={editSidebarOpen} sx={{ padding: 5 }}>
        <EditProductForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </Grid>
  )
}

Product.acl = {
  action: 'read',
  subject: 'product'
}

export default Product
