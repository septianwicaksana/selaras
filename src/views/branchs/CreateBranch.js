import React from 'react'
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
import { clearCreateBranchStatus, createBranch } from 'src/storages/branchsSlice'

function CreateBranch() {
  const dispatch = useDispatch()
  const createBranchStatus = useSelector((state) => state.branchs.createBranchStatus)
  const canSave = createBranchStatus === 'idle'
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
        const resultAction = await dispatch(createBranch(data))
        console.log(resultAction)
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
        dispatch(clearCreateBranchStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        address: '',
        amount: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Cabang Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCabang">Nama</CFormLabel>
                <CFormInput
                  type="text"
                  id="namaCabang"
                  placeholder="Mitra Fajar Selaras"
                  {...register('name')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="alamatCabang">Alamat</CFormLabel>
                <CFormInput
                  type="alamat"
                  id="alamatCabang"
                  placeholder="Komplek Rukan PTC Blok 8C No. 28-29 Pulogadung, RW.3, Rw. Terate, Kec. Cakung, Jakarta, Daerah Khusus Ibukota Jakarta 13920"
                  {...register('address')}
                />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/branches" color={'danger'} className="mb-3">
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

export default CreateBranch
