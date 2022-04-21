import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  walletList: [],
  walletListStatus: 'idle',
  walletListError: null,
  walletById: [],
  walletByIdStatus: 'idle',
  walletByIdError: null,
  createWallet: [],
  createWalletStatus: 'idle',
  createWalletError: null,
  walletDelete: [],
  walletDeleteStatus: 'idle',
  walletDeleteError: null,
  walletUpdate: [],
  walletUpdateStatus: 'idle',
  walletUpdateError: null,
}

export const fetchWallet = createAsyncThunk('wallets/fetchWallet', async () => {
  const response = await supabase.from('wallets').select()
  return response
})

export const fetchWalletById = createAsyncThunk('wallets/fetchWalletById', async (id) => {
  const response = await supabase.from('wallets').select('*').eq('id', id)
  return response
})

export const createWallet = createAsyncThunk('wallets/createWallet', async (data) => {
  const response = await supabase.from('wallets').insert([data])
  return response
})

export const deleteWallet = createAsyncThunk('wallets/deleteWallet', async (id) => {
  await supabase.from('wallets').delete().match({ id: id })
  return id
})

export const updateWallet = createAsyncThunk('wallets/updateWallet', async (updatedData) => {
  const { data, error } = await supabase
    .from('wallets')
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

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    clearWalletList: (state) => {
      state.walletList = []
    },
    clearWalletListStatus: (state) => {
      state.walletListStatus = 'idle'
    },
    clearWalletByIdData: (state) => {
      state.walletById = []
    },
    clearWalletByIdStatus: (state) => {
      state.walletByIdStatus = 'idle'
    },
    clearWalletDeleteStatus: (state) => {
      state.walletDeleteStatus = 'idle'
    },
    clearCreateWalletStatus: (state) => {
      state.createWalletStatus = 'idle'
    },
    clearWalletUpdateStatus: (state) => {
      state.walletUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchWallet.pending]: (state) => {
      state.walletListStatus = 'loading'
    },
    [fetchWallet.fulfilled]: (state, action) => {
      state.walletListStatus = 'succeeded'
      state.walletList = action.payload.data
    },
    [fetchWallet.rejected]: (state, action) => {
      state.walletListStatus = 'failed'
      state.walletListError = action.error.message
    },
    [fetchWalletById.pending]: (state) => {
      state.walletByIdStatus = 'loading'
    },
    [fetchWalletById.fulfilled]: (state, action) => {
      state.walletByIdStatus = 'succeeded'
      state.walletById = action.payload.data[0]
    },
    [fetchWalletById.rejected]: (state, action) => {
      state.walletByIdStatus = 'failed'
      state.walletByIdError = action.error.message
    },
    [createWallet.pending]: (state) => {
      state.createWalletStatus = 'loading'
    },
    [createWallet.fulfilled]: (state, action) => {
      state.createWalletStatus = 'succeeded'
      state.walletList = state.walletList.concat(action.payload.data[0])
    },
    [createWallet.rejected]: (state, action) => {
      state.createWalletStatus = 'failed'
      state.createWalletError = action.error.message
    },
    [deleteWallet.pending]: (state) => {
      state.walletDeleteStatus = 'loading'
    },
    [deleteWallet.fulfilled]: (state, action) => {
      state.walletDeleteStatus = 'succeeded'
      state.walletDelete = action.payload.data
      const array = current(state.walletList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.walletList = temp
    },
    [deleteWallet.rejected]: (state, action) => {
      state.walletDeleteStatus = 'failed'
      state.walletDeleteError = action.error.message
    },
    [updateWallet.pending]: (state) => {
      state.walletUpdateStatus = 'loading'
    },
    [updateWallet.fulfilled]: (state, action) => {
      state.walletUpdateStatus = 'succeeded'
      state.walletUpdate = action.payload.data
    },
    [updateWallet.rejected]: (state, action) => {
      state.walletUpdateStatus = 'failed'
      state.walletUpdateError = action.error.message
    },
  },
})

export const {
  clearWalletList,
  clearWalletByIdData,
  clearWalletByIdStatus,
  clearWalletDeleteStatus,
  clearCreateWalletStatus,
  clearWalletUpdateStatus,
  clearWalletListStatus,
} = walletsSlice.actions

export default walletsSlice.reducer
