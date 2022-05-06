import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWallet, deleteWallet, clearWalletByIdStatus } from 'src/storages/walletsSlice'

const WalletList = () => {
  const dispatch = useDispatch()
  const walletList = useSelector((state) => state.wallets.walletList)
  const walletListStatus = useSelector((state) => state.wallets.walletListStatus)
  const walletByIdStatus = useSelector((state) => state.wallets.walletByIdStatus)

  useEffect(() => {
    if (walletListStatus === 'idle') {
      dispatch(fetchWallet())
    }
  }, [walletListStatus, dispatch])

  useEffect(() => {
    if (walletByIdStatus === 'succeeded') {
      dispatch(clearWalletByIdStatus())
    }
  }, [walletByIdStatus, dispatch])

  const columns = [
    {
      key: 'name',
    },
    { key: 'amount' },
    { key: 'action', filter: false, sorter: false },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/wallets/create-wallet" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Dompet</strong>
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
              items={walletList}
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
                            href={`/#/walletes/detail-wallet/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/walletes/edit-wallet/${item.id}`}
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
                              dispatch(deleteWallet(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
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

export default WalletList
