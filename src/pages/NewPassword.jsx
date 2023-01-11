import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ShowAlert from '../components/ShowAlert'
import axiosClient from '../config/axios'

const NewPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})
  const [ validToken, setValidToken ] = useState(false)
  const [ button, setButton ] = useState(false)

  const { token } = useParams()

  useEffect( () => {
    const verifyToken = async () => {
      try {
        const { data } = await axiosClient(`/users/forget-password/${token}`)

        setValidToken(true)
        setAlert({ msg: data.msg })

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    
    verifyToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if( password === '' ) {
      setAlert({ msg: 'Password is required', error: true })
      return
    }

    if( password.length < 6 ) {
      setAlert({ msg: 'The password must contain at least 6 characters', error: true })
      return
    }

    try {
      const url = `/users/forget-password/${token}`
      const { data } = await axiosClient.post(url, {password})
      setAlert({ msg: data.msg })
      setPassword('')
      setButton(true)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <Col md className='mt-5'>
          <h1 className='text-secondary fw-bold display-3'>
            Reset Your Password and Don't Lose<br/>
            <Badge bg='primary' className='mt-3'>Your Tasks</Badge>
          </h1>

          {msg &&
            <ShowAlert
              alert={alert}
            />
          }
      </Col>
      
      {validToken &&
        (
          <Col md className='shadow p-4 mb-5 bg-white rounded-3'>
            <Form
              className='mt-4'
              onSubmit={handleSubmit}
            >
              <Form.Group className='mt-4' controlId='email'>
                <Form.Label className='text-uppercase text-primary text-opacity-75 fw-bold fs-4'>
                  New Password
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter your new password'
                  className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                />
              </Form.Group>

              <Button
                type='submit' variant='primary opacity-75' className='mt-5 mb-2 w-100 py-3 fw-bold fs-4 text-uppercase'
              >
                Save Password
              </Button>
            </Form>

            {button &&
              (
                <Nav justify className='mt-4 border-top py-3'>
                <Nav.Item>
                  <Link
                    to='/'
                    className='text-secondary nav-link fw-bold fs-2'
                  >
                    Log In
                  </Link>
                </Nav.Item>
              </Nav>
              )
            }
          </Col>
        )
      }
    </>
  )
}

export default NewPassword