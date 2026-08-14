import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import StatsCard from '../components/StatsCard'
import './Tasks.css'

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Learn Git',
      description: 'Understand Git commands and branching.',
      priority: 'High',
      completed: true,
    },
    {
      id: 2,
      title: 'Build React frontend',
      description: 'Create the TaskHub frontend using React.',
      priority: 'High',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn Docker',
      description: 'Containerize the frontend and backend.',
      priority: 'Medium',
      completed: false,
    },
  ])

  const addTask = (task) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...task,
        id: Date.now(),
        completed: false,
      },
    ])
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <main className="tasks-page">
      <div className="tasks-container">
        <header className="tasks-header">
          <div>
            <p className="page-label">TASK MANAGEMENT</p>
            <h1>My Tasks</h1>
          </div>
        </header>

        <section className="stats-grid">
          <StatsCard title="Total Tasks" value={totalTasks} />
          <StatsCard title="Completed" value={completedTasks} />
          <StatsCard title="Pending" value={pendingTasks} />
        </section>

        <section className="task-form-section">
          <h2>Add New Task</h2>
          <TaskForm onAddTask={addTask} />
        </section>

        <section className="task-list-section">
          <div className="section-heading">
            <h2>Tasks</h2>
            <span>{totalTasks} tasks</span>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Tasks