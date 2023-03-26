import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const AdminProtectedRoutes = ({children}) => {
  const {adminAuthToken} = UserAuth()
  if(!adminAuthToken){
    return <Navigate to="/admin-login"/>
  }
  return children
}

export default AdminProtectedRoutes