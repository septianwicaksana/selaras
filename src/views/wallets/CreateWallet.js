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
import { clearCreateWalletStatus, createWallet } from 'src/storages/walletsSlice'
import { fetchBranch } from 'src/storages/branchsSlice'
import { fetchEmployee } from 'src/storages/employeesSlice'

function CreateWallet() {
  const dispatch = useDispatch()

  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  const employeeList = useSelector((state) => state.employees.employeeList)
  const employeeListStatus = useSelector((state) => state.employees.employeeListStatus)

  useEffect(() => {
    if (employeeListStatus === 'idle') {
      dispatch(fetchEmployee())
    }
  }, [employeeListStatus, dispatch])

  const createWalletStatus = useSelector((state) => state.wallets.createWalletStatus)

  const canSave = createWalletStatus === 'idle'
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
        const resultAction = await dispatch(createWallet(data))
        console.log(resultAction)
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
        dispatch(clearCreateWalletStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        total: '',
        description: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Dompet Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" {...register('name')} />
              </div>
              {branchList ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="branch">Cabang</CFormLabel>
                  <CFormSelect aria-label="branch" {...register('branch_id')}>
                    {branchList.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              ) : (
                <div className="mb-3">
                  <CFormLabel htmlFor="wallet">Wallet</CFormLabel>
                  <CFormSelect aria-label="wallet" {...register('wallet_id')}>
                    <option>no data</option>
                  </CFormSelect>
                </div>
              )}
              {employeeList ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="branch">Pegawai</CFormLabel>
                  <CFormSelect aria-label="branch" {...register('employee_id')}>
                    <option value={''}></option>
                    {employeeList.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              ) : (
                <div className="mb-3">
                  <CFormLabel htmlFor="wallet">Wallet</CFormLabel>
                  <CFormSelect aria-label="wallet" {...register('wallet_id')}>
                    <option>no data</option>
                  </CFormSelect>
                </div>
              )}
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput type="text" id="total" placeholder="" {...register('total')} />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="description"
                  placeholder=""
                  {...register('description')}
                />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/wallets" color={'danger'} className="mb-3">
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

export default CreateWallet
