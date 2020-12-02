import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('Notification', notification)

  if (notification[0] === '') {
    return null
  } 
  else if (notification[1]){
    return (
      <Alert variant="danger">
        {notification[0]}
      </Alert>
    )
  }
  return (
    <Alert variant="success">
      {notification[0]}
    </Alert>
  )
}

export default Notification