import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  historyList: [],
  historyListStatus: 'idle',
  historyListError: null,
  historyById: [],
  historyByIdStatus: 'idle',
  historyByIdError: null,
  createHistory: [],
  createHistoryStatus: 'idle',
  createHistoryError: null,
  historyDelete: [],
  historyDeleteStatus: 'idle',
  historyDeleteError: null,
  historyUpdate: [],
  historyUpdateStatus: 'idle',
  historyUpdateError: null,
}

export const fetchHistory = createAsyncThunk('historys/fetchHistory', async () => {
  const response = await supabase.from('historys').select()
  return response
})

export const fetchHistoryById = createAsyncThunk('historys/fetchHistoryById', async (id) => {
  const response = await supabase.from('historys').select('*').eq('id', id)
  return response
})

export const createHistory = createAsyncThunk('historys/createHistory', async (data) => {
  const response = await supabase.from('historys').insert([data])
  return response
})

export const deleteHistory = createAsyncThunk('historys/deleteHistory', async (id) => {
  await supabase.from('historys').delete().match({ id: id })
  return id
})

export const updateHistory = createAsyncThunk('historys/updateHistory', async (updatedData) => {
  const { data, error } = await supabase
    .from('historys')
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

const historysSlice = createSlice({
  name: 'historys',
  initialState,
  reducers: {
    clearHistoryList: (state) => {
      state.historyList = []
    },
    clearHistoryListStatus: (state) => {
      state.historyListStatus = 'idle'
    },
    clearHistoryByIdData: (state) => {
      state.historyById = []
    },
    clearHistoryByIdStatus: (state) => {
      state.historyByIdStatus = 'idle'
    },
    clearHistoryDeleteStatus: (state) => {
      state.historyDeleteStatus = 'idle'
    },
    clearCreateHistoryStatus: (state) => {
      state.createHistoryStatus = 'idle'
    },
    clearHistoryUpdateStatus: (state) => {
      state.historyUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchHistory.pending]: (state) => {
      state.historyListStatus = 'loading'
    },
    [fetchHistory.fulfilled]: (state, action) => {
      state.historyListStatus = 'succeeded'
      state.historyList = action.payload.data
    },
    [fetchHistory.rejected]: (state, action) => {
      state.historyListStatus = 'failed'
      state.historyListError = action.error.message
    },
    [fetchHistoryById.pending]: (state) => {
      state.historyByIdStatus = 'loading'
    },
    [fetchHistoryById.fulfilled]: (state, action) => {
      state.historyByIdStatus = 'succeeded'
      state.historyById = action.payload.data[0]
    },
    [fetchHistoryById.rejected]: (state, action) => {
      state.historyByIdStatus = 'failed'
      state.historyByIdError = action.error.message
    },
    [createHistory.pending]: (state) => {
      state.createHistoryStatus = 'loading'
    },
    [createHistory.fulfilled]: (state, action) => {
      state.createHistoryStatus = 'succeeded'
      state.historyList = state.historyList.concat(action.payload.data[0])
      state.createHistory = state.createHistory.concat(action.payload.data[0])
    },
    [createHistory.rejected]: (state, action) => {
      state.createHistoryStatus = 'failed'
      state.createHistoryError = action.error.message
    },
    [deleteHistory.pending]: (state) => {
      state.historyDeleteStatus = 'loading'
    },
    [deleteHistory.fulfilled]: (state, action) => {
      state.historyDeleteStatus = 'succeeded'
      state.historyDelete = action.payload.data
      const array = current(state.historyList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.historyList = temp
    },
    [deleteHistory.rejected]: (state, action) => {
      state.historyDeleteStatus = 'failed'
      state.historyDeleteError = action.error.message
    },
    [updateHistory.pending]: (state) => {
      state.historyUpdateStatus = 'loading'
    },
    [updateHistory.fulfilled]: (state, action) => {
      state.historyUpdateStatus = 'succeeded'
      state.historyUpdate = action.payload.data
    },
    [updateHistory.rejected]: (state, action) => {
      state.historyUpdateStatus = 'failed'
      state.historyUpdateError = action.error.message
    },
  },
})

export const {
  clearHistoryList,
  clearHistoryByIdData,
  clearHistoryByIdStatus,
  clearHistoryDeleteStatus,
  clearCreateHistoryStatus,
  clearHistoryUpdateStatus,
  clearHistoryListStatus,
} = historysSlice.actions

export default historysSlice.reducer
