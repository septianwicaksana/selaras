import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpense, deleteExpense, clearExpenseByIdStatus } from 'src/storages/expensesSlice'
import moment from 'moment'
import NumberFormat from 'react-number-format'

const ExpenseList = () => {
  const dispatch = useDispatch()
  const expenseList = useSelector((state) => state.expenses.expenseList)
  const expenseListStatus = useSelector((state) => state.expenses.expenseListStatus)
  const expenseByIdStatus = useSelector((state) => state.expenses.expenseByIdStatus)

  useEffect(() => {
    if (expenseListStatus === 'idle') {
      dispatch(fetchExpense())
    }
  }, [expenseListStatus, dispatch])

  useEffect(() => {
    if (expenseByIdStatus === 'succeeded') {
      dispatch(clearExpenseByIdStatus())
    }
  }, [expenseByIdStatus, dispatch])

  const columns = [
    {
      key: 'date',
      _style: { width: '40%' },
    },
    { key: 'name', _style: { width: '20%' } },
    { key: 'note', _style: { width: '20%' } },
    { key: 'total', _style: { width: '20%' } },
    { key: 'action', filter: false, sorter: false, _style: { width: '30%' } },
  ]

  return (
    <CRow>
      <div className="d-flex  justify-content-end  mb-3">
        <CButton href="/#/expenses/create-expense" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Pengeluaran</strong>
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
              items={expenseList}
              columns={columns}
              columnFilter
              tableFilter
              cleaner
              itemsPerPageSelect
              itemsPerPage={5}
              columnSorter
              pagination
              scopedColumns={{
                date: (item) => {
                  return <td>{moment(item.date).format('L')}</td>
                },
                total: (item) => {
                  return (
                    <td>
                      <NumberFormat
                        value={item.total}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </td>
                  )
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/expensees/detail-expense/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol> */}
                        {/* <CCol className="align-items-center">
                          <CButton
                            href={`/#/expensees/edit-expense/${item.id}`}
                            color={'secondary'}
                            size="sm"
                            key={2}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                        </CCol> */}
                        <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deleteExpense(item.id))
                            }}
                            color={'danger'}
                            size="sm"
                            key={3}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                        {/* <CCol className="align-items-center">
                          <CButton color={'primary'} size="sm" key={1}>
                            <CIcon icon={cilArrowThickBottom} />
                          </CButton>
                        </CCol> */}
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

export default ExpenseList
