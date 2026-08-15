import db from '../database/database.js'

export function getTasks(req, res) {
  const tasks = db
    .prepare(`
      SELECT
        id,
        title,
        description,
        priority,
        completed,
        created_at,
        updated_at
      FROM tasks
      ORDER BY created_at DESC
    `)
    .all()

  const formattedTasks = tasks.map((task) => ({
    ...task,
    completed: Boolean(task.completed)
  }))

  res.json(formattedTasks)
}

export function getTaskById(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: 'Invalid task ID'
    })
  }

  const task = db
    .prepare(`
      SELECT
        id,
        title,
        description,
        priority,
        completed,
        created_at,
        updated_at
      FROM tasks
      WHERE id = ?
    `)
    .get(id)

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    })
  }

  res.json({
    ...task,
    completed: Boolean(task.completed)
  })
}

export function createTask(req, res) {
  const { title, description = '', priority = 'Medium' } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: 'Title is required'
    })
  }

  const validPriorities = ['High', 'Medium', 'Low']

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      error: 'Priority must be High, Medium, or Low'
    })
  }

  const result = db
    .prepare(`
      INSERT INTO tasks (title, description, priority)
      VALUES (?, ?, ?)
    `)
    .run(
      title.trim(),
      description.trim(),
      priority
    )

  const task = db
    .prepare(`
      SELECT
        id,
        title,
        description,
        priority,
        completed,
        created_at,
        updated_at
      FROM tasks
      WHERE id = ?
    `)
    .get(result.lastInsertRowid)

  res.status(201).json({
    ...task,
    completed: Boolean(task.completed)
  })
}

export function updateTask(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: 'Invalid task ID'
    })
  }

  const existingTask = db
    .prepare('SELECT * FROM tasks WHERE id = ?')
    .get(id)

  if (!existingTask) {
    return res.status(404).json({
      error: 'Task not found'
    })
  }

  const {
    title = existingTask.title,
    description = existingTask.description,
    priority = existingTask.priority,
    completed = Boolean(existingTask.completed)
  } = req.body

  const validPriorities = ['High', 'Medium', 'Low']

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      error: 'Priority must be High, Medium, or Low'
    })
  }

  db.prepare(`
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      priority = ?,
      completed = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title.trim(),
    description.trim(),
    priority,
    completed ? 1 : 0,
    id
  )

  const updatedTask = db
    .prepare(`
      SELECT
        id,
        title,
        description,
        priority,
        completed,
        created_at,
        updated_at
      FROM tasks
      WHERE id = ?
    `)
    .get(id)

  res.json({
    ...updatedTask,
    completed: Boolean(updatedTask.completed)
  })
}

export function deleteTask(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: 'Invalid task ID'
    })
  }

  const result = db
    .prepare('DELETE FROM tasks WHERE id = ?')
    .run(id)

  if (result.changes === 0) {
    return res.status(404).json({
      error: 'Task not found'
    })
  }

  res.status(204).send()
}