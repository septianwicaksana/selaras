import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  transactionList: [],
  transactionListStatus: 'idle',
  transactionListError: null,
  transactionById: [],
  transactionByIdStatus: 'idle',
  transactionByIdError: null,
  createTransaction: [],
  createTransactionStatus: 'idle',
  createTransactionError: null,
  transactionDelete: [],
  transactionDeleteStatus: 'idle',
  transactionDeleteError: null,
  transactionUpdate: [],
  transactionUpdateStatus: 'idle',
  transactionUpdateError: null,
}

export const fetchTransaction = createAsyncThunk('transactions/fetchTransaction', async () => {
  const response = await supabase
    .from('transactions')
    .select(
      `id,amount,paid_amount,
  remaining_payment,
  customers ( name, ktp ),
  branchs ( name )`,
    )
    .order('created_at', { ascending: false })
  return response
})

export const fetchTransactionById = createAsyncThunk(
  'transactions/fetchTransactionById',
  async (id) => {
    const response = await supabase.from('transactions').select('*').eq('id', id)
    return response
  },
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (data) => {
    const response = await supabase.from('transactions').insert([data])
    return response
  },
)

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (id) => {
  await supabase.from('transactions').delete().match({ id: id })
  return id
})

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('transactions')
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

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactionList: (state) => {
      state.transactionList = []
    },
    clearTransactionListStatus: (state) => {
      state.transactionListStatus = 'idle'
    },
    clearTransactionByIdData: (state) => {
      state.transactionById = []
    },
    clearTransactionByIdStatus: (state) => {
      state.transactionByIdStatus = 'idle'
    },
    clearTransactionDeleteStatus: (state) => {
      state.transactionDeleteStatus = 'idle'
    },
    clearCreateTransactionStatus: (state) => {
      state.createTransactionStatus = 'idle'
    },
    clearTransactionUpdateStatus: (state) => {
      state.transactionUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchTransaction.pending]: (state) => {
      state.transactionListStatus = 'loading'
    },
    [fetchTransaction.fulfilled]: (state, action) => {
      state.transactionListStatus = 'succeeded'
      if (action.payload.data.length > 0) {
        for (var i = 0; i < action.payload.data.length; i++) {
          state.transactionList[i] = {
            ...action.payload.data[i],
            ...action.payload.data[i].customers,
          }
        }
      }
    },
    [fetchTransaction.rejected]: (state, action) => {
      state.transactionListStatus = 'failed'
      state.transactionListError = action.error.message
    },
    [fetchTransactionById.pending]: (state) => {
      state.transactionByIdStatus = 'loading'
    },
    [fetchTransactionById.fulfilled]: (state, action) => {
      state.transactionByIdStatus = 'succeeded'
      state.transactionById = action.payload.data[0]
    },
    [fetchTransactionById.rejected]: (state, action) => {
      state.transactionByIdStatus = 'failed'
      state.transactionByIdError = action.error.message
    },
    [createTransaction.pending]: (state) => {
      state.createTransactionStatus = 'loading'
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.createTransactionStatus = 'succeeded'
      state.transactionList = state.transactionList.concat(action.payload.data[0])
    },
    [createTransaction.rejected]: (state, action) => {
      state.createTransactionStatus = 'failed'
      state.createTransactionError = action.error.message
    },
    [deleteTransaction.pending]: (state) => {
      state.transactionDeleteStatus = 'loading'
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      state.transactionDeleteStatus = 'succeeded'
      state.transactionDelete = action.payload.data
      const array = current(state.transactionList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.transactionList = temp
    },
    [deleteTransaction.rejected]: (state, action) => {
      state.transactionDeleteStatus = 'failed'
      state.transactionDeleteError = action.error.message
    },
    [updateTransaction.pending]: (state) => {
      state.transactionUpdateStatus = 'loading'
    },
    [updateTransaction.fulfilled]: (state, action) => {
      state.transactionUpdateStatus = 'succeeded'
      state.transactionUpdate = action.payload.data
    },
    [updateTransaction.rejected]: (state, action) => {
      state.transactionUpdateStatus = 'failed'
      state.transactionUpdateError = action.error.message
    },
  },
})

export const {
  clearTransactionList,
  clearTransactionByIdData,
  clearTransactionByIdStatus,
  clearTransactionDeleteStatus,
  clearCreateTransactionStatus,
  clearTransactionUpdateStatus,
  clearTransactionListStatus,
} = transactionsSlice.actions

export default transactionsSlice.reducer
