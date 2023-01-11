import AdminNav from "../components/AdminNav"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ShowAlert from "../components/ShowAlert"
import { useState } from "react"
import useAuth from "../hooks/useAuth"

const ChangePassword = () => {

    const { savePassword } = useAuth()

    const [ alert, setAlert ] = useState({})
    const [ password, setPassword ] = useState({
        currentPassword: '',
        newPassword: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if( Object.values(password).some( field => field === '' ) ) {
            setAlert({ msg: 'All fields are required', error: true })
            return
        }

        if( password.newPassword.length < 6 ) {
            setAlert({ msg: 'The password must have 6 or more characters', error: true })
            return
        }

        const result = await savePassword(password)
        setAlert(result)
    }

    const { msg } = alert

  return (
    <>
        <AdminNav />

        <h2 className="fs-1 text-center fw-bold mt-5">
            Change Password
        </h2>

        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="shadow bg-body rounded-3 p-4 mt-5">

                        <p className="fs-3 text-center text-secondary text-opacity-75 mt-4">
                            Change your
                            <span className="fw-bold text-primary text-opacity-75"> password</span>
                        </p>

                        <Form
                            className="mt-5"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group>
                                <Form.Label className='text-uppercase text-secondary fw-bold fs-4'>
                                    Current Password
                                </Form.Label>
                                <Form.Control
                                    name="currentPassword"
                                    type='password'
                                    placeholder="Enter your current password"
                                    className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                                    onChange={ e => setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value
                                    })}
                                />
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Form.Label className='text-uppercase text-secondary fw-bold fs-4'>
                                    New Password
                                </Form.Label>
                                <Form.Control
                                    name="newPassword"
                                    type='password'
                                    placeholder="Enter your new password"
                                    className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                                    onChange={ e => setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value
                                    })}
                                />
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary opacity-75'
                                className='mt-5 mb-2 w-100 py-3 fw-bold fs-4 text-uppercase'
                            >
                                Save Changes
                            </Button>
                        </Form>
                    </div>

                    {msg &&
                        <ShowAlert
                            alert={alert}
                        />
                    }
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default ChangePassword