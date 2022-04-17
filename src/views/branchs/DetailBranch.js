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
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBranchById } from 'src/storages/branchsSlice'
import currency from 'currency.js'
import moment from 'moment'

const DetailBranch = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const branchById = useSelector((state) => state.branchs.branchById)
  const branchByIdStatus = useSelector((state) => state.branchs.branchByIdStatus)
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  const IDR = (value) => currency(value, { symbol: 'Rp. ', precision: 2 })

  useEffect(() => {
    if (branchByIdStatus === 'idle') {
      dispatch(fetchBranchById(id))
    }
  }, [id, branchByIdStatus, dispatch])

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
                <CFormInput
                  type="text"
                  id="namaCabang"
                  value={branchById.name}
                  {...register('name')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="alamatCabang">Alamat</CFormLabel>
                <CFormInput
                  type="text"
                  id="alamatCabang"
                  value={branchById.address}
                  {...register('address')}
                  disabled
                />
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
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalDibuat">Tanggal Pembuatan Cabang</CFormLabel>
                <CFormInput
                  type="text"
                  id="tanggalDibuat"
                  value={moment(branchById.created_at).format('Y-m-d H:m:s')}
                  {...register('created_at')}
                  disabled
                />
              </div>
              <div className=" d-flex justify-content-between">
                <CButton href="/#/branches" color={'danger'} className="mb-3">
                  Back
                </CButton>
                <div></div>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DetailBranch
