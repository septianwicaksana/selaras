import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayment, deletePayment, clearPaymentByIdStatus } from 'src/storages/paymentsSlice'
import { useParams } from 'react-router-dom'

const PaymentList = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const paymentList = useSelector((state) => state.payments.paymentList)
  const paymentListStatus = useSelector((state) => state.payments.paymentListStatus)
  const paymentByIdStatus = useSelector((state) => state.payments.paymentByIdStatus)

  useEffect(() => {
    if (paymentListStatus === 'idle') {
      dispatch(fetchPayment(id))
    }
  }, [paymentListStatus, id, dispatch])

  useEffect(() => {
    if (paymentByIdStatus === 'succeeded') {
      dispatch(clearPaymentByIdStatus())
    }
  }, [paymentByIdStatus, dispatch])

  const columns = [
    {
      key: 'number',
      _style: { width: '40%' },
    },
    { key: 'payment_due', _style: { width: '20%' } },
    { key: 'due_date', _style: { width: '10%' } },
    { key: 'status', filter: false, sorter: false },
    { key: 'action', filter: false, sorter: false },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/paymentes/create-payment" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>Pembayaran</strong>
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
              items={paymentList}
              columns={columns}
              // columnFilter
              // tableFilter
              // cleaner
              itemsPerPageSelect
              itemsPerPage={10}
              columnSorter
              pagination
              scopedColumns={{
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/paymentes/detail-payment/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/paymentes/edit-payment/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol>
                        {/* <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deletePayment(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol> */}
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

export default PaymentList
