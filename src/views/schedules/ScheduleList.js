import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CSmartTable,
  CWidgetStatsA,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowThickBottom,
  cilArrowTop,
  cilHistory,
  cilOptions,
  cilPencil,
  cilPeople,
  cilPlus,
  cilSearch,
  cilTrash,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { deleteSchedule, fetchSchedule } from 'src/storages/schedulesSlice'
import { Navigate } from 'react-router-dom'
import PaymentList from '../transactions/payments/PaymentList'

const ScheduleList = () => {
  const dispatch = useDispatch()
  const scheduleList = useSelector((state) => state.schedules.scheduleList)
  const scheduleListStatus = useSelector((state) => state.schedules.scheduleListStatus)

  useEffect(() => {
    if (scheduleListStatus === 'idle') {
      dispatch(fetchSchedule())
    }
  }, [scheduleListStatus, dispatch])

  const columns = [
    { key: 'transaction_id', label: 'Nasabah', _style: { width: '10%' } },
    { key: 'number', label: 'Pembayaran Ke-', _style: { width: '10%' } },
    { key: 'payment_due', label: 'Total Tagihan', _style: { width: '10%' } },
    { key: 'due_date', label: 'Jatuh Tempo', _style: { width: '10%' } },
    { key: 'employee_id', label: 'Mantri', _style: { width: '10%' } },
  ]

  return (
    <CRow>
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
              items={scheduleList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                transaction_id: (item) => {
                  return (
                    <td>
                      <a href={item.transactions.customer_id.location}>
                        {item.transactions.customer_id.name}
                      </a>
                    </td>
                  )
                },
                due_date: (item) => {
                  return <td>{moment(item.due_date).format('DD-MM-YYYY')}</td>
                },
                employee_id: (item) => {
                  return <td>{item.employees.name}</td>
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/customeres/detail-customer/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol> */}
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/customeres/edit-customer/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol> */}
                        {/* <CCol className="align-items-center">
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
                        </CCol> */}
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

export default ScheduleList
