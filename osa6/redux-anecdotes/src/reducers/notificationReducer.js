const notificationReducer = (state = ['', null], action) => {
  console.log('notification action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      console.log('timeoutID action data', action.data)
      return action.data
    default:
      return state
  }
}

export const setNotification = (notification, time, oldTimeoutID) => {
  console.log('setNotification notification: ', notification, 'time: ', time, 'OldToId:', oldTimeoutID)
  return async dispatch => {
    var timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: ['', null]
      })
    }, time*1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: [notification, timeoutID]
    })
    if(oldTimeoutID !== null){
      console.log("CLEAR TIMEOUT")
      clearTimeout(oldTimeoutID)
    }
    
  }
}

export default notificationReducer