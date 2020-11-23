const loggedInUserReducer = (state = null, action) => {
    console.log('action', action)
    switch(action.type){
        case 'SET_LOGGED':
            return action.data
        default:
            return state
    }
}

export const setLoggedInUser = user => {
    return{
        type: 'SET_LOGGED',
        data: user
    }
}


export default loggedInUserReducer