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
import { fetchEmployee, fetchEmployeeById } from 'src/storages/employeesSlice'
import { fetchCustomer } from 'src/storages/customersSlice'
import { fetchBranch } from 'src/storages/branchsSlice'
import { useParams, Navigate } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { createPayment, fetchPaymentById } from 'src/storages/paymentsSlice'

function MakePayment() {
  const dispatch = useDispatch()
  const userId = sessionStorage.getItem('userId')
  const paymentId = useParams().id
  console.log(paymentId)

  const employeeById = useSelector((state) => state.employees.employeeById)
  const employeeByIdStatus = useSelector((state) => state.employees.employeeByIdStatus)

  useEffect(() => {
    if (employeeByIdStatus === 'idle') {
      dispatch(fetchEmployeeById(userId))
    }
  }, [employeeByIdStatus, dispatch])

  const paymentById = useSelector((state) => state.payments.paymentById)
  const paymentByIdStatus = useSelector((state) => state.payments.paymentByIdStatus)

  const createPaymentStatus = useSelector((state) => state.transactions.createPaymentStatus)

  const canSave = createPaymentStatus === 'idle'
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
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
        const resultAction = await dispatch(createPayment(data))
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

  useEffect(() => {
    if (paymentByIdStatus === 'idle') {
      dispatch(fetchPaymentById(paymentId))
    }
  }, [paymentByIdStatus, dispatch])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Pembayaran</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <CFormLabel htmlFor="namaPegawai">No Transaksi</CFormLabel>
                  <CFormInput
                    type="text"
                    id="employee_id"
                    value={paymentById.transaction_id}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Tenor">Pembayaran ke</CFormLabel>
                  <CFormInput type="number" value={paymentById.number} readOnly />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="Tenor">Dana yg harus diterima</CFormLabel>
                  <CFormInput type="text" value={paymentById.payment_due} readOnly />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="amount">Tenggat</CFormLabel>
                  <CFormInput
                    type="text"
                    value={moment(paymentById.due_date).format('DD-MM-YYYY')}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="status">Dana diterima</CFormLabel>
                  <CFormInput type="text" id="status" placeholder="" />
                </div>

                <div className=" d-flex justify-content-between">
                  <CButton href="/#/transactiones" color={'danger'} className="mb-3">
                    Cancel
                  </CButton>
                  <CButton type="submit" className="mb-3">
                    Pay
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MakePayment
