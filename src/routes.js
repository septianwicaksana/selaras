import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Branches
const BranchList = React.lazy(() => import('./views/branchs/BranchList'))
const CreateBranch = React.lazy(() => import('./views/branchs/CreateBranch'))
const DetailBranch = React.lazy(() => import('./views/branchs/DetailBranch'))
const EditBranch = React.lazy(() => import('./views/branchs/EditBranch'))

// Employees
const EmployeeList = React.lazy(() => import('./views/employees/EmployeeList'))
const CreateEmployee = React.lazy(() => import('./views/employees/CreateEmployee'))
const DetailEmployee = React.lazy(() => import('./views/employees/DetailEmployee'))
const EditEmployee = React.lazy(() => import('./views/employees/EditEmployee'))

// Customers
const CustomerList = React.lazy(() => import('./views/customers/CustomerList'))
const CreateCustomer = React.lazy(() => import('./views/customers/CreateCustomer'))
const DetailCustomer = React.lazy(() => import('./views/customers/DetailCustomer'))
const EditCustomer = React.lazy(() => import('./views/customers/EditCustomer'))

// Transactions
const TransactionList = React.lazy(() => import('./views/transactions/TransactionList'))
const CreateTransaction = React.lazy(() => import('./views/transactions/CreateTransaction'))
const DetailTransaction = React.lazy(() => import('./views/transactions/DetailTransaction'))
const EditTransaction = React.lazy(() => import('./views/transactions/EditTransaction'))

// Expenses
const ExpenseList = React.lazy(() => import('./views/expenses/ExpenseList'))
const CreateExpense = React.lazy(() => import('./views/expenses/CreateExpense'))
const DetailExpense = React.lazy(() => import('./views/expenses/DetailExpense'))
const EditExpense = React.lazy(() => import('./views/expenses/EditExpense'))

// Incomes
const IncomeList = React.lazy(() => import('./views/incomes/IncomeList'))
const CreateIncome = React.lazy(() => import('./views/incomes/CreateIncome'))
const DetailIncome = React.lazy(() => import('./views/incomes/DetailIncome'))
const EditIncome = React.lazy(() => import('./views/incomes/EditIncome'))

// Attendanes
const AttendanceList = React.lazy(() => import('./views/attendances/AttendanceList'))
const CreateAttendance = React.lazy(() => import('./views/attendances/CreateAttendance'))
const DetailAttendance = React.lazy(() => import('./views/attendances/DetailAttendance'))
const EditAttendance = React.lazy(() => import('./views/attendances/EditAttendance'))

// Relatives
const RelativeList = React.lazy(() => import('./views/customers/relatives/RelativeList'))
const CreateRelative = React.lazy(() => import('./views/customers/relatives/CreateRelative'))
const DetailRelative = React.lazy(() => import('./views/customers/relatives/DetailRelative'))
const EditRelative = React.lazy(() => import('./views/customers/relatives/EditRelative'))

// Holidays
const HolidayList = React.lazy(() => import('./views/holidays/HolidayList'))
const CreateHoliday = React.lazy(() => import('./views/holidays/CreateHoliday'))
const DetailHoliday = React.lazy(() => import('./views/holidays/DetailHoliday'))
const EditHoliday = React.lazy(() => import('./views/holidays/EditHoliday'))

// Wallets
const WalletList = React.lazy(() => import('./views/wallets/WalletList'))
const CreateWallet = React.lazy(() => import('./views/wallets/CreateWallet'))
const DetailWallet = React.lazy(() => import('./views/wallets/DetailWallet'))
const EditWallet = React.lazy(() => import('./views/wallets/EditWallet'))

// Accounts
const AccountList = React.lazy(() => import('./views/accounts/AccountList'))
const CreateAccount = React.lazy(() => import('./views/accounts/CreateAccount'))
const DetailAccount = React.lazy(() => import('./views/accounts/DetailAccount'))
const EditAccount = React.lazy(() => import('./views/accounts/EditAccount'))

// Payments
const PaymentList = React.lazy(() => import('./views/transactions/payments/PaymentList'))
const EditPayment = React.lazy(() => import('./views/transactions/payments/EditPayment'))
const MakePayment = React.lazy(() => import('./views/transactions/payments/MakePayment'))
const PaymentHistory = React.lazy(() => import('./views/transactions/payments/PaymentHistory'))

