import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosClient from "../config/axios"
import ShowAlert from "../components/ShowAlert"
import Nav from 'react-bootstrap/Nav'

const ConfirmAccount = () => {

  const [ confirmedUser, setConfirmedUser ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ alert, setAlert ] = useState({})
    
  const { token } = useParams();

  useEffect( () => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`
        const { data } = await axiosClient(url)

        setConfirmedUser(true)
        setAlert({
          msg: data.msg
        })

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }

      setLoading(false)
    }
    confirmAccount()
  }, [])

  return (
    <>
      <h1 className='text-secondary fw-bold display-3 text-center'>
        Confirm Your Account and Start Managing <br/>
        <Badge bg='primary' className='mt-3'>Your Tasks</Badge>
      </h1>

      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            {!loading &&
              <ShowAlert
                alert={alert}
              />
            }

            {confirmedUser &&
              <Nav className="mt-2 justify-content-center">
                <Nav.Item>
                  <Link
                    className="text-secondary nav-link fs-2 fw-bold"
                    to='/'
                  >
                    Log in
                  </Link>
                </Nav.Item>
              </Nav>
            }
          </Col>
        </Row>
      </Container>


    </>
  )
}

export default ConfirmAccount