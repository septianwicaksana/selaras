import { configureStore } from '@reduxjs/toolkit'
import branchsReducer from './branchsSlice'
import tabsReducer from './tabsSlice'

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    branchs: branchsReducer,
  },
})
