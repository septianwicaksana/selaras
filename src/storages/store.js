import { configureStore } from '@reduxjs/toolkit'
import branchsReducer from './branchsSlice'
import tabsReducer from './tabsSlice'
import employeesReducer from './employeesSlice'

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    branchs: branchsReducer,
    employees: employeesReducer,
  },
})
