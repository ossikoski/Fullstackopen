import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('Notification', notification)

  if (notification === '') {
    return null
  } 
  /*
  else if (error){
    return (
      <div className="error">
        {notification}
      </div>
    )
  }
  */
  return (
    <div className="notification">
      {notification}
    </div>
  )
}

export default Notification