import Alert from 'react-bootstrap/Alert'

const ShowAlert = ({alert}) => {
  return (
    <Alert
      variant={alert.error ? 'danger' : 'success'}
      className='mt-5 py-4 text-uppercase fs-5 text-center fw-bold mx-4'
    >
        {alert.msg}
    </Alert>
  )
}

export default ShowAlert