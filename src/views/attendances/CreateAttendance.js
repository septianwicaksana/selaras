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
import { clearCreateAttendanceStatus, createAttendance } from 'src/storages/attendancesSlice'
import moment from 'moment'
function CreateAttendance() {
  const dispatch = useDispatch()
  const createAttendanceStatus = useSelector((state) => state.attendances.createAttendanceStatus)
  const canSave = createAttendanceStatus === 'idle'
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
        const resultAction = await dispatch(createAttendance(data))
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
        dispatch(clearCreateAttendanceStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        employee_id: '',
        date: '',
        location: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Absensi Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="employeeID">Employee ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="employeeID"
                  placeholder="Mitra Fajar Selaras"
                  {...register('employee_id')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalAbsensi">date</CFormLabel>
                <CFormInput
                  type="text"
                  id="tanggalAbsensi"
                  // value={moment(new Date()).format('L')}
                  value={new Date()}
                  {...register('date')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="lokasiAbsensi">Lokasi</CFormLabel>
                <CFormInput type="text" id="lokasiAbsensi" value="" {...register('location')} />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/attendances" color={'danger'} className="mb-3">
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

export default CreateAttendance
