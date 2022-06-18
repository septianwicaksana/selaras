import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomer, deleteCustomer, clearCustomerByIdStatus } from 'src/storages/customersSlice'

const CustomerList = () => {
  const dispatch = useDispatch()
  const customerList = useSelector((state) => state.customers.customerList)
  const customerListStatus = useSelector((state) => state.customers.customerListStatus)
  const customerByIdStatus = useSelector((state) => state.customers.customerByIdStatus)

  useEffect(() => {
    if (customerListStatus === 'idle') {
      dispatch(fetchCustomer())
    }
  }, [customerListStatus, dispatch])

  useEffect(() => {
    if (customerByIdStatus === 'succeeded') {
      dispatch(clearCustomerByIdStatus())
    }
  }, [customerByIdStatus, dispatch])

  const columns = [
    {
      key: 'name',
      _style: { width: '40%' },
    },
    { key: 'ktp', _style: { width: '20%' } },
    { key: 'phone', _style: { width: '20%' } },
    { key: 'address', _style: { width: '10%' } },
    { key: 'action', filter: false, sorter: false },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/customers/create-customer" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Nasabah</strong>
          </CCardHeader>
          <CCardBody className="w-100 overflow-auto">
            <CSmartTable
              sorterValue={{ column: 'created_at', state: 'desc' }}
              clickableRows
              tableProps={{
                striped: false,
                hover: true,
              }}
              activePage={3}
              items={customerList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/customeres/detail-customer/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/customeres/edit-customer/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deleteCustomer(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactions/create-transaction/${item.id}`}
                            color={'primary'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilArrowThickBottom} />
                          </CButton>
                        </CCol>
                      </CRow>
                    </td>
                  )
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerList
