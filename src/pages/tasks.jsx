import { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import StatsCard from '../components/StatsCard'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/api'
import './Tasks.css'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError('')

        const data = await getTasks()

        setTasks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const addTask = async (task) => {
    try {
      setError('')

      const newTask = await createTask(task)

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ])
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleTask = async (id) => {
    const currentTask = tasks.find((task) => task.id === id)

    if (!currentTask) {
      return
    }

    try {
      setError('')

      const updatedTask = await updateTask(id, {
        completed: !currentTask.completed,
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      )
    } catch (error) {
      setError(error.message)
    }
  }

  const removeTask = async (id) => {
    try {
      setError('')

      await deleteTask(id)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      setError(error.message)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

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
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
          />
        </section>

        <section className="task-form-section">
          <h2>Add New Task</h2>

          <TaskForm onAddTask={addTask} />
        </section>

        <section className="task-list-section">
          <div className="section-heading">
            <h2>Tasks</h2>

            <span>
              {totalTasks} tasks
            </span>
          </div>

          {loading && (
            <p>Loading tasks...</p>
          )}

          {error && (
            <p>{error}</p>
          )}

          {!loading && !error && (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={removeTask}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Tasks