//Transfers
const TransferList = React.lazy(() => import('./views/transfers/TransferList'))
const EditTransfer = React.lazy(() => import('./views/transfers/EditTransfer'))
const CreateTransfer = React.lazy(() => import('./views/transfers/CreateTransfer'))

//Schedules
const ScheduleList = React.lazy(() => import('./views/schedules/ScheduleList'))
const EditSchedule = React.lazy(() => import('./views/schedules/EditSchedule'))
const CreateSchedule = React.lazy(() => import('./views/schedules/CreateSchedule'))

const routes = [
  {
    role: 'pengawas',
    route: [
      { path: '/', exact: true, name: 'Home' },
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },
      { path: '/branches', name: 'Branches', element: BranchList },
      { path: '/branches/create-branch', name: 'Create Branch', element: CreateBranch },
      { path: '/branches/detail-branch/:id', name: 'Detail Branch', element: DetailBranch },
      { path: '/branches/edit-branch/:id', name: 'Edit Branch', element: EditBranch },
      { path: '/transactions', name: 'Transactions', element: TransactionList },
      {
        path: '/transactions/create-transaction/:id',
        name: 'Create Transaction',
        element: CreateTransaction,
      },
      {
        path: '/transactions/detail-transaction',
        name: 'Detail Transaction',
        element: DetailTransaction,
      },

      {
        path: '/transactions/edit-transaction',
        name: 'Edit Transaction',
        element: EditTransaction,
      },
      {
        path: '/transactions/payments/:id',
        name: 'Payment List',
        element: PaymentList,
      },
      {
        path: '/transactions/edit-payment/:id',
        name: 'Edit Payment',
        element: EditPayment,
      },

      { path: '/transactions/make-payment/:id', name: 'Make Payment', element: MakePayment },
      { path: '/incomes', name: 'Incomes', element: IncomeList },
      { path: '/incomes/create-income', name: 'Create Income', element: CreateIncome },
      { path: '/incomes/detail-income', name: 'Detail Income', element: DetailIncome },
      { path: '/incomes/edit-income', name: 'Edit Income', element: EditIncome },
      { path: '/expenses', name: 'Expenses', element: ExpenseList },
      { path: '/expenses/create-expense', name: 'Create Expense', element: CreateExpense },
      { path: '/expenses/detail-expense', name: 'Detail Expense', element: DetailExpense },
      { path: '/expenses/edit-expense', name: 'Edit Expense', element: EditExpense },
      { path: '/customers', name: 'Customers', element: CustomerList },
      { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
      { path: '/customers/detail-customer', name: 'Detail Customer', element: DetailCustomer },
      { path: '/customers/edit-customer/:id', name: 'Edit Customer', element: EditCustomer },
      { path: '/employees', name: 'Employees', element: EmployeeList },
      { path: '/employees/create-employee', name: 'Create Employee', element: CreateEmployee },
      { path: '/employees/detail-employee/:id', name: 'Detail Employee', element: DetailEmployee },
      { path: '/employees/edit-employee/:id', name: 'Edit Employee', element: EditEmployee },
      { path: '/attendances', name: 'Attendances', element: AttendanceList },
      {
        path: '/attendances/create-attendance',
        name: 'Create Attendance',
        element: CreateAttendance,
      },
      {
        path: '/attendances/detail-attendance',
        name: 'Detail Attendance',
        element: DetailAttendance,
      },
      { path: '/attendances/edit-attendance', name: 'Edit Attendance', element: EditAttendance },
      { path: '/relatives', name: 'Relatives', element: RelativeList },
      { path: '/relatives/create-relative/:id', name: 'Create Relative', element: CreateRelative },
      { path: '/relatives/detail-relative', name: 'Detail Relative', element: DetailRelative },
      { path: '/relatives/edit-relative', name: 'Edit Relative', element: EditRelative },
      { path: '/holidays', name: 'Holidays', element: HolidayList },
      { path: '/holidays/create-holiday', name: 'Create Holiday', element: CreateHoliday },
      { path: '/holidays/detail-holiday', name: 'Detail Holiday', element: DetailHoliday },
      { path: '/holidays/edit-holiday', name: 'Edit Holiday', element: EditHoliday },
      { path: '/wallets', name: 'Wallets', element: WalletList },
      { path: '/wallets/create-wallet', name: 'Create Wallet', element: CreateWallet },
      { path: '/wallets/detail-wallet', name: 'Detail Wallet', element: DetailWallet },
      { path: '/wallets/edit-wallet', name: 'Edit Wallet', element: EditWallet },
      { path: '/accounts', name: 'Accounts', element: AccountList },
      { path: '/accounts/create-account', name: 'Create Account', element: CreateAccount },
      { path: '/accounts/detail-account', name: 'Detail Account', element: DetailAccount },
      { path: '/accounts/edit-account', name: 'Edit Account', element: EditAccount },
      { path: '/transfers', name: 'Transfers', element: TransferList },
      { path: '/transfers/create-transfer', name: 'Create Transfer', element: CreateTransfer },
      { path: '/transfers/edit-transfer', name: 'Edit Transfer', element: EditTransfer },
      { path: '/schedules', name: 'Schedule', element: ScheduleList },
      { path: '/schedules/create-schedule', name: 'Create Schedule', element: CreateSchedule },
      { path: '/schedules/edit-schedule', name: 'Edit Schedule', element: EditSchedule },
    ],
  },
  {
    role: 'kasir',
    route: [
      { path: '/', exact: true, name: 'Home' },
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },
      { path: '/incomes', name: 'Incomes', element: IncomeList },
      { path: '/incomes/create-income', name: 'Create Income', element: CreateIncome },
      { path: '/incomes/detail-income', name: 'Detail Income', element: DetailIncome },
      { path: '/incomes/edit-income', name: 'Edit Income', element: EditIncome },
      { path: '/expenses', name: 'Expenses', element: ExpenseList },
      { path: '/expenses/create-expense', name: 'Create Expense', element: CreateExpense },
      { path: '/expenses/detail-expense', name: 'Detail Expense', element: DetailExpense },
      { path: '/expenses/edit-expense', name: 'Edit Expense', element: EditExpense },
      { path: '/attendances', name: 'Attendances', element: AttendanceList },
      {
        path: '/attendances/create-attendance',
        name: 'Create Attendance',
        element: CreateAttendance,
      },
      {
        path: '/attendances/detail-attendance',
        name: 'Detail Attendance',
        element: DetailAttendance,
      },
      { path: '/attendances/edit-attendance', name: 'Edit Attendance', element: EditAttendance },
      { path: '/wallets', name: 'Wallets', element: WalletList },
      { path: '/wallets/create-wallet', name: 'Create Wallet', element: CreateWallet },
      { path: '/wallets/detail-wallet', name: 'Detail Wallet', element: DetailWallet },
      { path: '/wallets/edit-wallet', name: 'Edit Wallet', element: EditWallet },
      { path: '/transfers', name: 'Transfers', element: TransferList },
      { path: '/transfers/create-transfer', name: 'Create Transfer', element: CreateTransfer },
      { path: '/transfers/edit-transfer', name: 'Edit Transfer', element: EditTransfer },
      { path: '/transfers', name: 'Transfers', element: TransferList },
    ],
  },
  {
    role: 'pimpinan',
    route: [
      { path: '/', exact: true, name: 'Home' },
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },

      { path: '/transactions', name: 'Transactions', element: TransactionList },
      {
        path: '/transactions/create-transaction/:id',
        name: 'Create Transaction',
        element: CreateTransaction,
      },
      {
        path: '/transactions/detail-transaction',
        name: 'Detail Transaction',
        element: DetailTransaction,
      },

      {
        path: '/transactions/edit-transaction',
        name: 'Edit Transaction',
        element: EditTransaction,
      },
      {
        path: '/transactions/payments/:id',
        name: 'Payment List',
        element: PaymentList,
      },
      {
        path: '/transactions/edit-payment/:id',
        name: 'Edit Payment',
        element: EditPayment,
      },
      { path: '/transactions/make-payment/:id', name: 'Make Payment', element: MakePayment },
      { path: '/customers', name: 'Customers', element: CustomerList },
      { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
      { path: '/customers/detail-customer', name: 'Detail Customer', element: DetailCustomer },
      { path: '/customers/edit-customer', name: 'Edit Customer', element: EditCustomer },
      { path: '/employees', name: 'Employees', element: EmployeeList },
      { path: '/employees/create-employee', name: 'Create Employee', element: CreateEmployee },
      { path: '/employees/detail-employee/:id', name: 'Detail Employee', element: DetailEmployee },
      { path: '/employees/edit-employee/:id', name: 'Edit Employee', element: EditEmployee },
      { path: '/attendances', name: 'Attendances', element: AttendanceList },
      {
        path: '/attendances/create-attendance',
        name: 'Create Attendance',
        element: CreateAttendance,
      },
      {
        path: '/attendances/detail-attendance',
        name: 'Detail Attendance',
        element: DetailAttendance,
      },
      { path: '/attendances/edit-attendance', name: 'Edit Attendance', element: EditAttendance },
      { path: '/relatives', name: 'Relatives', element: RelativeList },
      { path: '/relatives/create-relative/:id', name: 'Create Relative', element: CreateRelative },
      { path: '/relatives/detail-relative', name: 'Detail Relative', element: DetailRelative },
      { path: '/relatives/edit-relative', name: 'Edit Relative', element: EditRelative },
      { path: '/holidays', name: 'Holidays', element: HolidayList },
      { path: '/holidays/create-holiday', name: 'Create Holiday', element: CreateHoliday },
      { path: '/holidays/detail-holiday', name: 'Detail Holiday', element: DetailHoliday },
      { path: '/holidays/edit-holiday', name: 'Edit Holiday', element: EditHoliday },
    ],
  },
  {
    role: 'kepala_mantri',
    route: [
      { path: '/', exact: true, name: 'Home' },
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },

      { path: '/transactions', name: 'Transactions', element: TransactionList },
      {
        path: '/transactions/create-transaction/:id',
        name: 'Create Transaction',
        element: CreateTransaction,
      },
      {
        path: '/transactions/detail-transaction',
        name: 'Detail Transaction',
        element: DetailTransaction,
      },

      {
        path: '/transactions/edit-transaction',
        name: 'Edit Transaction',
        element: EditTransaction,
      },
      {
        path: '/transactions/payments/:id',
        name: 'Payment List',
        element: PaymentList,
      },
      {
        path: '/transactions/edit-payment/:id',
        name: 'Edit Payment',
        element: EditPayment,
      },
      { path: '/transactions/make-payment/:id', name: 'Make Payment', element: MakePayment },
      { path: '/customers', name: 'Customers', element: CustomerList },
      { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
      { path: '/customers/detail-customer', name: 'Detail Customer', element: DetailCustomer },
      { path: '/customers/edit-customer', name: 'Edit Customer', element: EditCustomer },
      { path: '/attendances', name: 'Attendances', element: AttendanceList },
      {
        path: '/attendances/create-attendance',
        name: 'Create Attendance',
        element: CreateAttendance,
      },
      {
        path: '/attendances/detail-attendance',
        name: 'Detail Attendance',
        element: DetailAttendance,
      },
      { path: '/attendances/edit-attendance', name: 'Edit Attendance', element: EditAttendance },
      { path: '/relatives', name: 'Relatives', element: RelativeList },
      { path: '/relatives/create-relative/:id', name: 'Create Relative', element: CreateRelative },
      { path: '/relatives/detail-relative', name: 'Detail Relative', element: DetailRelative },
      { path: '/relatives/edit-relative', name: 'Edit Relative', element: EditRelative },
    ],
  },
  {
    role: 'mantri',
    route: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },
      { path: '/transactions', name: 'Transactions', element: TransactionList },
      {
        path: '/transactions/create-transaction/:id',
        name: 'Create Transaction',
        element: CreateTransaction,
      },
      {
        path: '/transactions/detail-transaction',
        name: 'Detail Transaction',
        element: DetailTransaction,
      },

      {
        path: '/transactions/edit-transaction',
        name: 'Edit Transaction',
        element: EditTransaction,
      },
      {
        path: '/transactions/payments/:id',
        name: 'Payment List',
        element: PaymentList,
      },
      {
        path: '/transactions/edit-payment/:id',
        name: 'Edit Payment',
        element: EditPayment,
      },
      { path: '/transactions/make-payment/:id', name: 'Make Payment', element: MakePayment },
    ],
  },
  {
    role: 'admin',
    route: [
      { path: '/', exact: true, name: 'Home' },
      {
        path: '/dashboard',
        name: 'Dashboard',
        element: Dashboard,
      },
      { path: '/branches', name: 'Branches', element: BranchList },
      { path: '/branches/create-branch', name: 'Create Branch', element: CreateBranch },
      { path: '/branches/detail-branch/:id', name: 'Detail Branch', element: DetailBranch },
      { path: '/branches/edit-branch/:id', name: 'Edit Branch', element: EditBranch },
      { path: '/transactions', name: 'Transactions', element: TransactionList },
      {
        path: '/transactions/create-transaction/:id',
        name: 'Create Transaction',
        element: CreateTransaction,
      },
      {
        path: '/transactions/detail-transaction',
        name: 'Detail Transaction',
        element: DetailTransaction,
      },

      {
        path: '/transactions/edit-transaction',
        name: 'Edit Transaction',
        element: EditTransaction,
      },
      {
        path: '/transactions/payments/:id',
        name: 'Payment List',
        element: PaymentList,
      },
      {
        path: '/transactions/edit-payment/:id',
        name: 'Edit Payment',
        element: EditPayment,
      },
      { path: '/transactions/make-payment/:id', name: 'Make Payment', element: MakePayment },

      { path: '/customers', name: 'Customers', element: CustomerList },
      { path: '/customers/create-customer', name: 'Create Customer', element: CreateCustomer },
      { path: '/customers/detail-customer', name: 'Detail Customer', element: DetailCustomer },
      { path: '/customers/edit-customer', name: 'Edit Customer', element: EditCustomer },
      { path: '/employees', name: 'Employees', element: EmployeeList },
      { path: '/employees/create-employee', name: 'Create Employee', element: CreateEmployee },
      { path: '/employees/detail-employee/:id', name: 'Detail Employee', element: DetailEmployee },
      { path: '/employees/edit-employee/:id', name: 'Edit Employee', element: EditEmployee },
      { path: '/attendances', name: 'Attendances', element: AttendanceList },
      {
        path: '/attendances/create-attendance',
        name: 'Create Attendance',
        element: CreateAttendance,
      },
      {
        path: '/attendances/detail-attendance',
        name: 'Detail Attendance',
        element: DetailAttendance,
      },
      { path: '/attendances/edit-attendance', name: 'Edit Attendance', element: EditAttendance },
      { path: '/relatives', name: 'Relatives', element: RelativeList },
      { path: '/relatives/create-relative/:id', name: 'Create Relative', element: CreateRelative },
      { path: '/relatives/detail-relative', name: 'Detail Relative', element: DetailRelative },
      { path: '/relatives/edit-relative', name: 'Edit Relative', element: EditRelative },
      { path: '/holidays', name: 'Holidays', element: HolidayList },
      { path: '/holidays/create-holiday', name: 'Create Holiday', element: CreateHoliday },
      { path: '/holidays/detail-holiday', name: 'Detail Holiday', element: DetailHoliday },
      { path: '/holidays/edit-holiday', name: 'Edit Holiday', element: EditHoliday },
      { path: '/accounts', name: 'Accounts', element: AccountList },
      { path: '/accounts/create-account', name: 'Create Account', element: CreateAccount },
      { path: '/accounts/detail-account', name: 'Detail Account', element: DetailAccount },
      { path: '/accounts/edit-account', name: 'Edit Account', element: EditAccount },
      { path: '/schedules', name: 'Schedule', element: ScheduleList },
      { path: '/schedules/create-schedule', name: 'Create Schedule', element: CreateSchedule },
      { path: '/schedules/edit-schedule', name: 'Edit Schedule', element: EditSchedule },
    ],
  },
]

export default routes
