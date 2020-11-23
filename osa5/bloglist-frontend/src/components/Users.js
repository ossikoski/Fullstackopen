import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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
                                    <td>{user.name}</td><td>{user.blogs.length}</td>
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
