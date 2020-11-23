import blogService from '../services/blogs'

const blogReducer = (state = null, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'INIT':
        return action.data
      case 'NEW':
        return [...state, action.data]
      case 'LIKE':
        return action.data
      case 'DEL':
        return action.data
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
}

export const createBlog = (data) => {
    // Ei tarvitse erikseen huolehtia järjestyksestä, koska uudella on 0 likeä joten se tulee aina ensin viimeiseksi.
    return {
        type: 'NEW',
        data
    }
}

export const  likeBlog = (blog) => {
    const compareByLikes = (a, b) => {
        if(a.likes < b.likes){
          return 1
        }
        if(a.likes > b.likes){
          return -1
        }
        return 0
    }

    return async dispatch => {
        const newObject = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        const likedBlog = await blogService.update(blog.id, newObject)

        const blogs = await blogService.getAll()
        const mappedBlogs = blogs.map(blog => blog.id !== newObject.id ? blog : likedBlog)
        const sortedBlogs = mappedBlogs.sort(compareByLikes)
        dispatch({
            type: 'LIKE',
            data: sortedBlogs
        })
    }
}

export const deleteBlog = (blogId) => {
    return async dispatch => {
        await blogService.deleting(blogId)
        const blogs = await blogService.getAll()
        const filteredBlogs = blogs.filter(blog => blog.id !== blogId)
        console.log('filteredBlogs', filteredBlogs)
        dispatch({
            type: 'DEL',
            data: filteredBlogs
        })
    }
}


export default blogReducer