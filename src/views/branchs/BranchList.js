import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBranch, deleteBranch, clearBranchByIdStatus } from 'src/storages/branchsSlice'
import moment from 'moment'

const BranchList = () => {
  const dispatch = useDispatch()
  const branchList = useSelector((state) => state.branchs.branchList)
  const branchListStatus = useSelector((state) => state.branchs.branchListStatus)
  const branchByIdStatus = useSelector((state) => state.branchs.branchByIdStatus)

  useEffect(() => {
    if (branchListStatus === 'idle') {
      dispatch(fetchBranch())
    }
  }, [branchListStatus, dispatch])

  useEffect(() => {
    if (branchByIdStatus === 'succeeded') {
      dispatch(clearBranchByIdStatus())
    }
  }, [branchByIdStatus, dispatch])

  const columns = [
    {
      key: 'name',
      _style: { width: '40%' },
    },
    { key: 'address', _style: { width: '20%' } },
    { key: 'amount', _style: { width: '10%' } },
    { key: 'created_at', filter: false, sorter: false },
    { key: 'action', filter: false, sorter: false },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/branches/create-branch" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Cabang</strong>
          </CCardHeader>
          <CCardBody className="w-100 overflow-auto">
            <CSmartTable
              sorterValue={{ column: 'created_at', state: 'desc' }}
              clickableRows
              tableProps={{
                striped: false,
                hover: true,
              }}
              activePage={3}
              items={branchList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                created_at: (item) => {
                  return <td>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/branches/detail-branch/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/branches/edit-branch/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deleteBranch(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton color={'primary'} size="sm" key={1}>
                            <CIcon icon={cilArrowThickBottom} />
                          </CButton>
                        </CCol>
                      </CRow>
                    </td>
                  )
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BranchList
