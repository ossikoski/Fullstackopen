const notificationReducer = (state = ['', false, null], action) => {
  //Jos notificationin tilan toinen arvo on true, kyseessä on virheviesti.
  console.log('Notification action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ['', false, null]
    default:
      return state
  }
}
  
export const setNotification = (notificationText, error, oldTimeoutID, time) => {
    console.log('reducer setNotification', notificationText, time)
    return async dispatch => {
      var timeoutID = setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, time*1000)
      dispatch({
        type: 'SET_NOTIFICATION',
        data: [notificationText, error, timeoutID]
      })
      if(oldTimeoutID !== null){
        clearTimeout(oldTimeoutID)
      }
      
    }
}

export default notificationReducer