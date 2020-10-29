const notificationReducer = (state = '', action) => {
  console.log('notification action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  console.log('setNotification notification: ', notification, 'time: ', time)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time*1000)
  }
}

export default notificationReducer