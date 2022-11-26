import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  expenseList: [],
  expenseListStatus: 'idle',
  expenseListError: null,
  expenseById: [],
  expenseByIdStatus: 'idle',
  expenseByIdError: null,
  createExpense: [],
  createExpenseStatus: 'idle',
  createExpenseError: null,
  expenseDelete: [],
  expenseDeleteStatus: 'idle',
  expenseDeleteError: null,
  expenseUpdate: [],
  expenseUpdateStatus: 'idle',
  expenseUpdateError: null,
}

export const fetchExpense = createAsyncThunk('expenses/fetchExpense', async () => {
  const response = await supabase
    .from('expenses')
    .select(`*,accounts(category),wallets(name)`)
    .order('date', { ascending: false })
  return response
})

export const fetchExpenseById = createAsyncThunk('expenses/fetchExpenseById', async (id) => {
  const response = await supabase.from('expenses').select('*').eq('id', id)
  return response
})

export const createExpense = createAsyncThunk('expenses/createExpense', async (data) => {
  const response = await supabase.from('expenses').insert([data])
  return response
})

export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async (id) => {
  await supabase.from('expenses').delete().match({ id: id })
  return id
})

export const updateExpense = createAsyncThunk('expenses/updateExpense', async (updatedData) => {
  const { data, error } = await supabase
    .from('expenses')
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

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpenseList: (state) => {
      state.expenseList = []
    },
    clearExpenseListStatus: (state) => {
      state.expenseListStatus = 'idle'
    },
    clearExpenseByIdData: (state) => {
      state.expenseById = []
    },
    clearExpenseByIdStatus: (state) => {
      state.expenseByIdStatus = 'idle'
    },
    clearExpenseDeleteStatus: (state) => {
      state.expenseDeleteStatus = 'idle'
    },
    clearCreateExpenseStatus: (state) => {
      state.createExpenseStatus = 'idle'
    },
    clearExpenseUpdateStatus: (state) => {
      state.expenseUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchExpense.pending]: (state) => {
      state.expenseListStatus = 'loading'
    },
    [fetchExpense.fulfilled]: (state, action) => {
      state.expenseListStatus = 'succeeded'
      state.expenseList = action.payload.data
      if (action.payload.data.length > 0) {
        for (var i = 0; i < action.payload.data.length; i++) {
          state.expenseList[i] = {
            ...action.payload.data[i],
            ...action.payload.data[i].wallets,
          }
        }
      }
    },
    [fetchExpense.rejected]: (state, action) => {
      state.expenseListStatus = 'failed'
      state.expenseListError = action.error.message
    },
    [fetchExpenseById.pending]: (state) => {
      state.expenseByIdStatus = 'loading'
    },
    [fetchExpenseById.fulfilled]: (state, action) => {
      state.expenseByIdStatus = 'succeeded'
      state.expenseById = action.payload.data[0]
    },
    [fetchExpenseById.rejected]: (state, action) => {
      state.expenseByIdStatus = 'failed'
      state.expenseByIdError = action.error.message
    },
    [createExpense.pending]: (state) => {
      state.createExpenseStatus = 'loading'
    },
    [createExpense.fulfilled]: (state, action) => {
      state.createExpenseStatus = 'succeeded'
      state.expenseList = state.expenseList.concat(action.payload.data[0])
    },
    [createExpense.rejected]: (state, action) => {
      state.createExpenseStatus = 'failed'
      state.createExpenseError = action.error.message
    },
    [deleteExpense.pending]: (state) => {
      state.expenseDeleteStatus = 'loading'
    },
    [deleteExpense.fulfilled]: (state, action) => {
      state.expenseDeleteStatus = 'succeeded'
      state.expenseDelete = action.payload.data
      const array = current(state.expenseList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.expenseList = temp
    },
    [deleteExpense.rejected]: (state, action) => {
      state.expenseDeleteStatus = 'failed'
      state.expenseDeleteError = action.error.message
    },
    [updateExpense.pending]: (state) => {
      state.expenseUpdateStatus = 'loading'
    },
    [updateExpense.fulfilled]: (state, action) => {
      state.expenseUpdateStatus = 'succeeded'
      state.expenseUpdate = action.payload.data
    },
    [updateExpense.rejected]: (state, action) => {
      state.expenseUpdateStatus = 'failed'
      state.expenseUpdateError = action.error.message
    },
  },
})

export const {
  clearExpenseList,
  clearExpenseByIdData,
  clearExpenseByIdStatus,
  clearExpenseDeleteStatus,
  clearCreateExpenseStatus,
  clearExpenseUpdateStatus,
  clearExpenseListStatus,
} = expensesSlice.actions

export default expensesSlice.reducer
