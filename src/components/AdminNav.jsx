import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <Nav className='mt-3'>
        <Nav.Item>
            <Link to='/admin/profile' className='fs-4 text-uppercase fw-bold nav-link'>
                Edit Profile
            </Link>
        </Nav.Item>

        <Nav.Item>
            <Link to='/admin/change-password' className='fs-4 text-uppercase fw-bold nav-link mx-3'>
                Change Password
            </Link>
        </Nav.Item>
    </Nav>
  )
}

export default AdminNav