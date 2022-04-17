import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  branchList: [],
  branchListStatus: 'idle',
  branchListError: null,
  branchById: [],
  branchByIdStatus: 'idle',
  branchByIdError: null,
  createBranch: [],
  createBranchStatus: 'idle',
  createBranchError: null,
  branchDelete: [],
  branchDeleteStatus: 'idle',
  branchDeleteError: null,
  branchUpdate: [],
  branchUpdateStatus: 'idle',
  branchUpdateError: null,
}

export const fetchBranch = createAsyncThunk('branchs/fetchBranch', async () => {
  const response = await supabase.from('branchs').select()
  return response
})

export const fetchBranchById = createAsyncThunk('branchs/fetchBranchById', async (id) => {
  const response = await supabase.from('branchs').select('*').eq('id', id)
  return response
})

export const createBranch = createAsyncThunk('branchs/createBranch', async (data) => {
  const response = await supabase.from('branchs').insert([data])
  return response
})

export const deleteBranch = createAsyncThunk('branchs/deleteBranch', async (id) => {
  await supabase.from('branchs').delete().match({ id: id })
  return id
})

export const updateBranch = createAsyncThunk('branchs/updateBranch', async (updatedData) => {
  const { data, error } = await supabase
    .from('branchs')
    .update({
      name: updatedData.name,
      address: updatedData.address,
    })
    .eq('id', updatedData.id)
  if (error) {
    alert(error.message)
  }
  return data
})

const branchsSlice = createSlice({
  name: 'branchs',
  initialState,
  reducers: {
    clearBranchList: (state) => {
      state.branchList = []
    },
    clearBranchListStatus: (state) => {
      state.branchListStatus = 'idle'
    },
    clearBranchByIdData: (state) => {
      state.branchById = []
    },
    clearBranchByIdStatus: (state) => {
      state.branchByIdStatus = 'idle'
    },
    clearBranchDeleteStatus: (state) => {
      state.branchDeleteStatus = 'idle'
    },
    clearCreateBranchStatus: (state) => {
      state.createBranchStatus = 'idle'
    },
    clearBranchUpdateStatus: (state) => {
      state.branchUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchBranch.pending]: (state) => {
      state.branchListStatus = 'loading'
    },
    [fetchBranch.fulfilled]: (state, action) => {
      state.branchListStatus = 'succeeded'
      state.branchList = action.payload.data
    },
    [fetchBranch.rejected]: (state, action) => {
      state.branchListStatus = 'failed'
      state.branchListError = action.error.message
    },
    [fetchBranchById.pending]: (state) => {
      state.branchByIdStatus = 'loading'
    },
    [fetchBranchById.fulfilled]: (state, action) => {
      state.branchByIdStatus = 'succeeded'
      state.branchById = action.payload.data[0]
    },
    [fetchBranchById.rejected]: (state, action) => {
      state.branchByIdStatus = 'failed'
      state.branchByIdError = action.error.message
    },
    [createBranch.pending]: (state) => {
      state.createBranchStatus = 'loading'
    },
    [createBranch.fulfilled]: (state, action) => {
      state.createBranchStatus = 'succeeded'
      state.branchList = state.branchList.concat(action.payload.data[0])
    },
    [createBranch.rejected]: (state, action) => {
      state.createBranchStatus = 'failed'
      state.createBranchError = action.error.message
    },
    [deleteBranch.pending]: (state) => {
      state.branchDeleteStatus = 'loading'
    },
    [deleteBranch.fulfilled]: (state, action) => {
      state.branchDeleteStatus = 'succeeded'
      state.branchDelete = action.payload.data
      const array = current(state.branchList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.branchList = temp
    },
    [deleteBranch.rejected]: (state, action) => {
      state.branchDeleteStatus = 'failed'
      state.branchDeleteError = action.error.message
    },
    [updateBranch.pending]: (state) => {
      state.branchUpdateStatus = 'loading'
    },
    [updateBranch.fulfilled]: (state, action) => {
      state.branchUpdateStatus = 'succeeded'
      state.branchUpdate = action.payload.data
    },
    [updateBranch.rejected]: (state, action) => {
      state.branchUpdateStatus = 'failed'
      state.branchUpdateError = action.error.message
    },
  },
})

export const {
  clearBranchList,
  clearBranchByIdData,
  clearBranchByIdStatus,
  clearBranchDeleteStatus,
  clearCreateBranchStatus,
  clearBranchUpdateStatus,
  clearBranchListStatus,
} = branchsSlice.actions

export default branchsSlice.reducer
