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
import { clearCreateHolidayStatus, createHoliday } from 'src/storages/holidaysSlice'

function CreateHoliday() {
  const dispatch = useDispatch()
  const createHolidayStatus = useSelector((state) => state.holidays.createHolidayStatus)
  const canSave = createHolidayStatus === 'idle'
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
        const resultAction = await dispatch(createHoliday(data))
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
        dispatch(clearCreateHolidayStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        date: '',
        description: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Buat Hari Libur</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="date">Tanggal Libur</CFormLabel>
                <CFormInput type="date" id="date" {...register('date')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="description">Deskripsi</CFormLabel>
                <CFormInput type="text" id="description" {...register('description')} />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/holidays" color={'danger'} className="mb-3">
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

export default CreateHoliday
