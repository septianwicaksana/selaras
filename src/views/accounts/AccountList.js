import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount, deleteAccount, clearAccountByIdStatus } from 'src/storages/accountsSlice'

const AccountList = () => {
  const dispatch = useDispatch()
  const accountList = useSelector((state) => state.accounts.accountList)
  const accountListStatus = useSelector((state) => state.accounts.accountListStatus)
  const accountByIdStatus = useSelector((state) => state.accounts.accountByIdStatus)

  useEffect(() => {
    if (accountListStatus === 'idle') {
      dispatch(fetchAccount())
    }
  }, [accountListStatus, dispatch])

  useEffect(() => {
    if (accountByIdStatus === 'succeeded') {
      dispatch(clearAccountByIdStatus())
    }
  }, [accountByIdStatus, dispatch])

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
        <CButton href="/#/accountes/create-account" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Absen</strong>
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
              items={accountList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/accountes/detail-account/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/accountes/edit-account/${item.id}`}
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
                              dispatch(deleteAccount(item.id))
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
                // show_details: (item) => {
                //   return (
                //     <td className="py-2">
                //       <CButton
                //         color="primary"
                //         variant="outline"
                //         shape="square"
                //         size="sm"
                //         onClick={() => {
                //           toggleDetails(item.id)
                //         }}
                //       >
                //         {details.includes(item.id) ? 'Hide' : 'Show'}
                //       </CButton>
                //     </td>
                //   )
                // },
                // details: (item) => {
                //   return (
                //     <CCollapse visible={details.includes(item.id)}>
                //       <CCardBody>
                //         <h5>This for details</h5>
                //       </CCardBody>
                //     </CCollapse>
                //   )
                // },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AccountList
