import TaskForm from "../components/TaskForm"
import TasksList from "../components/TasksList"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ManagePatients = () => {
  return (
      <Row className="mt-5">
        <Col md='5'>
          <TaskForm />
        </Col>

        <Col md='7'>
          <TasksList />
        </Col>
      </Row>
  )
}

export default ManagePatients