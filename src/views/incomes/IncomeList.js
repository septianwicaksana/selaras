import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIncome, deleteIncome, clearIncomeByIdStatus } from 'src/storages/incomesSlice'
import moment from 'moment'
import NumberFormat from 'react-number-format'

const IncomeList = () => {
  const dispatch = useDispatch()
  const incomeList = useSelector((state) => state.incomes.incomeList)
  const incomeListStatus = useSelector((state) => state.incomes.incomeListStatus)
  const incomeByIdStatus = useSelector((state) => state.incomes.incomeByIdStatus)

  useEffect(() => {
    if (incomeListStatus === 'idle') {
      dispatch(fetchIncome())
    }
  }, [incomeListStatus, dispatch])

  useEffect(() => {
    if (incomeByIdStatus === 'succeeded') {
      dispatch(clearIncomeByIdStatus())
    }
  }, [incomeByIdStatus, dispatch])

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
        <CButton href="/#/incomes/create-income" color={'primary'} key={1}>
          <CIcon icon={cilPlus} className="me-2" />
          New
        </CButton>
      </div>
      <CCol>
        <CCard className="mb-5">
          <CCardHeader>
            <strong>List Pendapatan</strong>
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
              items={incomeList}
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
                        value={parseFloat(item.total)}
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
                        <CCol className="align-items-center">
                          <CButton
                            onClick={() => {
                              dispatch(deleteIncome(item.id))
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

export default IncomeList
