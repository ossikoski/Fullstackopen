const notificationReducer = (state = ['', false], action) => {
  //Jos notificationin tilan toinen arvo on true, kyseessä on virheviesti.
  console.log('action', action)
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}
  
export const setNotification = (notification) => {
    console.log('reducer setNotification', notification)
    return {
        type: 'SET_NOTIFICATION',
        data: notification
    }
}

export default notificationReducer