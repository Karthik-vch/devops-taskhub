import './StatsCard.css'

function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  )
}

export default StatsCard