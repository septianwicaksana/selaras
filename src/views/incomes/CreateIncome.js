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
  CToaster,
  CToastHeader,
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchAccount } from 'src/storages/accountsSlice'
import { clearWalletUpdateStatus, fetchWallet, updateWallet } from 'src/storages/walletsSlice'
import { clearCreateIncomeStatus, createIncome } from 'src/storages/incomesSlice'
import { useRef } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format'

function CreateIncome() {
  const dispatch = useDispatch()

  const walletList = useSelector((state) => state.wallets.walletList)
  const walletListStatus = useSelector((state) => state.wallets.walletListStatus)

  const accountList = useSelector((state) => state.accounts.accountList)
  const accountListStatus = useSelector((state) => state.accounts.accountListStatus)

  useEffect(() => {
    if (walletListStatus === 'idle') {
      dispatch(fetchWallet())
    }
  }, [walletListStatus, dispatch])

  useEffect(() => {
    if (accountListStatus === 'idle') {
      dispatch(fetchAccount())
    }
  }, [accountListStatus, dispatch])

  const createIncomeStatus = useSelector((state) => state.incomes.createIncomeStatus)

  const canSave = createIncomeStatus === 'idle'
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    watch,
  } = useForm()

  const watchTotal = watch(['total'])

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
        const resultAction = await dispatch(createIncome(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          addToast(successToast)
        }
      } catch (error) {
        if (error) return addToast(failedToast)
      } finally {
        dispatch(clearCreateIncomeStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        account_id: '',
        wallet_id: '',
        total: '',
        date: '',
        note: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Pendapatan Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              {walletList ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="wallet">Wallet</CFormLabel>
                  <CFormSelect aria-label="wallet" {...register('wallet_id')}>
                    {walletList.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.name} - {data.total}
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
              {accountList ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="account">Account</CFormLabel>
                  <CFormSelect aria-label="account" {...register('account_id')}>
                    {accountList.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.ledger} - {data.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              ) : (
                <div className="mb-3">
                  <CFormLabel htmlFor="account">Account</CFormLabel>
                  <CFormSelect aria-label="account" {...register('account_id')}>
                    <option>no data</option>
                  </CFormSelect>
                </div>
              )}
              <div className="mb-3">
                <CFormLabel htmlFor="note">Note</CFormLabel>
                <CFormInput type="text" id="note" {...register('note')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="date">Date</CFormLabel>
                <CFormInput type="date" id="date" placeholder="" {...register('date')} />
              </div>

              <CRow>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel htmlFor="total">Total</CFormLabel>
                    <CFormInput type="text" id="total" placeholder="" {...register('total')} />
                  </div>
                </CCol>
                <CCol>
                  <div className="mb-3">
                    <CFormLabel htmlFor="totalR">Total in Rp</CFormLabel>
                    <CFormInput
                      type="text"
                      id="totalR"
                      placeholder=""
                      value={new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(watchTotal)}
                      disabled
                      readOnly
                    />
                  </div>
                </CCol>
              </CRow>
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

export default CreateIncome
