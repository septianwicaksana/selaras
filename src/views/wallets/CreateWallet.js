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
import { clearCreateWalletStatus, createWallet } from 'src/storages/walletsSlice'
import { fetchBranch } from 'src/storages/branchsSlice'

function CreateWallet() {
  const dispatch = useDispatch()

  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  const createWalletStatus = useSelector((state) => state.wallets.createWalletStatus)

  const canSave = createWalletStatus === 'idle'
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
        const resultAction = await dispatch(createWallet(data))
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
        dispatch(clearCreateWalletStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        amount: '',
        description: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
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
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput type="text" id="amount" placeholder="" {...register('amount')} />
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
