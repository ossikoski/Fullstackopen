import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)
    console.log('Users', users)

    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <td></td><td><h3>blogs created</h3></td>
                    </tr>
                </thead>
                <tbody>
                    {users ?
                        users.map(user => 
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                      :
                        <tr></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users
