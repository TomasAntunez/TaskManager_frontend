import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ShowAlert from '../components/ShowAlert'
import axiosClient from '../config/axios'

const ForgetPassword = () => {

  const [ email, setEmail ] = useState('')
  const [ alert, setAlert ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if( email === '' ) {
      setAlert({ msg: 'Email is required', error: true })
      return
    }

    try {
      const { data } = await axiosClient.post('/users/forget-password', {email})
      
      setAlert({
        msg: data.msg
      })

      setEmail('')

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
            Regain Your Access and Don't Lose<br/>
            <Badge bg='primary' className='mt-3'>Your Tasks</Badge>
          </h1>

          {msg &&
            <ShowAlert
              alert={alert}
            />
          }
      </Col>

      <Col md className='shadow p-4 mb-5 bg-white rounded-3'>
          <Form
            className='mt-4'
            onSubmit={handleSubmit}
          >
            <Form.Group className='mt-4' controlId='email'>
              <Form.Label className='text-uppercase text-primary text-opacity-75 fw-bold fs-4'>
                Email
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                value={email}
                onChange={ e => setEmail(e.target.value) }
              />
            </Form.Group>

            <Button
              type='submit' variant='primary opacity-75' className='mt-5 mb-2 w-100 py-3 fw-bold fs-4 text-uppercase'
            >
              Send Instructions
            </Button>
          </Form>

          <Nav justify className='mt-4 border-top py-3'>
            <Nav.Item>
              <Link to='/' className='text-secondary nav-link'>
                Do you have an account? <strong>Log in</strong>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link to='/register' className='text-secondary nav-link'>
                You do not have an account? <strong>Sign up</strong>
              </Link>
            </Nav.Item>
          </Nav>
      </Col>
    </>
  )
}
  
 export default ForgetPassword