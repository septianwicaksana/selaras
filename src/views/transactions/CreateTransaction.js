import React, { useEffect } from 'react'
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
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { clearCreateTransactionStatus, createTransaction } from 'src/storages/transactionsSlice'
import { fetchEmployee } from 'src/storages/employeesSlice'
import { fetchCustomer } from 'src/storages/customersSlice'
import { fetchBranch } from 'src/storages/branchsSlice'

function CreateTransaction() {
  const dispatch = useDispatch()

  const employeeList = useSelector((state) => state.employees.employeeList)
  const employeeListStatus = useSelector((state) => state.employees.employeeListStatus)

  useEffect(() => {
    if (employeeListStatus === 'idle') {
      dispatch(fetchEmployee())
    }
  }, [employeeListStatus, dispatch])

  const customerList = useSelector((state) => state.customers.customerList)
  const customerListStatus = useSelector((state) => state.customers.customerListStatus)

  useEffect(() => {
    if (customerListStatus === 'idle') {
      dispatch(fetchCustomer())
    }
  }, [customerListStatus, dispatch])

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

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createTransaction(data))
        unwrapResult(resultAction)
        if (resultAction.payload.status === 201) {
          return (
            <CToast
              autohide={false}
              visible={true}
              color="primary"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>Hello, world! This is a toast message.</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )
        }
      } catch (error) {
        if (error)
          return (
            <CToast
              autohide={false}
              visible={true}
              color="primary"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>Hello, world! This is a toast message.</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )
      } finally {
        dispatch(clearCreateTransactionStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        // employee_id: '',
        // customer_id: '',
        // branch_id: '',
        // tenor: 0,
        // type: '',
        // amount: 0,
        // paid_amount: 0,
        // remaining_payment: 0,
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Transaksi Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="namaPegawai">Pegawai</CFormLabel>
                <CFormSelect aria-label="namaPegawai" {...register('employee_id')}>
                  {employeeList.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCustomer">Nasabah</CFormLabel>
                <CFormSelect aria-label="namaCustomer" {...register('customer_id')}>
                  {customerList.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </CFormSelect>
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
                <CFormInput type="date" id="tanggalPinjam" placeholder="" {...register('date')} />
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

export default CreateTransaction
