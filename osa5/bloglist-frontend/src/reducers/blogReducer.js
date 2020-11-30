import blogService from '../services/blogs'

const compareByLikes = (a, b) => {
    if(a.likes < b.likes){
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0
}

const blogReducer = (state = null, action) => {
    console.log('action', action)
    switch(action.type) {
      case 'INIT_BLOGS':
        return action.data
      case 'NEW_BLOG':
        return action.data
      case 'LIKE_BLOG':
        return action.data
      case 'DEL_BLOG':
        return action.data
      case 'COM_BLOG':
        return action.data
      default:
        return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort(compareByLikes)
        console.log('initBlogs', sortedBlogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: sortedBlogs
        })
    }
}

export const createBlog = (blogObject) => {
    // Ei tarvitse erikseen huolehtia järjestyksestä, koska uudella on 0 likeä joten se tulee aina ensin viimeiseksi.

    return async dispatch => {
        await blogService.create(blogObject)

        const blogs = await blogService.getAll()
        console.log('createBlog', blogs)
        dispatch({
            type: 'NEW_BLOG',
            data: blogs
        })
    }
    
}

export const  likeBlog = (blog) => {
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
            type: 'LIKE_BLOG',
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
            type: 'DEL_BLOG',
            data: filteredBlogs
        })
    }
}

export const commentBlog = (blogId, comment) => {
    console.log('blogReducer comment', blogId, comment)
    return async dispatch => {
        await blogService.comment(blogId, comment)
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort(compareByLikes)
        dispatch({
            type: 'COM_BLOG',
            data: sortedBlogs
        })
    }
}

export default blogReducer