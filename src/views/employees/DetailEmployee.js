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
  CFormSelect,
} from '@coreui/react-pro'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearEmployeeListStatus,
  clearEmployeeUpdateStatus,
  fetchEmployeeById,
  updateEmployee,
} from 'src/storages/employeesSlice'
import currency from 'currency.js'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchBranch } from 'src/storages/branchsSlice'
const DetailEmployee = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const employeeById = useSelector((state) => state.employees.employeeById)
  const employeeByIdStatus = useSelector((state) => state.employees.employeeByIdStatus)
  const employeeUpdateStatus = useSelector((state) => state.employees.employeeUpdateStatus)

  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  const createBranchStatus = useSelector((state) => state.branchs.createBranchStatus)
  //   const canSave = createBranchStatus === 'idle'

  const { register, handleSubmit, reset } = useForm()

  const IDR = (value) => currency(value, { symbol: 'Rp. ', precision: 2 })

  useEffect(() => {
    if (employeeByIdStatus === 'idle') {
      dispatch(fetchEmployeeById(id))
    }
    reset({
      address: employeeById.address, //not-null
      branch_id: employeeById.branch_id,
      name: employeeById.name,
      ktp: employeeById.ktp,
      npwp: employeeById.npwp,
      phone: employeeById.phone,
      pob: employeeById.pob,
      dob: employeeById.dob,
      date: employeeById.date,
      position: employeeById.position,
    })
  }, [id, employeeById, employeeByIdStatus, reset, dispatch])

  const canSave = employeeUpdateStatus === 'idle'

  const onSubmit = async (data) => {
    if (canSave)
      try {
        console.log(data)
        data.id = id
        const resultAction = await dispatch(updateEmployee(data))
        unwrapResult(resultAction)
      } catch (error) {
        if (error) throw alert('gagal memperbaharui data')
      } finally {
        dispatch(clearEmployeeUpdateStatus())
        dispatch(clearEmployeeListStatus())
        navigate('/employees')
      }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detail Informasi Karyawan</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="idKaryawan">ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="idKaryawan"
                  value={employeeById.id}
                  {...register('id')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaCabang">Cabang</CFormLabel>
                <CFormSelect aria-label="namaCabang" {...register('branch_id')} disabled>
                  {branchList.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="namaKaryawan">Nama</CFormLabel>
                <CFormInput
                  type="text"
                  id="namaKaryawan"
                  placeholder="Mitra Fajar Selaras"
                  {...register('name')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="ktpKaryawan">KTP</CFormLabel>
                <CFormInput
                  type="text"
                  id="ktpKaryawan"
                  placeholder=""
                  {...register('ktp')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="npwpKaryawan">NPWP</CFormLabel>
                <CFormInput
                  type="text"
                  id="npwpKaryawan"
                  placeholder=""
                  {...register('npwp')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phoneKaryawan">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phoneKaryawan"
                  placeholder=""
                  {...register('phone')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="alamatKaryawan">Alamat</CFormLabel>
                <CFormInput
                  type="alamat"
                  id="alamatKaryawan"
                  placeholder="Komplek Rukan PTC Blok 8C No. 28-29 Pulogadung, RW.3, Rw. Terate, Kec. Cakung, Jakarta, Daerah Khusus Ibukota Jakarta 13920"
                  {...register('address')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tempatLahir">Tempat Lahir</CFormLabel>
                <CFormInput
                  type="text"
                  id="tempatLahir"
                  placeholder=""
                  {...register('pob')}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalLahir">Tanggal Lahir</CFormLabel>
                <CFormInput
                  type="text"
                  id="tanggalLahir"
                  placeholder=""
                  {...register('dob')}
                  value={employeeById.dob}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="tanggalAwalMasuk">Tanggal Masuk</CFormLabel>
                <CFormInput
                  type="text"
                  id="tanggalAwalMasuk"
                  placeholder=""
                  {...register('date')}
                  value={employeeById.date}
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="jabatan">Jabatan</CFormLabel>
                <CFormInput
                  type="text"
                  id="jabatan"
                  placeholder=""
                  {...register('position')}
                  disabled
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DetailEmployee
