import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <main className="home">
      <section className="home-content">
        <p className="home-label">DEVOPS LEARNING PROJECT</p>

        <h1>
          Build.
          <br />
          Deploy.
          <br />
          Learn.
        </h1>

        <p className="home-description">
          DevOps TaskHub is a full-stack application that we will build
          from scratch while learning the complete DevOps lifecycle.
        </p>

        <Link to="/tasks" className="primary-button">
          View Tasks
        </Link>
      </section>
    </main>
  )
}

export default Home