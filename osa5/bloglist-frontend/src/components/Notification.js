import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('Notification', notification)

  if (notification[0] === '') {
    return null
  } 
  else if (notification[1]){
    return (
      <div className="error">
        {notification}
      </div>
    )
  }
  return (
    <div className="notification">
      {notification[0]}
    </div>
  )
}

export default Notification