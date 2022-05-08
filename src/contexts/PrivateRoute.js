import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ element: Component, ...rest }) {
  const { user } = useAuth()

  // active code below when there isn't connectivity
  // return !user ? <Outlet /> : <Navigate to="/login" />
  // active code below when there is connectivity
  return user ? <Outlet /> : <Navigate to="/login" />
}
