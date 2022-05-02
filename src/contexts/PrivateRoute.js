import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ element: Component, ...rest }) {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/login" />
}
