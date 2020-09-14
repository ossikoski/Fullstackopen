import React from 'react'

const Notification = ({ message }) => {
  const error = message[0]
  const messagetext = message[1]
    if (messagetext === null) {
      return null
    }
    else if (error){
      return (
        <div className="error">
        {message}
      </div>
      )
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

export default Notification