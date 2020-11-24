import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const paramsUserId = useParams().id
    const users = useSelector(state => state.users)
    let user = null
    if(users){
        user = users.find(u => u.id === paramsUserId)
    }

    return(
        <div>
            {user ?
            <div>
                <h2>{user.name}</h2>
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map(blog => 
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    )}
                </ul>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

export default User
