import React, { useEffect, useRef, useState } from 'react'
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
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSmartTable,
  CToast,
  CToastBody,
  CToastHeader,
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
import { fetchAllPayment } from 'src/storages/paymentsSlice'
import { fetchEmployee } from 'src/storages/employeesSlice'
import { useForm } from 'react-hook-form'
import { unwrapResult } from '@reduxjs/toolkit'
import { clearCreateScheduleStatus, createSchedule } from 'src/storages/schedulesSlice'

const TransactionList = () => {
  const [table, setTable] = useState('Transaction')

  return (
    <>
      <div className="d-flex  justify-content-between  mb-3">
        <CButton onClick={() => setTable('Transaction')} color={'primary'} key={1}>
          Dropping
        </CButton>
        <CButton onClick={() => setTable('Payment')} color={'primary'} key={1}>
          Storting
        </CButton>
      </div>
      {table === 'Transaction' ? <TransactionTable /> : <PaymentTable />}
    </>
  )
}

function TransactionTable() {
  const dispatch = useDispatch()
  const transactionList = useSelector((state) => state.transactions.transactionList)
  const transactionListStatus = useSelector((state) => state.transactions.transactionListStatus)
  const transactionByIdStatus = useSelector((state) => state.transactions.transactionByIdStatus)
  const paymentAll = useSelector((state) => state.transactions.paymentAll)
  const paymentAllStatus = useSelector((state) => state.transactions.paymentAllStatus)

  useEffect(() => {
    if (transactionListStatus === 'idle') {
      dispatch(fetchTransaction())
      dispatch(fetchAllPayment())
      dispatch(fetchEmployee())
    }
  }, [transactionListStatus, dispatch])

  useEffect(() => {
    if (transactionByIdStatus === 'succeeded') {
      dispatch(clearTransactionByIdStatus())
    }
  }, [transactionByIdStatus, dispatch])

  const columns = [
    { key: 'ktp', label: 'Kode Nasabah', _style: { width: '10%' } },
    { key: 'name', label: 'Peminjam', _style: { width: '10%' } },
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

function PaymentTable() {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [transactionID, setTransactionID] = useState('')
  const [paymentID, setPaymentID] = useState('')
  const [dueDate, setDueDate] = useState('')
  const transactionListStatus = useSelector((state) => state.transactions.transactionListStatus)
  const transactionByIdStatus = useSelector((state) => state.transactions.transactionByIdStatus)
  const paymentAll = useSelector((state) => state.payments.paymentAll)
  const employeeList = useSelector((state) => state.employees.employeeList)

  const createScheduleStatus = useSelector((state) => state.schedules.createScheduleStatus)
  console.log(createScheduleStatus)
  const canSave = createScheduleStatus === 'idle'
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm()

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const successToast = (
    <CToast title="CoreUI for React.js">
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#008000"></rect>
        </svg>
        <strong className="me-auto">Success</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Berhasil menambahkan data</CToastBody>
    </CToast>
  )

  const failedToast = (
    <CToast title="CoreUI for React.js">
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#FF0000"></rect>
        </svg>
        <strong className="me-auto">Failed</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Gagal menambahkan data!</CToastBody>
    </CToast>
  )

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.transaction_id = transactionID
        data.payment_id = paymentID
        const resultAction = await dispatch(createSchedule(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
      }
  }

  // React.useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({})
  //   }
  // }, [formState, isSubmitSuccessful, reset])

  useEffect(() => {
    if (transactionListStatus === 'idle') {
      dispatch(fetchTransaction())
      dispatch(fetchAllPayment())
      dispatch(fetchEmployee())
    }
  }, [transactionListStatus, dispatch])

  useEffect(() => {
    if (transactionByIdStatus === 'succeeded') {
      dispatch(clearTransactionByIdStatus())
    }
  }, [transactionByIdStatus, dispatch])

  useEffect(() => {
    if (createScheduleStatus === 'succeeded') {
      dispatch(clearCreateScheduleStatus())
    }
  }, [createScheduleStatus, dispatch])

  const columns = [
    { key: 'name', label: 'Nama Nasabah', _style: { width: '10%' } },
    { key: 'location', label: 'Lokasi', _style: { width: '1%' } },
    { key: 'number', label: 'Pinjaman ke', _style: { width: '10%' } },
    { key: 'payment_due', label: 'Harus Dibayarkan', _style: { width: '20%' } },
    { key: 'due_date', label: 'Tenggat Waktu', _style: { width: '20%' } },
    { key: 'action', label: 'Action' },
  ]

  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Pilih Mantri</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <div className=" d-flex justify-content-between">
              <div className="mb-3">
                <CFormSelect aria-label="Default select example" {...register('employee_id')}>
                  <option>Pilih mantri ...</option>
                  {employeeList.map((data, index) => {
                    return (
                      <option key={index} value={`${data.id}`}>
                        {data.name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </div>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton type="submit">Submit</CButton>
            </div>
          </CForm>
        </CModalBody>
      </CModal>
      {/* <CRow>
        <CCol>
          <CCard>
            <CCardBody className="w-100 overflow-auto"></CCardBody>
          </CCard>
        </CCol>
      </CRow> */}

      <CRow>
        <CCol>
          <CCard className="mb-5">
            <CCardHeader>
              <strong>List Payment</strong>
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
                items={paymentAll}
                columns={columns}
                columnFilter
                tableFilter
                cleaner
                itemsPerPageSelect
                itemsPerPage={10}
                columnSorter
                pagination
                scopedColumns={{
                  name: (item) => {
                    return <td>{item.transactions.customers.name}</td>
                  },
                  location: (item) => {
                    return (
                      <td>
                        <a href={item.transactions.customers.location}>{'link lokasi'}</a>
                      </td>
                    )
                  },
                  due_date: (item) => {
                    return <td>{moment(item.due_date).format('DD-MM-YYYY')}</td>
                  },
                  payment_due: (item) => {
                    return (
                      <td>
                        <NumberFormat
                          value={item.payment_due}
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
                          <CCol className="align-items-center">
                            <CButton
                              onClick={() => {
                                setVisible(!visible)
                                setTransactionID(item.transactions.id)
                                setPaymentID(item.id)
                                setDueDate(item.due_date)
                              }}
                            >
                              <CIcon icon={cilPeople} />
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
    </>
  )
}

export default TransactionList
