const notificationReducer = (state = '', action) => {
  console.log('action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {notification}
  }
}

export default notificationReducer