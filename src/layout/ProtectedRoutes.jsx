import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from '../hooks/useAuth'
import Container from "react-bootstrap/Container"

const ProtectedRoutes = () => {

  const { auth, isLoading } = useAuth()
  
  if( isLoading ) return 'cargando...'

  return (
    <>
      <Header />

        { auth?._id ?
        (
          <main>
            <Container>
              <Outlet />
            </Container>
          </main>
        )
        : <Navigate to='/' /> }

      <Footer />
    </>
  )
}

export default ProtectedRoutes