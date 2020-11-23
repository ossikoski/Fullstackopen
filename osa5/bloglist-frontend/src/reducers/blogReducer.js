import blogService from '../services/blogs'

const blogReducer = (state = null, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'INIT':
        return action.data
      case 'NEW':
        return [...state, action.data]
      default:
        return state
    }
}

export const initBlogs = (blogs) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('initBlogs', blogs)
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
    /*
    console.log('reducer initblogs', blogs)
    return {
        type: 'INIT',
        data: {blogs}
    }
    */
}

export const createBlog = (data) => {
    return {
        type: 'NEW',
        data
    }
}

export default blogReducer