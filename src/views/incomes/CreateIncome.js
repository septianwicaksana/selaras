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
import { fetchAccount } from 'src/storages/accountsSlice'
import { clearWalletUpdateStatus, fetchWallet, updateWallet } from 'src/storages/walletsSlice'
import { clearCreateIncomeStatus, createIncome } from 'src/storages/incomesSlice'

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
  } = useForm()

  const onSubmit = async (data) => {
    if (canSave)
      try {
        console.log(data)
        let walletData = walletList.find((p) => p.id === data.wallet_id)
        walletData['amount'] = parseFloat(walletData.amount) + parseFloat(data.amount)
        console.log(walletData['amount'])
        // const resultAction = await dispatch(createIncome(data))
        // const resultAction2 = await dispatch(updateWallet(walletData))
        // unwrapResult(resultAction)
        // unwrapResult(resultAction2)
        // if (resultAction.payload.status === 201 && resultAction2.payload.status === 201) {
        //   alert('berhasil')
        // }
      } catch (error) {
        alert('gagal')
      } finally {
        dispatch(clearCreateIncomeStatus())
        dispatch(clearWalletUpdateStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        wallet_id: '',
        account_id: '',
        note: '',
        date: '',
        amount: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
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
                        {data.name} - {data.amount}
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
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput type="text" id="amount" placeholder="" {...register('amount')} />
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

export default CreateIncome
