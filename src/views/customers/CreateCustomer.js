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
import {
  clearCreateCustomerStatus,
  createCustomer,
  fetchCustomer,
} from 'src/storages/customersSlice'
import { useNavigate } from 'react-router-dom'

function CreateCustomer() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [customerID, setCustomerID] = useState('')
  const createCustomerStatus = useSelector((state) => state.customers.createCustomerStatus)
  const canSave = createCustomerStatus === 'idle'
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
        const resultAction = await dispatch(createCustomer(data))
        unwrapResult(resultAction)
        setCustomerID(resultAction.payload.data[0].id)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({})
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Nasabah Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCabang">Nama</CFormLabel>
                <CFormInput type="text" id="namaCabang" placeholder="" {...register('name')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ktpNasabah">KTP</CFormLabel>
                <CFormInput type="text" id="ktpNasabah" placeholder="" {...register('ktp')} />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="phoneNasabah">Nomor Hp</CFormLabel>
                <CFormInput type="text" id="phoneNasabah" placeholder="" {...register('phone')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="addressNasabah">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="addressNasabah"
                  placeholder=""
                  {...register('address')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="addressNasabah">Lokasi</CFormLabel>
                <CFormInput
                  type="text"
                  id="addressNasabah"
                  placeholder=""
                  {...register('location')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="pos">Kode Pos</CFormLabel>
                <CFormInput type="number" id="pos" placeholder="" {...register('pos')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="pobNasabah">Tempat Lahir</CFormLabel>
                <CFormInput type="text" id="pobNasabah" placeholder="" {...register('pob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="dobNasabah">Tanggal Lahir</CFormLabel>
                <CFormInput type="date" id="dobNasabah" placeholder="" {...register('dob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="job">Pekerjaan</CFormLabel>
                <CFormInput type="text" id="job" placeholder="" {...register('job')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="rent">Status Tempat Tinggal</CFormLabel>
                <CFormInput type="text" id="rent" placeholder="" {...register('rent')} />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/customers" color={'danger'} className="mb-3">
                  Cancel
                </CButton>
                {customerID ? (
                  <>
                    <CButton href={`/#/relatives/create-relative/${customerID}`} className="mb-3">
                      Next
                    </CButton>
                  </>
                ) : (
                  <>
                    <CButton type="submit" className="mb-3">
                      Submit
                    </CButton>
                  </>
                )}
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateCustomer
