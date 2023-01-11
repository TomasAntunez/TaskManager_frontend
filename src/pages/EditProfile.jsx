import AdminNav from "../components/AdminNav"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ShowAlert from "../components/ShowAlert"

import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

const EditProfile = () => {

    const [ profile, setProfile ] = useState({})
    const [ alert, setAlert ] = useState({})

    const { auth, updateProfile } = useAuth()

    useEffect( () => {
        setProfile(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()

        const { name, email } = profile

        if( [name, email].includes('') ) {
            setAlert({ msg: 'All fields are required', error: true })
            return
        }

        const result = await updateProfile(profile)
        setAlert(result)
    }

    const { msg } = alert

  return (
    <>
        <AdminNav />

        <h2 className="fs-1 text-center fw-bold mt-5">
            Edit Account
        </h2>

        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="shadow bg-body rounded-3 p-4 mt-5">

                        <p className="fs-3 text-center text-secondary text-opacity-75">
                            Edit your
                            <span className="fw-bold text-primary text-opacity-75"> profile</span>
                        </p>

                        <Form
                            className="mt-5"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group>
                                <Form.Label className='text-uppercase text-secondary fw-bold fs-4'>
                                    Name
                                </Form.Label>
                                <Form.Control
                                    name="name"
                                    type='text'
                                    className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                                    value={ profile.name || '' }
                                    onChange={ e => setProfile({
                                        ...profile,
                                        [e.target.name] : e.target.value
                                    })}
                                />
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Form.Label className='text-uppercase text-secondary fw-bold fs-4'>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    name="email"
                                    type='email'
                                    className='p-3 mt-1 bg-secondary bg-gradient bg-opacity-10'
                                    value={ profile.email || '' }
                                    onChange={ e => setProfile({
                                        ...profile,
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

export default EditProfile