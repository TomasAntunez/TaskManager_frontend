import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { signOff } = useAuth()

  return (
    <header className="py-5 bg-primary bg-opacity-75">
        <Container className="mx-auto">
            <Row>
                <Col className="justify-content-between">
                    <h1 className="text-white fw-bold">Tasks Manager</h1>
                </Col>

                <Col>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Link to='/admin' className="text-white fs-4 text-uppercase fw-bold nav-link">
                                Tasks
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to='/admin/profile' className="text-white fs-4 text-uppercase fw-bold nav-link">
                                Profile
                            </Link>
                        </Nav.Item>

                        <Nav.Item className="my-auto">
                            <Button
                                variant="primary"
                                className="text-uppercase fw-bold ms-4 text-white p-3"
                                onClick={signOff}
                            >
                                Sign Off
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    </header>
  )
}

export default Header