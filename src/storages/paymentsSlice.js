import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  attendanceList: [],
  attendanceListStatus: 'idle',
  attendanceListError: null,
  attendanceById: [],
  attendanceByIdStatus: 'idle',
  attendanceByIdError: null,
  createAttendance: [],
  createAttendanceStatus: 'idle',
  createAttendanceError: null,
  attendanceDelete: [],
  attendanceDeleteStatus: 'idle',
  attendanceDeleteError: null,
  attendanceUpdate: [],
  attendanceUpdateStatus: 'idle',
  attendanceUpdateError: null,
}

export const fetchAttendance = createAsyncThunk('attendances/fetchAttendance', async () => {
  const response = await supabase.from('attendances').select()
  return response
})

export const fetchAttendanceById = createAsyncThunk(
  'attendances/fetchAttendanceById',
  async (id) => {
    const response = await supabase.from('attendances').select('*').eq('id', id)
    return response
  },
)

export const createAttendance = createAsyncThunk('attendances/createAttendance', async (data) => {
  const response = await supabase.from('attendances').insert([data])
  return response
})

export const deleteAttendance = createAsyncThunk('attendances/deleteAttendance', async (id) => {
  await supabase.from('attendances').delete().match({ id: id })
  return id
})

export const updateAttendance = createAsyncThunk(
  'attendances/updateAttendance',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('attendances')
      .update({
        address: updatedData.address, //not-null
        branch_id: updatedData.branch_id,
        name: updatedData.name,
        ktp: updatedData.ktp,
        npwp: updatedData.npwp,
        phone: updatedData.phone,
        pob: updatedData.pob,
        dob: updatedData.dob,
        date: updatedData.date,
        position: updatedData.position,
      })
      .eq('id', updatedData.id)
    if (error) {
      alert(error.message)
    }
    return data
  },
)

const attendancesSlice = createSlice({
  name: 'attendances',
  initialState,
  reducers: {
    clearAttendanceList: (state) => {
      state.attendanceList = []
    },
    clearAttendanceListStatus: (state) => {
      state.attendanceListStatus = 'idle'
    },
    clearAttendanceByIdData: (state) => {
      state.attendanceById = []
    },
    clearAttendanceByIdStatus: (state) => {
      state.attendanceByIdStatus = 'idle'
    },
    clearAttendanceDeleteStatus: (state) => {
      state.attendanceDeleteStatus = 'idle'
    },
    clearCreateAttendanceStatus: (state) => {
      state.createAttendanceStatus = 'idle'
    },
    clearAttendanceUpdateStatus: (state) => {
      state.attendanceUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchAttendance.pending]: (state) => {
      state.attendanceListStatus = 'loading'
    },
    [fetchAttendance.fulfilled]: (state, action) => {
      state.attendanceListStatus = 'succeeded'
      state.attendanceList = action.payload.data
    },
    [fetchAttendance.rejected]: (state, action) => {
      state.attendanceListStatus = 'failed'
      state.attendanceListError = action.error.message
    },
    [fetchAttendanceById.pending]: (state) => {
      state.attendanceByIdStatus = 'loading'
    },
    [fetchAttendanceById.fulfilled]: (state, action) => {
      state.attendanceByIdStatus = 'succeeded'
      state.attendanceById = action.payload.data[0]
    },
    [fetchAttendanceById.rejected]: (state, action) => {
      state.attendanceByIdStatus = 'failed'
      state.attendanceByIdError = action.error.message
    },
    [createAttendance.pending]: (state) => {
      state.createAttendanceStatus = 'loading'
    },
    [createAttendance.fulfilled]: (state, action) => {
      state.createAttendanceStatus = 'succeeded'
      state.attendanceList = state.attendanceList.concat(action.payload.data[0])
    },
    [createAttendance.rejected]: (state, action) => {
      state.createAttendanceStatus = 'failed'
      state.createAttendanceError = action.error.message
    },
    [deleteAttendance.pending]: (state) => {
      state.attendanceDeleteStatus = 'loading'
    },
    [deleteAttendance.fulfilled]: (state, action) => {
      state.attendanceDeleteStatus = 'succeeded'
      state.attendanceDelete = action.payload.data
      const array = current(state.attendanceList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.attendanceList = temp
    },
    [deleteAttendance.rejected]: (state, action) => {
      state.attendanceDeleteStatus = 'failed'
      state.attendanceDeleteError = action.error.message
    },
    [updateAttendance.pending]: (state) => {
      state.attendanceUpdateStatus = 'loading'
    },
    [updateAttendance.fulfilled]: (state, action) => {
      state.attendanceUpdateStatus = 'succeeded'
      state.attendanceUpdate = action.payload.data
    },
    [updateAttendance.rejected]: (state, action) => {
      state.attendanceUpdateStatus = 'failed'
      state.attendanceUpdateError = action.error.message
    },
  },
})

export const {
  clearAttendanceList,
  clearAttendanceByIdData,
  clearAttendanceByIdStatus,
  clearAttendanceDeleteStatus,
  clearCreateAttendanceStatus,
  clearAttendanceUpdateStatus,
  clearAttendanceListStatus,
} = attendancesSlice.actions

export default attendancesSlice.reducer
