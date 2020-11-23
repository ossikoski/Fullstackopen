import userService from '../services/users'

const userReducer = (state = null, action) => {
    console.log('action', action)
    switch(action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}
    
export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        console.log('initUsers', users)
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}
  
export default userReducer