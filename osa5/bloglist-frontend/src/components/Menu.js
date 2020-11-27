import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ loggedInUser, handleLogout }) => {
  return(
    <div className="menu">
        <Link to="/blogs">blogs</Link>
        <Link to="/users" style={{ marginLeft: '.3rem', marginRight: '.3rem'}}>users</Link>
        {loggedInUser.name} logged in
        <button id="logoutButton" onClick = {() => handleLogout()} style={{ marginLeft: '.3rem'}}>logout</button>
    </div>
  )
}

export default Menu
