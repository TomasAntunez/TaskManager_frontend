import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import ProtectedRoutes from './layout/ProtectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmAccount from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import ManagePatients from './pages/ManagePatients'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'

import { AuthProvider } from './context/AuthProvider'
import { TasksProvider } from './context/TasksProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <Routes>
              <Route path="/" element={ <AuthLayout /> }>
                  <Route index element={ <Login /> } />
                  <Route path='register' element={ <Register /> } />
                  <Route path='confirm-account/:token' element={ <ConfirmAccount /> } />
                  <Route path='forget-password' element={ <ForgetPassword /> } />
                  <Route path='forget-password/:token' element={ <NewPassword /> } />
              </Route>

              <Route path="/admin" element={ <ProtectedRoutes /> }>
                  <Route index element={ <ManagePatients /> } />
                  <Route path='profile' element={ <EditProfile /> } />
                  <Route path='change-password' element={ <ChangePassword /> } />
              </Route>
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
