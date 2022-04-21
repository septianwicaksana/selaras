import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  accountList: [],
  accountListStatus: 'idle',
  accountListError: null,
  accountById: [],
  accountByIdStatus: 'idle',
  accountByIdError: null,
  createAccount: [],
  createAccountStatus: 'idle',
  createAccountError: null,
  accountDelete: [],
  accountDeleteStatus: 'idle',
  accountDeleteError: null,
  accountUpdate: [],
  accountUpdateStatus: 'idle',
  accountUpdateError: null,
}

export const fetchAccount = createAsyncThunk('accounts/fetchAccount', async () => {
  const response = await supabase.from('accounts').select()
  return response
})

export const fetchAccountById = createAsyncThunk('accounts/fetchAccountById', async (id) => {
  const response = await supabase.from('accounts').select('*').eq('id', id)
  return response
})

export const createAccount = createAsyncThunk('accounts/createAccount', async (data) => {
  const response = await supabase.from('accounts').insert([data])
  return response
})

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', async (id) => {
  await supabase.from('accounts').delete().match({ id: id })
  return id
})

export const updateAccount = createAsyncThunk('accounts/updateAccount', async (updatedData) => {
  const { data, error } = await supabase
    .from('accounts')
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

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearAccountList: (state) => {
      state.accountList = []
    },
    clearAccountListStatus: (state) => {
      state.accountListStatus = 'idle'
    },
    clearAccountByIdData: (state) => {
      state.accountById = []
    },
    clearAccountByIdStatus: (state) => {
      state.accountByIdStatus = 'idle'
    },
    clearAccountDeleteStatus: (state) => {
      state.accountDeleteStatus = 'idle'
    },
    clearCreateAccountStatus: (state) => {
      state.createAccountStatus = 'idle'
    },
    clearAccountUpdateStatus: (state) => {
      state.accountUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchAccount.pending]: (state) => {
      state.accountListStatus = 'loading'
    },
    [fetchAccount.fulfilled]: (state, action) => {
      state.accountListStatus = 'succeeded'
      state.accountList = action.payload.data
    },
    [fetchAccount.rejected]: (state, action) => {
      state.accountListStatus = 'failed'
      state.accountListError = action.error.message
    },
    [fetchAccountById.pending]: (state) => {
      state.accountByIdStatus = 'loading'
    },
    [fetchAccountById.fulfilled]: (state, action) => {
      state.accountByIdStatus = 'succeeded'
      state.accountById = action.payload.data[0]
    },
    [fetchAccountById.rejected]: (state, action) => {
      state.accountByIdStatus = 'failed'
      state.accountByIdError = action.error.message
    },
    [createAccount.pending]: (state) => {
      state.createAccountStatus = 'loading'
    },
    [createAccount.fulfilled]: (state, action) => {
      state.createAccountStatus = 'succeeded'
      state.accountList = state.accountList.concat(action.payload.data[0])
    },
    [createAccount.rejected]: (state, action) => {
      state.createAccountStatus = 'failed'
      state.createAccountError = action.error.message
    },
    [deleteAccount.pending]: (state) => {
      state.accountDeleteStatus = 'loading'
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.accountDeleteStatus = 'succeeded'
      state.accountDelete = action.payload.data
      const array = current(state.accountList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.accountList = temp
    },
    [deleteAccount.rejected]: (state, action) => {
      state.accountDeleteStatus = 'failed'
      state.accountDeleteError = action.error.message
    },
    [updateAccount.pending]: (state) => {
      state.accountUpdateStatus = 'loading'
    },
    [updateAccount.fulfilled]: (state, action) => {
      state.accountUpdateStatus = 'succeeded'
      state.accountUpdate = action.payload.data
    },
    [updateAccount.rejected]: (state, action) => {
      state.accountUpdateStatus = 'failed'
      state.accountUpdateError = action.error.message
    },
  },
})

export const {
  clearAccountList,
  clearAccountByIdData,
  clearAccountByIdStatus,
  clearAccountDeleteStatus,
  clearCreateAccountStatus,
  clearAccountUpdateStatus,
  clearAccountListStatus,
} = accountsSlice.actions

export default accountsSlice.reducer
