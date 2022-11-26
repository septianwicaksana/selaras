import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  customerList: [],
  customerListStatus: 'idle',
  customerListError: null,
  customerById: [],
  customerByIdStatus: 'idle',
  customerByIdError: null,
  createCustomer: [],
  createCustomerStatus: 'idle',
  createCustomerError: null,
  customerDelete: [],
  customerDeleteStatus: 'idle',
  customerDeleteError: null,
  customerUpdate: [],
  customerUpdateStatus: 'idle',
  customerUpdateError: null,
}

export const fetchCustomer = createAsyncThunk('customers/fetchCustomer', async () => {
  const response = await supabase.from('customers').select()
  return response
})

export const fetchCustomerById = createAsyncThunk('customers/fetchCustomerById', async (id) => {
  const response = await supabase.from('customers').select('*').eq('id', id)
  return response
})

export const createCustomer = createAsyncThunk('customers/createCustomer', async (data) => {
  const response = await supabase.from('customers').insert([data])
  return response
})

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
  await supabase.from('customers').delete().match({ id: id })
  return id
})

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (updatedData) => {
  const { data, error } = await supabase
    .from('customers')
    .update({
      name: updatedData.name, //null
      ktp: updatedData.ktp, //not-null
      phone: updatedData.phone,
      address: updatedData.address,
      location: updatedData.location,
      pos: updatedData.pos,
      pob: updatedData.pob,
      dob: updatedData.dob,
      job: updatedData.job,
      rent: updatedData.rent,
    })
    .eq('id', updatedData.id)
  if (error) {
    alert(error.message)
  }
  return data
})

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomerList: (state) => {
      state.customerList = []
    },
    clearCustomerListStatus: (state) => {
      state.customerListStatus = 'idle'
    },
    clearCustomerByIdData: (state) => {
      state.customerById = []
    },
    clearCustomerByIdStatus: (state) => {
      state.customerByIdStatus = 'idle'
    },
    clearCustomerDeleteStatus: (state) => {
      state.customerDeleteStatus = 'idle'
    },
    clearCreateCustomerStatus: (state) => {
      state.createCustomerStatus = 'idle'
    },
    clearCustomerUpdateStatus: (state) => {
      state.customerUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchCustomer.pending]: (state) => {
      state.customerListStatus = 'loading'
    },
    [fetchCustomer.fulfilled]: (state, action) => {
      state.customerListStatus = 'succeeded'
      state.customerList = action.payload.data
    },
    [fetchCustomer.rejected]: (state, action) => {
      state.customerListStatus = 'failed'
      state.customerListError = action.error.message
    },
    [fetchCustomerById.pending]: (state) => {
      state.customerByIdStatus = 'loading'
    },
    [fetchCustomerById.fulfilled]: (state, action) => {
      state.customerByIdStatus = 'succeeded'
      state.customerById = action.payload.data[0]
    },
    [fetchCustomerById.rejected]: (state, action) => {
      state.customerByIdStatus = 'failed'
      state.customerByIdError = action.error.message
    },
    [createCustomer.pending]: (state) => {
      state.createCustomerStatus = 'loading'
    },
    [createCustomer.fulfilled]: (state, action) => {
      state.createCustomerStatus = 'succeeded'
      state.customerList = state.customerList.concat(action.payload.data[0])
      state.createCustomer = state.createCustomer.concat(action.payload.data[0])
    },
    [createCustomer.rejected]: (state, action) => {
      state.createCustomerStatus = 'failed'
      state.createCustomerError = action.error.message
    },
    [deleteCustomer.pending]: (state) => {
      state.customerDeleteStatus = 'loading'
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customerDeleteStatus = 'succeeded'
      state.customerDelete = action.payload.data
      const array = current(state.customerList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.customerList = temp
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.customerDeleteStatus = 'failed'
      state.customerDeleteError = action.error.message
    },
    [updateCustomer.pending]: (state) => {
      state.customerUpdateStatus = 'loading'
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customerUpdateStatus = 'succeeded'
      state.customerUpdate = action.payload.data
    },
    [updateCustomer.rejected]: (state, action) => {
      state.customerUpdateStatus = 'failed'
      state.customerUpdateError = action.error.message
    },
  },
})

export const {
  clearCustomerList,
  clearCustomerByIdData,
  clearCustomerByIdStatus,
  clearCustomerDeleteStatus,
  clearCreateCustomerStatus,
  clearCustomerUpdateStatus,
  clearCustomerListStatus,
} = customersSlice.actions

export default customersSlice.reducer
