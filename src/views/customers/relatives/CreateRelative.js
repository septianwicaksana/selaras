import React, { useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
import { clearCreateRelativeStatus, createRelative } from 'src/storages/relativesSlice'
import { useNavigate, useParams } from 'react-router-dom'

function CreateRelative() {
  const { id } = useParams()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const createRelativeStatus = useSelector((state) => state.relatives.createRelativeStatus)
  const canSave = createRelativeStatus === 'idle'
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm()
  const [visible, setVisible] = useState(false)

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
        const resultAction = await dispatch(createRelative(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
        dispatch(clearCreateRelativeStatus())
        setVisible(!visible)
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        relation: '',
        phone: '',
        address: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Tambah Relasi Lagi?</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="secondary" href={`/#/transactions/create-transaction/${id}`}>
            Tidak
          </CButton>
          <CButton onClick={() => setVisible(false)} color="primary">
            Ya
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Buat Relasi Baru</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <CFormLabel htmlFor="idNasabah">ID Nasabah</CFormLabel>
                  <CFormInput
                    type="text"
                    id="idNasabah"
                    placeholder=""
                    value={id}
                    {...register('customer_id')}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="nama">Nama Kerabat</CFormLabel>
                  <CFormInput type="text" id="nama" placeholder="" {...register('name')} />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="relasi">Relasi</CFormLabel>
                  <CFormInput type="text" id="relasi" placeholder="" {...register('relation')} />
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
                <div className=" d-flex justify-content-between">
                  <CButton href={`/#/relatives/${id}`} color={'danger'} className="mb-3">
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
    </>
  )
}

export default CreateRelative
