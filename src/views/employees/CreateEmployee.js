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
import { fetchBranch } from 'src/storages/branchsSlice'
import { clearCreateEmployeeStatus, createEmployee } from 'src/storages/employeesSlice'

function CreateEmployee() {
  const dispatch = useDispatch()

  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  const createEmployeeStatus = useSelector((state) => state.employees.createEmployeeStatus)
  const canSave = createEmployeeStatus === 'idle'
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
        const resultAction = await dispatch(createEmployee(data))
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
        dispatch(clearCreateEmployeeStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        branch_id: '',
        name: '',
        ktp: '',
        npwp: '',
        phone: '',
        address: '',
        pob: '',
        dob: '',
        date: '',
        position: '',
      })
    }
  }, [formState, isSubmitSuccessful, reset])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Karyawan Baru</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              {branchList ? (
                <div className="mb-3">
                  <CFormLabel htmlFor="namaCabang">Cabang</CFormLabel>
                  <CFormSelect aria-label="namaCabang" {...register('branch_id')}>
                    {branchList.map((data) => (
                      <option value={data.id} key={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              ) : (
                <div className="mb-3">
                  <CFormLabel htmlFor="namaCabang">Cabang</CFormLabel>
                  <CFormSelect aria-label="namaCabang" {...register('branch_id')}>
                    <option>no data</option>
                  </CFormSelect>
                </div>
              )}
              <div className="mb-3">
                <CFormLabel htmlFor="namaKaryawan">Nama</CFormLabel>
                <CFormInput type="text" id="namaKaryawan" {...register('name')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ktpKaryawan">KTP</CFormLabel>
                <CFormInput type="text" id="ktpKaryawan" placeholder="" {...register('ktp')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="npwpKaryawan">NPWP</CFormLabel>
                <CFormInput type="text" id="npwpKaryawan" placeholder="" {...register('npwp')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phoneKaryawan">Phone</CFormLabel>
                <CFormInput type="text" id="phoneKaryawan" placeholder="" {...register('phone')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="alamatCabang">Alamat</CFormLabel>
                <CFormInput type="alamat" id="alamatCabang" {...register('address')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tempatLahir">Tempat Lahir</CFormLabel>
                <CFormInput type="text" id="tempatLahir" placeholder="" {...register('pob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalLahir">Tanggal Lahir</CFormLabel>
                <CFormInput type="date" id="tanggalLahir" placeholder="" {...register('dob')} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalAwalMasuk">Tanggal Masuk</CFormLabel>
                <CFormInput
                  type="date"
                  id="tanggalAwalMasuk"
                  placeholder=""
                  {...register('date')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="jabatan">Jabatan</CFormLabel>
                <CFormInput type="text" id="jabatan" placeholder="" {...register('position')} />
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

export default CreateEmployee
