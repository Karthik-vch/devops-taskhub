import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        DevOps TaskHub
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  )
}

export default Navbar