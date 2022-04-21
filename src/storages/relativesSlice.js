import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  relativeList: [],
  relativeListStatus: 'idle',
  relativeListError: null,
  relativeById: [],
  relativeByIdStatus: 'idle',
  relativeByIdError: null,
  createRelative: [],
  createRelativeStatus: 'idle',
  createRelativeError: null,
  relativeDelete: [],
  relativeDeleteStatus: 'idle',
  relativeDeleteError: null,
  relativeUpdate: [],
  relativeUpdateStatus: 'idle',
  relativeUpdateError: null,
}

export const fetchRelative = createAsyncThunk('relatives/fetchRelative', async () => {
  const response = await supabase.from('relatives').select()
  return response
})

export const fetchRelativeById = createAsyncThunk('relatives/fetchRelativeById', async (id) => {
  const response = await supabase.from('relatives').select('*').eq('id', id)
  return response
})

export const createRelative = createAsyncThunk('relatives/createRelative', async (data) => {
  const response = await supabase.from('relatives').insert([data])
  return response
})

export const deleteRelative = createAsyncThunk('relatives/deleteRelative', async (id) => {
  await supabase.from('relatives').delete().match({ id: id })
  return id
})

export const updateRelative = createAsyncThunk('relatives/updateRelative', async (updatedData) => {
  const { data, error } = await supabase
    .from('relatives')
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

const relativesSlice = createSlice({
  name: 'relatives',
  initialState,
  reducers: {
    clearRelativeList: (state) => {
      state.relativeList = []
    },
    clearRelativeListStatus: (state) => {
      state.relativeListStatus = 'idle'
    },
    clearRelativeByIdData: (state) => {
      state.relativeById = []
    },
    clearRelativeByIdStatus: (state) => {
      state.relativeByIdStatus = 'idle'
    },
    clearRelativeDeleteStatus: (state) => {
      state.relativeDeleteStatus = 'idle'
    },
    clearCreateRelativeStatus: (state) => {
      state.createRelativeStatus = 'idle'
    },
    clearRelativeUpdateStatus: (state) => {
      state.relativeUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchRelative.pending]: (state) => {
      state.relativeListStatus = 'loading'
    },
    [fetchRelative.fulfilled]: (state, action) => {
      state.relativeListStatus = 'succeeded'
      state.relativeList = action.payload.data
    },
    [fetchRelative.rejected]: (state, action) => {
      state.relativeListStatus = 'failed'
      state.relativeListError = action.error.message
    },
    [fetchRelativeById.pending]: (state) => {
      state.relativeByIdStatus = 'loading'
    },
    [fetchRelativeById.fulfilled]: (state, action) => {
      state.relativeByIdStatus = 'succeeded'
      state.relativeById = action.payload.data[0]
    },
    [fetchRelativeById.rejected]: (state, action) => {
      state.relativeByIdStatus = 'failed'
      state.relativeByIdError = action.error.message
    },
    [createRelative.pending]: (state) => {
      state.createRelativeStatus = 'loading'
    },
    [createRelative.fulfilled]: (state, action) => {
      state.createRelativeStatus = 'succeeded'
      state.relativeList = state.relativeList.concat(action.payload.data[0])
    },
    [createRelative.rejected]: (state, action) => {
      state.createRelativeStatus = 'failed'
      state.createRelativeError = action.error.message
    },
    [deleteRelative.pending]: (state) => {
      state.relativeDeleteStatus = 'loading'
    },
    [deleteRelative.fulfilled]: (state, action) => {
      state.relativeDeleteStatus = 'succeeded'
      state.relativeDelete = action.payload.data
      const array = current(state.relativeList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.relativeList = temp
    },
    [deleteRelative.rejected]: (state, action) => {
      state.relativeDeleteStatus = 'failed'
      state.relativeDeleteError = action.error.message
    },
    [updateRelative.pending]: (state) => {
      state.relativeUpdateStatus = 'loading'
    },
    [updateRelative.fulfilled]: (state, action) => {
      state.relativeUpdateStatus = 'succeeded'
      state.relativeUpdate = action.payload.data
    },
    [updateRelative.rejected]: (state, action) => {
      state.relativeUpdateStatus = 'failed'
      state.relativeUpdateError = action.error.message
    },
  },
})

export const {
  clearRelativeList,
  clearRelativeByIdData,
  clearRelativeByIdStatus,
  clearRelativeDeleteStatus,
  clearCreateRelativeStatus,
  clearRelativeUpdateStatus,
  clearRelativeListStatus,
} = relativesSlice.actions

export default relativesSlice.reducer
