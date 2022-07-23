import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { clearCreateTransactionStatus, createTransaction } from 'src/storages/transactionsSlice'
import { fetchEmployee } from 'src/storages/employeesSlice'
import { fetchCustomer, fetchCustomerById } from 'src/storages/customersSlice'
import { fetchBranch } from 'src/storages/branchsSlice'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useAuth } from 'src/contexts/Auth'

function CreateSchedule() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  let userId = user.id
  const customerId = useParams('id')

  const employeeList = useSelector((state) => state.employees.employeeList)
  const employeeListStatus = useSelector((state) => state.employees.employeeListStatus)

  useEffect(() => {
    if (employeeListStatus === 'idle') {
      dispatch(fetchEmployee())
    }
  }, [employeeListStatus, dispatch])

  const customerById = useSelector((state) => state.customers.customerById)
  const customerByIdStatus = useSelector((state) => state.customers.customerByIdStatus)
  useEffect(() => {
    if (customerByIdStatus === 'idle') {
      dispatch(fetchCustomerById(customerId.id))
    }
  }, [customerByIdStatus, dispatch, customerId])

  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  const createTransactionStatus = useSelector((state) => state.transactions.createTransactionStatus)

  const canSave = createTransactionStatus === 'idle'
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm()
  const watchFields = watch(['amount'])

  useEffect(() => {
    setValue(
      'remaining_payment',
      parseFloat(watchFields[0]) + (parseFloat(watchFields[0]) * 30) / 100,
    )
  }, [watchFields])

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
        const resultAction = await dispatch(createTransaction(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
        dispatch(clearCreateTransactionStatus())
      }
  }

  // React.useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       employee_id: '',
  //       customer_id: '',
  //       branch_id: '',
  //       tenor: 0,
  //       type: '',
  //       amount: 0,
  //       paid_amount: 0,
  //       remaining_payment: 0,
  //     })
  //   }
  // }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Transaksi Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="namaPegawai">Pegawai</CFormLabel>
                <CFormInput
                  type="text"
                  id="employee_id"
                  placeholder=""
                  value={userId}
                  readOnly
                  {...register('employee_id')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCustomer">Nasabah</CFormLabel>
                <CFormInput
                  type="text"
                  id="employee_id"
                  placeholder=""
                  value={customerId.id}
                  readOnly
                  {...register('customer_id')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="code">Kode</CFormLabel>
                <CFormInput
                  value={customerById.code}
                  type="number"
                  id="code"
                  placeholder=""
                  readOnly
                  {...register('code')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaBranch">Cabang</CFormLabel>
                <CFormSelect aria-label="namaBranch" {...register('branch_id')}>
                  {branchList.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Tenor">Tenor</CFormLabel>
                <CFormSelect type="number" aria-label="Tenor" {...register('tenor')}>
                  <option value={10} key={1}>
                    10 Weeks
                  </option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Type">Type</CFormLabel>
                <CFormSelect aria-label="Type" {...register('type')}>
                  <option value="weekly" key={1}>
                    Weekly
                  </option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput type="number" id="amount" placeholder="" {...register('amount')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="paidAmount">Paid Amount</CFormLabel>
                <CFormInput
                  type="text"
                  id="paidAmount"
                  placeholder=""
                  value={0}
                  {...register('paid_amount')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="remainingPayment">Remaining Amount</CFormLabel>
                <CFormInput
                  type="text"
                  id="remainingPayment"
                  placeholder=""
                  {...register('remaining_payment')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalPinjam">Tanggal Peminjaman</CFormLabel>
                <CFormInput type="date" id="tanggalPinjam" {...register('date')} />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/transactiones" color={'danger'} className="mb-3">
                  Cancel
                </CButton>
                <CButton type="submit" className="mb-3">
                  Submit
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateSchedule
