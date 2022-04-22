import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  holidayList: [],
  holidayListStatus: 'idle',
  holidayListError: null,
  holidayById: [],
  holidayByIdStatus: 'idle',
  holidayByIdError: null,
  createHoliday: [],
  createHolidayStatus: 'idle',
  createHolidayError: null,
  holidayDelete: [],
  holidayDeleteStatus: 'idle',
  holidayDeleteError: null,
  holidayUpdate: [],
  holidayUpdateStatus: 'idle',
  holidayUpdateError: null,
}

export const fetchHoliday = createAsyncThunk('holidays/fetchHoliday', async () => {
  const response = await supabase.from('holidays').select()
  return response
})

export const fetchHolidayById = createAsyncThunk('holidays/fetchHolidayById', async (id) => {
  const response = await supabase.from('holidays').select('*').eq('id', id)
  return response
})

export const createHoliday = createAsyncThunk('holidays/createHoliday', async (data) => {
  const response = await supabase.from('holidays').insert([data])
  return response
})

export const deleteHoliday = createAsyncThunk('holidays/deleteHoliday', async (id) => {
  await supabase.from('holidays').delete().match({ id: id })
  return id
})

export const updateHoliday = createAsyncThunk('holidays/updateHoliday', async (updatedData) => {
  const { data, error } = await supabase
    .from('holidays')
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
})

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {
    clearHolidayList: (state) => {
      state.holidayList = []
    },
    clearHolidayListStatus: (state) => {
      state.holidayListStatus = 'idle'
    },
    clearHolidayByIdData: (state) => {
      state.holidayById = []
    },
    clearHolidayByIdStatus: (state) => {
      state.holidayByIdStatus = 'idle'
    },
    clearHolidayDeleteStatus: (state) => {
      state.holidayDeleteStatus = 'idle'
    },
    clearCreateHolidayStatus: (state) => {
      state.createHolidayStatus = 'idle'
    },
    clearHolidayUpdateStatus: (state) => {
      state.holidayUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchHoliday.pending]: (state) => {
      state.holidayListStatus = 'loading'
    },
    [fetchHoliday.fulfilled]: (state, action) => {
      state.holidayListStatus = 'succeeded'
      state.holidayList = action.payload.data
    },
    [fetchHoliday.rejected]: (state, action) => {
      state.holidayListStatus = 'failed'
      state.holidayListError = action.error.message
    },
    [fetchHolidayById.pending]: (state) => {
      state.holidayByIdStatus = 'loading'
    },
    [fetchHolidayById.fulfilled]: (state, action) => {
      state.holidayByIdStatus = 'succeeded'
      state.holidayById = action.payload.data[0]
    },
    [fetchHolidayById.rejected]: (state, action) => {
      state.holidayByIdStatus = 'failed'
      state.holidayByIdError = action.error.message
    },
    [createHoliday.pending]: (state) => {
      state.createHolidayStatus = 'loading'
    },
    [createHoliday.fulfilled]: (state, action) => {
      state.createHolidayStatus = 'succeeded'
      state.holidayList = state.holidayList.concat(action.payload.data[0])
    },
    [createHoliday.rejected]: (state, action) => {
      state.createHolidayStatus = 'failed'
      state.createHolidayError = action.error.message
    },
    [deleteHoliday.pending]: (state) => {
      state.holidayDeleteStatus = 'loading'
    },
    [deleteHoliday.fulfilled]: (state, action) => {
      state.holidayDeleteStatus = 'succeeded'
      state.holidayDelete = action.payload.data
      const array = current(state.holidayList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.holidayList = temp
    },
    [deleteHoliday.rejected]: (state, action) => {
      state.holidayDeleteStatus = 'failed'
      state.holidayDeleteError = action.error.message
    },
    [updateHoliday.pending]: (state) => {
      state.holidayUpdateStatus = 'loading'
    },
    [updateHoliday.fulfilled]: (state, action) => {
      state.holidayUpdateStatus = 'succeeded'
      state.holidayUpdate = action.payload.data
    },
    [updateHoliday.rejected]: (state, action) => {
      state.holidayUpdateStatus = 'failed'
      state.holidayUpdateError = action.error.message
    },
  },
})

export const {
  clearHolidayList,
  clearHolidayByIdData,
  clearHolidayByIdStatus,
  clearHolidayDeleteStatus,
  clearCreateHolidayStatus,
  clearHolidayUpdateStatus,
  clearHolidayListStatus,
} = holidaysSlice.actions

export default holidaysSlice.reducer
