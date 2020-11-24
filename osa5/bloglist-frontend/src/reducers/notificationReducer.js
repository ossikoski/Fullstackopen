const notificationReducer = (state = ['', false], action) => {
  //Jos notificationin tilan toinen arvo on true, kyseessä on virheviesti.
  console.log('Notification action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ['', false]
    default:
      return state
  }
}
  
export const setNotification = (notification, time) => {
    console.log('reducer setNotification', notification, time)
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