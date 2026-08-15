import './TaskCard.css'

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="complete-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard