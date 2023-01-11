import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import ShowAlert from './ShowAlert'
import useTasks from '../hooks/useTasks'

const TaskForm = () => {

  const [ content, setContent ] = useState('')
  const [ id, setId ] = useState(null)
  const [ alert, setAlert ] =useState({})

  const { saveTask, task } = useTasks()

  useEffect( () => {
    if( task ) {
      setContent(task.content)
      setId(task._id)
    }
  }, [task])

  const handleSubmit = async e => {
    e.preventDefault()

    if( content === '' ) {
      setAlert({
        msg: 'You cannot create an empty task',
        error: true
      })
      return
    }

    saveTask({content, id})
    setAlert({
      msg: 'Successfully saved'
    })

    setContent('')
    setId(null)
  }

  const { msg } = alert

  return (
    <>
      <div className="shadow bg-body rounded-3 p-4">
        <h2 className="text-secondary mb-3 fw-bold">Add a Task</h2>

        <Form
          className='mt-4 mb-2'
          onSubmit={handleSubmit}
        >

          <Form.Group controlId='content' className='mb-4'>
            <Form.Label className='mb-2 fs-5 text-primary text-opacity-75 fw-bold'>
              Description
            </Form.Label>
            <Form.Control
              as='textarea'
              rows={4}
              className='p-2 mt-1 bg-secondary bg-gradient bg-opacity-10'
              value={content}
              onChange={ e => setContent(e.target.value) }
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='fw-bold text-uppercase w-100 py-2 fs-5'
          >
            Save Task
          </Button>

        </Form>
      </div>

      {msg &&
        <ShowAlert
          alert={alert}
        />
      }
    </>
  )
}

export default TaskForm