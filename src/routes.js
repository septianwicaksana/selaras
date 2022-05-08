import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const LoadingButtons = React.lazy(() => import('./views/buttons/loading-buttons/LoadingButtons'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const MultiSelect = React.lazy(() => import('./views/forms/multi-select/MultiSelect'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const SmartTable = React.lazy(() => import('./views/smart-table/SmartTable'))

// Plugins
const Calendar = React.lazy(() => import('./views/plugins/calendar/Calendar'))
const Charts = React.lazy(() => import('./views/plugins/charts/Charts'))
const GoogleMaps = React.lazy(() => import('./views/plugins/google-maps/GoogleMaps'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

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

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/buttons/loading-buttons', name: 'Loading Buttons', element: LoadingButtons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/multi-select', name: 'Multi Select', element: MultiSelect },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/plugins', name: 'Plugins', element: Calendar, exact: true },
  { path: '/plugins/calendar', name: 'Calendar', element: Calendar },
  { path: '/plugins/charts', name: 'Charts', element: Charts },
  { path: '/plugins/google-maps', name: 'GoogleMaps', element: GoogleMaps },
  { path: '/smart-table', name: 'Smart Table', element: SmartTable },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/apps', name: 'Apps', element: Invoice, exact: true },
  { path: '/apps/invoicing', name: 'Invoice', element: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', element: Invoice },
  { path: '/apps/email', name: 'Email', exact: true },
  { path: '/apps/email/inbox', name: 'Inbox', exact: true },
  { path: '/apps/email/compose', name: 'Compose', exact: true },
  { path: '/apps/email/message', name: 'Message', exact: true },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/branches', name: 'Branches', element: BranchList },
  { path: '/branches/create-branch', name: 'Create Branch', element: CreateBranch },
  { path: '/branches/detail-branch/:id', name: 'Detail Branch', element: DetailBranch },
  { path: '/branches/edit-branch/:id', name: 'Edit Branch', element: EditBranch },
  { path: '/transactions', name: 'Transactions', element: TransactionList },
  {
    path: '/transactions/create-transaction',
    name: 'Create Transaction',
    element: CreateTransaction,
  },
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

  { path: '/transactions/edit-transaction', name: 'Edit Transaction', element: EditTransaction },
  {
    path: '/transactions/payments/:id',
    name: 'Payment List',
    element: PaymentList,
  },
  {
    path: '/transactions/edit-payment',
    name: 'Edit Payment',
    element: EditPayment,
  },
  { path: '/transactions/make-payment', name: 'Make Payment', element: MakePayment },
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
  { path: '/customers/edit-customer', name: 'Edit Customer', element: EditCustomer },
  { path: '/employees', name: 'Employees', element: EmployeeList },
  { path: '/employees/create-employee', name: 'Create Employee', element: CreateEmployee },
  { path: '/employees/detail-employee/:id', name: 'Detail Employee', element: DetailEmployee },
  { path: '/employees/edit-employee/:id', name: 'Edit Employee', element: EditEmployee },
  { path: '/attendances', name: 'Attendances', element: AttendanceList },
  { path: '/attendances/create-attendance', name: 'Create Attendance', element: CreateAttendance },
  { path: '/attendances/detail-attendance', name: 'Detail Attendance', element: DetailAttendance },
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
]

export default routes
