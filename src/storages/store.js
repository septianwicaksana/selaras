import { configureStore } from '@reduxjs/toolkit'
import branchsReducer from './branchsSlice'
import tabsReducer from './tabsSlice'
import employeesReducer from './employeesSlice'
import walletsReducer from './walletsSlice'
import accountsReducer from './accountsSlice'
import incomesReducer from './incomesSlice'
import expensesReducer from './expensesSlice'
import attendancesReducer from './attendancesSlice'
import paymentsReducer from './paymentsSlice'
import relativesReducer from './relativesSlice'
import transactionsReducer from './transactionsSlice'
import customersReducer from './customersSlice'
import holidaysReducer from './holidaysSlice'
import historyReducer from './historysSlice'
import scheduleReducer from './schedulesSlice'

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    branchs: branchsReducer,
    employees: employeesReducer,
    wallets: walletsReducer,
    accounts: accountsReducer,
    incomes: incomesReducer,
    expenses: expensesReducer,
    attendances: attendancesReducer,
    payments: paymentsReducer,
    relatives: relativesReducer,
    transactions: transactionsReducer,
    customers: customersReducer,
    holidays: holidaysReducer,
    history: historyReducer,
    schedules: scheduleReducer,
  },
})
