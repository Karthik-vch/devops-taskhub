import './About.css'

function About() {
  return (
    <main className="about-page">
      <section className="about-content">
        <p className="page-label">ABOUT THE PROJECT</p>

        <h1>Learning DevOps by building.</h1>

        <p>
          DevOps TaskHub is a practical project designed to teach
          software development, testing, containerization, CI/CD,
          cloud deployment, monitoring, security, and maintenance.
        </p>

        <div className="learning-grid">
          <div>
            <h3>Frontend</h3>
            <p>React and Vite</p>
          </div>

          <div>
            <h3>Backend</h3>
            <p>Node.js and Express</p>
          </div>

          <div>
            <h3>Database</h3>
            <p>SQLite</p>
          </div>

          <div>
            <h3>DevOps</h3>
            <p>Docker, GitHub Actions and AWS</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About