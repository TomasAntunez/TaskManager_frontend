import { Outlet, Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import useAuth from '../hooks/useAuth'

const AuthLayout = () => {

  const { auth, isLoading } = useAuth()

  if( isLoading ) return 'cargando...'

  return (
    <>
      <main>
        <Container>
          <Row className='mt-5'>

            {
              auth?._id ?
                <Navigate to='/admin' /> :
                <Outlet />
            }

          </Row>
        </Container>
      </main>
    </>
  )
}

export default AuthLayout