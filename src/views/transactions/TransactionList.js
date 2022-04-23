import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
  cilArrowThickBottom,
  cilHistory,
  cilPencil,
  cilPeople,
  cilPlus,
  cilSearch,
  cilTrash,
} from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTransaction,
  deleteTransaction,
  clearTransactionByIdStatus,
} from 'src/storages/transactionsSlice'

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactionList = useSelector((state) => state.transactions.transactionList)
  const transactionListStatus = useSelector((state) => state.transactions.transactionListStatus)
  const transactionByIdStatus = useSelector((state) => state.transactions.transactionByIdStatus)

  useEffect(() => {
    if (transactionListStatus === 'idle') {
      dispatch(fetchTransaction())
    }
  }, [transactionListStatus, dispatch])

  useEffect(() => {
    if (transactionByIdStatus === 'succeeded') {
      dispatch(clearTransactionByIdStatus())
    }
  }, [transactionByIdStatus, dispatch])

  const columns = [
    {
      key: 'branch_id',
      _style: { width: '10%' },
    },
    { key: 'customer_id', _style: { width: '10%' } },
    { key: 'amount', _style: { width: '10%' } },
    { key: 'paid_amount', _style: { width: '20%' } },
    { key: 'remaining_payment', _style: { width: '20%' } },
    { key: 'action', filter: false, sorter: false, _style: { width: '30%' } },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/transactions/create-transaction" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Transaction</strong>
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
              items={transactionList}
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
                            href={`/#/transactiones/detail-transaction/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactiones/edit-transaction/${item.id}`}
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
                              dispatch(deleteTransaction(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/transactions/payments/${item.id}`}
                            color={'primary'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilHistory} />
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

export default TransactionList
