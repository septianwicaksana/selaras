import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = React.createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    setLoading(false)
    if (user) {
      fetchEmployeeRole(user.id)
    }

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      listener?.unsubscribe()
    }
  }, [user])

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  const fetchEmployeeRole = async (id) => {
    try {
      let { data, error } = await supabase.from('employees').select('id,position').eq('id', id)
      sessionStorage.setItem('role', data[0].position)
      sessionStorage.setItem('userId', data[0].id)
    } catch (error) {
      alert('no data found')
    }
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
