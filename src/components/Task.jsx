import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useTasks from '../hooks/useTasks'

const Task = ({task}) => {

    const { content, createdAt, updatedAt, _id } = task

    const { setEdition, deleteTask } = useTasks()

    const formatDate = (date) => {
      const newDate = new Date(date)
      return new Intl.DateTimeFormat('es-Ar').format(newDate)
    }

  return (
    <Card className='shadow bg-body rounded-3 mx-5 my-4'>
      <Card.Body>
        <Row>
          <Col xs={9}>
            <p className='fs-5'>{content}</p>
          </Col>

          <Col xs={3} className='border-start border-3'>
            <Button
              variant='primary opacity-75'
              className='w-100 my-auto'
              onClick={() => setEdition(task)}
            >
              Edit
            </Button>

            <Button
              variant='danger opacity-75'
              className='w-100 mt-3'
              onClick={() => deleteTask(_id)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>

      <Card.Footer className='bg-light bg-opacity-50 pb-0'>
        <Row className='m-0'>
          <Col>
            <p className='text-secondary fw-bold'>Created: <span>{formatDate(createdAt)}</span></p>
          </Col>

          {
            createdAt !== updatedAt &&
              <Col>
                <p className='text-secondary text-end fw-bold'>Updated: <span>{formatDate(updatedAt)}</span></p>
              </Col>
          }
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default Task