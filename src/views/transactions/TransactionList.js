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
import {
  fetchTransaction,
  deleteTransaction,
  clearTransactionByIdStatus,
} from 'src/storages/transactionsSlice'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import moment from 'moment'
import NumberFormat from 'react-number-format'
const TransactionList = () => {
  const dispatch = useDispatch()
  const transactionList = useSelector((state) => state.transactions.transactionList)
  const transactionListStatus = useSelector((state) => state.transactions.transactionListStatus)
  const transactionByIdStatus = useSelector((state) => state.transactions.transactionByIdStatus)

  useEffect(() => {
    if (transactionListStatus === 'idle') {
      dispatch(fetchTransaction())
    }
  }, [transactionListStatus, dispatch])

  useEffect(() => {
    if (transactionByIdStatus === 'succeeded') {
      dispatch(clearTransactionByIdStatus())
    }
  }, [transactionByIdStatus, dispatch])

  const columns = [
    { key: 'code', label: 'Kode Nasabah', _style: { width: '10%' } },
    { key: 'customers', label: 'Peminjam', _style: { width: '10%' } },
    { key: 'amount', label: 'Total Pinjaman', _style: { width: '10%' } },
    { key: 'paid_amount', label: 'Terbayarkan', _style: { width: '20%' } },
    { key: 'remaining_payment', label: 'Sisa Pembayaran', _style: { width: '20%' } },
    { key: 'date', label: 'Tanggal Pinjam' },
    { key: 'action', filter: false, sorter: false, _style: { width: '30%' } },
  ]

  return (
    <CRow>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Transaksi</strong>
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
              items={transactionList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                branchs: (item) => {
                  return <td>{item.branchs.name}</td>
                },
                customers: (item) => {
                  return <td>{item.customers.name}</td>
                },
                date: (item) => {
                  return <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                },
                amount: (item) => {
                  return (
                    <td>
                      <NumberFormat
                        value={item.amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </td>
                  )
                },
                paid_amount: (item) => {
                  return (
                    <td>
                      <NumberFormat
                        value={item.paid_amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </td>
                  )
                },
                remaining_payment: (item) => {
                  return (
                    <td>
                      <NumberFormat
                        value={item.remaining_payment}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </td>
                  )
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactiones/detail-transaction/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol> */}
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactiones/edit-transaction/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol> */}
                        <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deleteTransaction(item.id))
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
                            href={`/#/transactions/payments/${item.id}`}
                            color={'primary'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilHistory} />
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

export default TransactionList
