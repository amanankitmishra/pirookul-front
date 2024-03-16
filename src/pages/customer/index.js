import { Card, CardContent, CardHeader, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Sidebar from 'src/@core/components/sidebar'
import AddCustomerForm from './AddCustomerForm'
import EditCustomerForm from './EditCustomer'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import { addCustomer, deleteCustomer, editCustomer, fetchAllCustomers } from 'src/utility/api'
import ConfirmationDialog from 'src/utility/confirmation'

const Customer = () => {
  const [customers, setCustomers] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [editSidebarOpen, setEditSidebarOpen] = useState(false)
  const [deleteCustomerId, setDeleteCustomerId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleAddCustomer = async (formData) => {
    try {
      const response = await addCustomer(formData)
      toast.success('Customer added Succesfully', { duration: 3000 })
      const customer = await getAllCustomers()
      console.log("customer", customer)
    } catch (error) {
      toast.error('Error in adding Customer', { duration: 3000 })
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
    setDeleteCustomerId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteCustomer(deleteCustomerId)
      toast.success('Customer deleted successfully', { duration: 3000 })
      await getAllCustomers()
    } catch {
      toast.error('Error deleting customer', { duration: 3000 })
    } finally {
      setConfirmationDialogOpen(false)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'aadharNumber', headerName: 'Aadhar', flex: 1 },
    { field: 'Photo', headerName: 'Photo', flex: 1 },
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

  const getAllCustomers = async () => {
    const response = await fetchAllCustomers()

    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))
    setCustomers(ccc)
  }

  const handleEditModalClose = () => {
    setEditSidebarOpen(false)
  }

  const handleEditSubmit = async (id, editedData) => {
    console.log(id, editedData)
    try {
      const response = await editCustomer(id, editedData)
      console.log("edited data", response.data)
      toast.success('Customer Updated succesfully', { duration: 3000 })
    } catch (error) {
      toast.error('Error in updating Category', { duration: 3000 })
    }

    // Close the edit modal
    setEditSidebarOpen(false)
    await getAllCustomers()
  }

  useEffect(() => {
    getAllCustomers()
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
      <Sidebar show={editSidebarOpen} sx={{ padding: 5 }}>
        <EditCustomerForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </Grid>
  )
}

Customer.acl = {
  action: 'read',
  subject: 'customer'
}

export default Customer
