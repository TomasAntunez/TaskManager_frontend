import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ShowAlert from '../components/ShowAlert'
import axiosClient from '../config/axios'

const Register = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')

    const [ alert, setAlert ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect( () => {
        if( alert.msg ) {
            setIsLoading(false)
        }
    }, [alert])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsLoading(true)

        if( [name, email, password, repeatPassword].includes('') ) {
            setAlert({ msg: 'All fields are required', error: true })
            return
        }

        if( password < 6 ) {
            setAlert({ msg: 'The password must have 6 or more characters', error: true })
            return
        }

        if( password !== repeatPassword ) {
            setAlert({ msg: 'Passwords are not the same', error: true})
            return
        }

        setAlert({})

        try {
            const response = await axiosClient.post('/users', {name, email, password})
            
            setAlert({
                msg: response.data.msg
            })

            setName('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')

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
                    Create an Account and Manage <br/>
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
                    <Form.Group controlId='name'>
                        <Form.Label className='text-uppercase text-primary text-opacity-75 fw-bold fs-4'>
                            Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter your name'
                            className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                            value={name}
                            onChange={ e => setName(e.target.value) }
                        />
                    </Form.Group>

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
                    
                    <Form.Group className='mt-4' controlId='password'>
                        <Form.Label className='text-uppercase text-primary text-opacity-75 fw-bold fs-4'>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </Form.Group>
                    
                    <Form.Group className='mt-4' controlId='password'>
                        <Form.Label className='text-uppercase text-primary text-opacity-75 fw-bold fs-4'>
                            Repeat Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Repeat your password'
                            className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                            value={repeatPassword}
                            onChange={ e => setRepeatPassword(e.target.value) }
                        />
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary opacity-75'
                        className='mt-5 mb-2 w-100 py-3 fw-bold fs-4 text-uppercase'
                        disabled={isLoading}
                    >
                        Create Account
                    </Button>
                </Form>

                <Nav justify className='mt-4 border-top py-3'>
                    <Nav.Item>
                        <Link to='/' className='text-secondary nav-link'>
                            Do you have an account? <strong>Log in</strong>
                        </Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Link to='/forget-password' className='text-secondary nav-link'>
                            Did you forget your password?
                        </Link>
                    </Nav.Item>
                </Nav>
            </Col>
        </>
    )
}
  
export default Register