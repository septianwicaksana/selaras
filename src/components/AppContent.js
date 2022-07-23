import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'

// routes config
import routes from '../routes'
import { PrivateRoute } from 'src/contexts/PrivateRoute'
import Page404 from 'src/views/pages/page404/Page404'
import { useAuth } from 'src/contexts/Auth'

const AppContent = () => {
  const role = sessionStorage.getItem('role')
  console.log(role)
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes
            .find((data) => data.role === role)
            .route.map((route, idx) => {
              return (
                route.element && (
                  <Route element={<PrivateRoute />}>
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  </Route>
                )
              )
            })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
