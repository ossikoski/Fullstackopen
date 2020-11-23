import blogService from '../services/blogs'

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
      default:
        return state
    }
}

export const initBlogs = (blogs) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('initBlogs', blogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
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


export default blogReducer