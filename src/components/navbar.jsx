import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>DevOps TaskHub</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/tasks">Tasks</a>
        <a href="/about">About</a>
      </div>
    </nav>
  )
}

export default Navbar