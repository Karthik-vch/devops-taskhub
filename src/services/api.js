const API_BASE_URL = 'http://localhost:5000/api'

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  return response.json()
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to create task')
  }

  return response.json()
}

export async function updateTask(id, updates) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to update task')
  }

  return response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    let errorMessage = 'Failed to delete task'

    try {
      const errorData = await response.json()
      errorMessage = errorData.error || errorMessage
    } catch {
      // DELETE may return an empty response
    }

    throw new Error(errorMessage)
  }
}