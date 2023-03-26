import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'

import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/ProtectedRoutes';

import LandingPage from './pages/LandingPage'
import SuperChatPage from './pages/SuperChatPage';
import ConfirmationPage from './pages/ConfirmationPage';

import AdminProtectedRoutes from './components/AdminProtectedRoutes';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


function App() {  
  return (
    <div >
      <AuthContextProvider>
        <Routes>
          <Route path='/'  element={<LandingPage/>} />
          <Route path='/superchat' element={<Protected><SuperChatPage/></Protected>} />
          <Route path='/confirmation/:orderId/:shoutoutId' element={<Protected><ConfirmationPage/></Protected>} />

          <Route path='/admin-login'  element={<AdminLogin/>} />
          <Route path='/dashboard'  element={<AdminProtectedRoutes><AdminDashboard/></AdminProtectedRoutes>} />

        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
