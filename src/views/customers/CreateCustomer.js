import React, { useState } from 'react'
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
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { clearCreateCustomerStatus, createCustomer } from 'src/storages/customersSlice'
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

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createCustomer(data))
        unwrapResult(resultAction)
        setCustomerID(resultAction.payload.data[0].id)
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
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({})
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
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
                <CFormLabel htmlFor="npwpNasabah">NPWP</CFormLabel>
                <CFormInput type="text" id="npwpNasabah" placeholder="" {...register('npwp')} />
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
                <CFormLabel htmlFor="pobNasabah">Tempat Lahir</CFormLabel>
                <CFormInput type="text" id="pobNasabah" placeholder="" {...register('pob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="dobNasabah">Tanggal Lahir</CFormLabel>
                <CFormInput type="date" id="dobNasabah" placeholder="" {...register('dob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="bankName">Nama Pemegang Rekening</CFormLabel>
                <CFormInput type="text" id="bankName" placeholder="" {...register('bank_name')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="dobNasabah">Nomor Rekening</CFormLabel>
                <CFormInput
                  type="text"
                  id="dobNasabah"
                  placeholder=""
                  {...register('bank_account')}
                />
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
