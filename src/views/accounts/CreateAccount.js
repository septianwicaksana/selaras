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
import { clearCreateAccountStatus, createAccount } from 'src/storages/accountsSlice'

function CreateAccount() {
  const dispatch = useDispatch()
  const createAccountStatus = useSelector((state) => state.accounts.createAccountStatus)
  const canSave = createAccountStatus === 'idle'
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
        const resultAction = await dispatch(createAccount(data))
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
        dispatch(clearCreateAccountStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        category: '',
        ledger: '',
        name: '',
        description: '',
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
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormInput type="text" id="category" placeholder="" {...register('category')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ledger">Ledger</CFormLabel>
                <CFormInput type="text" id="ledger" placeholder="" {...register('ledger')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput type="text" id="name" placeholder="" {...register('name')} />
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
                <CButton href="/#/accounts" color={'danger'} className="mb-3">
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

export default CreateAccount
