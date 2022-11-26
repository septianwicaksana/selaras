import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  incomeList: [],
  incomeListStatus: 'idle',
  incomeListError: null,
  incomeById: [],
  incomeByIdStatus: 'idle',
  incomeByIdError: null,
  createIncome: [],
  createIncomeStatus: 'idle',
  createIncomeError: null,
  incomeDelete: [],
  incomeDeleteStatus: 'idle',
  incomeDeleteError: null,
  incomeUpdate: [],
  incomeUpdateStatus: 'idle',
  incomeUpdateError: null,
}

export const fetchIncome = createAsyncThunk('incomes/fetchIncome', async () => {
  const response = await supabase
    .from('incomes')
    .select(`*,accounts(category),wallets(name)`)
    .order('date', { ascending: false })
  return response
})

export const fetchIncomeById = createAsyncThunk('incomes/fetchIncomeById', async (id) => {
  const response = await supabase.from('incomes').select('*').eq('id', id)
  return response
})

export const createIncome = createAsyncThunk('incomes/createIncome', async (data) => {
  const response = await supabase.from('incomes').insert([data])
  return response
})

export const deleteIncome = createAsyncThunk('incomes/deleteIncome', async (id) => {
  await supabase.from('incomes').delete().match({ id: id })
  return id
})

export const updateIncome = createAsyncThunk('incomes/updateIncome', async (updatedData) => {
  const { data, error } = await supabase
    .from('incomes')
    .update({
      wallet_id: updatedData.wallet_id, //not-null
      account: updatedData.account,
      note: updatedData.note,
      date: updatedData.date,
    })
    .eq('id', updatedData.id)
  if (error) {
    alert(error.message)
  }
  return data
})

const incomesSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    clearIncomeList: (state) => {
      state.incomeList = []
    },
    clearIncomeListStatus: (state) => {
      state.incomeListStatus = 'idle'
    },
    clearIncomeByIdData: (state) => {
      state.incomeById = []
    },
    clearIncomeByIdStatus: (state) => {
      state.incomeByIdStatus = 'idle'
    },
    clearIncomeDeleteStatus: (state) => {
      state.incomeDeleteStatus = 'idle'
    },
    clearCreateIncomeStatus: (state) => {
      state.createIncomeStatus = 'idle'
    },
    clearIncomeUpdateStatus: (state) => {
      state.incomeUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchIncome.pending]: (state) => {
      state.incomeListStatus = 'loading'
    },
    [fetchIncome.fulfilled]: (state, action) => {
      state.incomeListStatus = 'succeeded'
      if (action.payload.data.length > 0) {
        for (var i = 0; i < action.payload.data.length; i++) {
          state.incomeList[i] = {
            ...action.payload.data[i],
            ...action.payload.data[i].accounts,
            ...action.payload.data[i].wallets,
          }
        }
      }
    },
    [fetchIncome.rejected]: (state, action) => {
      state.incomeListStatus = 'failed'
      state.incomeListError = action.error.message
    },
    [fetchIncomeById.pending]: (state) => {
      state.incomeByIdStatus = 'loading'
    },
    [fetchIncomeById.fulfilled]: (state, action) => {
      state.incomeByIdStatus = 'succeeded'
      state.incomeById = action.payload.data[0]
    },
    [fetchIncomeById.rejected]: (state, action) => {
      state.incomeByIdStatus = 'failed'
      state.incomeByIdError = action.error.message
    },
    [createIncome.pending]: (state) => {
      state.createIncomeStatus = 'loading'
    },
    [createIncome.fulfilled]: (state, action) => {
      state.createIncomeStatus = 'succeeded'
      state.incomeList = state.incomeList.concat(action.payload.data[0])
    },
    [createIncome.rejected]: (state, action) => {
      state.createIncomeStatus = 'failed'
      state.createIncomeError = action.error.message
    },
    [deleteIncome.pending]: (state) => {
      state.incomeDeleteStatus = 'loading'
    },
    [deleteIncome.fulfilled]: (state, action) => {
      state.incomeDeleteStatus = 'succeeded'
      state.incomeDelete = action.payload.data
      const array = current(state.incomeList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.incomeList = temp
    },
    [deleteIncome.rejected]: (state, action) => {
      state.incomeDeleteStatus = 'failed'
      state.incomeDeleteError = action.error.message
    },
    [updateIncome.pending]: (state) => {
      state.incomeUpdateStatus = 'loading'
    },
    [updateIncome.fulfilled]: (state, action) => {
      state.incomeUpdateStatus = 'succeeded'
      state.incomeUpdate = action.payload.data
    },
    [updateIncome.rejected]: (state, action) => {
      state.incomeUpdateStatus = 'failed'
      state.incomeUpdateError = action.error.message
    },
  },
})

export const {
  clearIncomeList,
  clearIncomeByIdData,
  clearIncomeByIdStatus,
  clearIncomeDeleteStatus,
  clearCreateIncomeStatus,
  clearIncomeUpdateStatus,
  clearIncomeListStatus,
} = incomesSlice.actions

export default incomesSlice.reducer
