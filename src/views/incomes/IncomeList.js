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

const IncomeList = () => {
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
            <strong>Income List</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">This table contains brances list.</p>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CUSTOMER</CTableHeaderCell>
                  <CTableHeaderCell scope="col">DATE</CTableHeaderCell>
                  <CTableHeaderCell scope="col">AMOUNT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">STATUS</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ACTION</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>654882164</CTableDataCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>16 September 2022</CTableDataCell>
                  <CTableDataCell>Rp. 7.000.000</CTableDataCell>
                  <CTableDataCell>SETTLED</CTableDataCell>
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

export default IncomeList
