import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { AuthProvider } from './contexts/Auth'
import { PrivateRoute } from './contexts/PrivateRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <AuthProvider>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="/apps/email/*" name="Email App" element={<EmailApp />} />
              {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
              <Route exact path="*" element={<PrivateRoute />}>
                <Route exact path="*" element={<DefaultLayout />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
