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
  CRow,
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearBranchListStatus,
  clearBranchUpdateStatus,
  fetchBranchById,
  updateBranch,
} from 'src/storages/branchsSlice'
import currency from 'currency.js'
import { unwrapResult } from '@reduxjs/toolkit'

const EditBranch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const branchById = useSelector((state) => state.branchs.branchById)
  const branchByIdStatus = useSelector((state) => state.branchs.branchByIdStatus)
  const branchUpdateStatus = useSelector((state) => state.branchs.branchUpdateStatus)
  const { register, handleSubmit, reset } = useForm()

  const IDR = (value) => currency(value, { symbol: 'Rp. ', precision: 2 })

  useEffect(() => {
    if (branchByIdStatus === 'idle') {
      dispatch(fetchBranchById(id))
    }
    reset({
      name: branchById.name, //null
      address: branchById.address, //not-null
    })
  }, [id, branchById, branchByIdStatus, reset, dispatch])

  const canSave = branchUpdateStatus === 'idle'

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id
        const resultAction = await dispatch(updateBranch(data))
        unwrapResult(resultAction)
      } catch (error) {
        if (error) throw alert('gagal memperbaharui data')
      } finally {
        dispatch(clearBranchUpdateStatus())
        dispatch(clearBranchListStatus())
        navigate('/branches')
      }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detail Informasi Cabang</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="idCabang">ID Cabang</CFormLabel>
                <CFormInput
                  type="text"
                  id="idCabang"
                  value={branchById.id}
                  {...register('id')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCabang">Nama</CFormLabel>
                <CFormInput type="text" id="namaCabang" {...register('name')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="alamatCabang">Alamat</CFormLabel>
                <CFormInput type="text" id="alamatCabang" {...register('address')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="cashCabang">Cash Cabang</CFormLabel>
                <CFormInput
                  type="text"
                  id="cashCabang"
                  value={IDR(branchById.amount).format(true)}
                  {...register('amount')}
                  disabled
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

export default EditBranch
