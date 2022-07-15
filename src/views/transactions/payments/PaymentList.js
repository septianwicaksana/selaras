import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilCheckAlt,
  cilCheckCircle,
  cilMoney,
  cilPencil,
  cilPlus,
  cilSearch,
  cilWarning,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayment, clearPaymentByIdStatus } from 'src/storages/paymentsSlice'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { fetchHoliday } from 'src/storages/holidaysSlice'
import HolidayList from 'src/views/holidays/HolidayList'

const PaymentList = () => {
  const { id } = useParams()
  const [showMakePayment, setShowMakePayment] = useState(false)
  const [showEditPayment, setShowEditPayment] = useState(false)
  const dispatch = useDispatch()
  const paymentList = useSelector((state) => state.payments.paymentList)
  const paymentListStatus = useSelector((state) => state.payments.paymentListStatus)
  const paymentByIdStatus = useSelector((state) => state.payments.paymentByIdStatus)

  const holidayList = useSelector((state) => state.holidays.holidayList)
  const holidayListStatus = useSelector((state) => state.holidays.holidayListStatus)

  useEffect(() => {
    if (holidayListStatus === 'idle') {
      dispatch(fetchHoliday())
    }
  }, [holidayListStatus, dispatch])

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
                due_date: (item) => {
                  return <td>{moment(item.due_date).format('DD-MM-YYYY')}</td>
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactions/make-payment/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilMoney} />
                          </CButton>
                        </CCol>
                        {holidayList.find((data) => {
                          return (
                            moment(data.date).format('DD-MM-YYYY') ==
                            moment(item.due_date).format('DD-MM-YYYY')
                          )
                        }) ? (
                          <CCol className="align-items-center">
                            <CButton
                              href={`/#/transactions/edit-payment/${item.id}`}
                              color={'secondary'}
                              size="sm"
                              key={2}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </CCol>
                        ) : (
                          <></>
                        )}
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
