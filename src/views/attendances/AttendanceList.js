import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowThickBottom, cilPencil, cilSearch, cilTrash } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAttendance,
  deleteAttendance,
  clearAttendanceByIdStatus,
} from 'src/storages/attendancesSlice'
import moment from 'moment'

const AttendanceList = () => {
  const dispatch = useDispatch()
  const attendanceList = useSelector((state) => state.attendances.attendanceList)
  const attendanceListStatus = useSelector((state) => state.attendances.attendanceListStatus)
  const attendanceByIdStatus = useSelector((state) => state.attendances.attendanceByIdStatus)

  useEffect(() => {
    if (attendanceListStatus === 'idle') {
      dispatch(fetchAttendance())
    }
  }, [attendanceListStatus, dispatch])

  useEffect(() => {
    if (attendanceByIdStatus === 'succeeded') {
      dispatch(clearAttendanceByIdStatus())
    }
  }, [attendanceByIdStatus, dispatch])

  const columns = [
    {
      key: 'employee_id',
      label: 'Nama',
    },
    { key: 'date', label: 'waktu' },
  ]

  return (
    <CRow>
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
              items={attendanceList}
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
                  return <td>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                },
                action: (item) => {
                  return (
                    <td>
                      <CRow className=" px-2" xs={{ gutterX: 1, gutterY: 2 }}>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/attendances/detail-attendance/${item.id}`}
                            color={'info'}
                            size="sm"
                            key={1}
                          >
                            <CIcon icon={cilSearch} />
                          </CButton>
                        </CCol>
                        <CCol className="align-items-center">
                          <CButton
                            href={`/#/attendances/edit-attendance/${item.id}`}
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
                              dispatch(deleteAttendance(item.id))
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

export default AttendanceList
