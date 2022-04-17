import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'

const ExpenseList = () => {
  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Employee List</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">This table contains brances list.</p>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">NAME</CTableHeaderCell>
                  <CTableHeaderCell scope="col">POSITION</CTableHeaderCell>
                  <CTableHeaderCell scope="col">PHONE</CTableHeaderCell>
                  <CTableHeaderCell scope="col">BIRTHDATE</CTableHeaderCell>
                  <CTableHeaderCell scope="col">BRANCH</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ACTION</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>BRANCH MANAGER</CTableDataCell>
                  <CTableDataCell>+6281 1112 2022</CTableDataCell>
                  <CTableDataCell>16 September 1997</CTableDataCell>
                  <CTableDataCell>PULOGADUNG</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex justify-content-between gap-2">
                      <CButton color={'info'} size="sm" key={1}>
                        <CIcon icon={cilSearch} />
                      </CButton>
                      <CButton color={'secondary'} size="sm" key={1}>
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton color={'danger'} size="sm" key={1}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ExpenseList
