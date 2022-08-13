import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  paymentAll: [],
  paymentAllStatus: 'idle',
  paymentAllError: null,
  paymentList: [],
  paymentListStatus: 'idle',
  paymentListError: null,
  paymentById: [],
  paymentByIdStatus: 'idle',
  paymentByIdError: null,
  createPayment: [],
  createPaymentStatus: 'idle',
  createPaymentError: null,
  paymentDelete: [],
  paymentDeleteStatus: 'idle',
  paymentDeleteError: null,
  paymentUpdate: [],
  paymentUpdateStatus: 'idle',
  paymentUpdateError: null,
}

export const fetchAllPayment = createAsyncThunk('payments/fetchAllPayment', async () => {
  const response = await supabase.from('payments').select(`id,number,payment_due,due_date,
  transactions ( id, customers(name,location) )`)
  return response
})

export const fetchPayment = createAsyncThunk('payments/fetchPayment', async (data) => {
  const response = await supabase.from('payments').select().eq('transaction_id', data)

  return response
})

export const fetchPaymentById = createAsyncThunk('payments/fetchPaymentById', async (id) => {
  const response = await supabase.from('payments').select('*').eq('id', id)
  return response
})

export const createPayment = createAsyncThunk('payments/createPayment', async (data) => {
  const response = await supabase.from('payments').insert([data])
  return response
})

export const deletePayment = createAsyncThunk('payments/deletePayment', async (id) => {
  await supabase.from('payments').delete().match({ id: id })
  return id
})

export const updatePayment = createAsyncThunk('payments/updatePayment', async (updatedData) => {
  const { data, error } = await supabase
    .from('payments')
    .update({
      address: updatedData.address, //not-null
    })
    .eq('id', updatedData.id)
  if (error) {
    alert(error.message)
  }
  return data
})

export const updatePaymentDate = createAsyncThunk(
  'payments/updatePaymentDate',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('payments')
      .update({
        due_date: updatedData.due_date, //not-null
      })
      .eq('id', updatedData.id)
    if (error) {
      alert(error.message)
    }
    return data
  },
)

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPaymentList: (state) => {
      state.paymentList = []
    },
    clearPaymentListStatus: (state) => {
      state.paymentListStatus = 'idle'
    },
    clearPaymentByIdData: (state) => {
      state.paymentById = []
    },
    clearPaymentByIdStatus: (state) => {
      state.paymentByIdStatus = 'idle'
    },
    clearPaymentDeleteStatus: (state) => {
      state.paymentDeleteStatus = 'idle'
    },
    clearCreatePaymentStatus: (state) => {
      state.createPaymentStatus = 'idle'
    },
    clearPaymentUpdateStatus: (state) => {
      state.paymentUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchAllPayment.pending]: (state) => {
      state.paymentAllStatus = 'loading'
    },
    [fetchAllPayment.fulfilled]: (state, action) => {
      state.paymentAllStatus = 'succeeded'
      state.paymentAll = action.payload.data
    },
    [fetchAllPayment.rejected]: (state, action) => {
      state.paymentAllStatus = 'failed'
      state.paymentAllError = action.error.message
    },
    [fetchPayment.pending]: (state) => {
      state.paymentListStatus = 'loading'
    },
    [fetchPayment.fulfilled]: (state, action) => {
      state.paymentListStatus = 'succeeded'
      state.paymentList = action.payload.data
    },
    [fetchPayment.rejected]: (state, action) => {
      state.paymentListStatus = 'failed'
      state.paymentListError = action.error.message
    },
    [fetchPaymentById.pending]: (state) => {
      state.paymentByIdStatus = 'loading'
    },
    [fetchPaymentById.fulfilled]: (state, action) => {
      state.paymentByIdStatus = 'succeeded'
      state.paymentById = action.payload.data[0]
    },
    [fetchPaymentById.rejected]: (state, action) => {
      state.paymentByIdStatus = 'failed'
      state.paymentByIdError = action.error.message
    },
    [createPayment.pending]: (state) => {
      state.createPaymentStatus = 'loading'
    },
    [createPayment.fulfilled]: (state, action) => {
      state.createPaymentStatus = 'succeeded'
      state.paymentList = state.paymentList.concat(action.payload.data[0])
    },
    [createPayment.rejected]: (state, action) => {
      state.createPaymentStatus = 'failed'
      state.createPaymentError = action.error.message
    },
    [deletePayment.pending]: (state) => {
      state.paymentDeleteStatus = 'loading'
    },
    [deletePayment.fulfilled]: (state, action) => {
      state.paymentDeleteStatus = 'succeeded'
      state.paymentDelete = action.payload.data
      const array = current(state.paymentList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.paymentList = temp
    },
    [deletePayment.rejected]: (state, action) => {
      state.paymentDeleteStatus = 'failed'
      state.paymentDeleteError = action.error.message
    },
    [updatePayment.pending]: (state) => {
      state.paymentUpdateStatus = 'loading'
    },
    [updatePayment.fulfilled]: (state, action) => {
      state.paymentUpdateStatus = 'succeeded'
      state.paymentUpdate = action.payload.data
    },
    [updatePayment.rejected]: (state, action) => {
      state.paymentUpdateStatus = 'failed'
      state.paymentUpdateError = action.error.message
    },
    [updatePaymentDate.pending]: (state) => {
      state.paymentUpdateStatus = 'loading'
    },
    [updatePaymentDate.fulfilled]: (state, action) => {
      state.paymentUpdateStatus = 'succeeded'
      state.paymentUpdate = action.payload.data
    },
    [updatePaymentDate.rejected]: (state, action) => {
      state.paymentUpdateStatus = 'failed'
      state.paymentUpdateError = action.error.message
    },
  },
})

export const {
  clearPaymentList,
  clearPaymentByIdData,
  clearPaymentByIdStatus,
  clearPaymentDeleteStatus,
  clearCreatePaymentStatus,
  clearPaymentUpdateStatus,
  clearPaymentListStatus,
} = paymentsSlice.actions

export default paymentsSlice.reducer
