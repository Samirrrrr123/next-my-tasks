'use client'

import { useState } from 'react'

export default function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '')
  const [category, setCategory] = useState(task?.category || 'Учёба')
  const [priority, setPriority] = useState(task?.priority || 'Обычная')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Введите название задачи')
      return
    }
    onSave({ title: title.trim(), category, priority })
    setTitle('')
    setError('')
  }

  return (
    <form onSubmit={submit} className="task-form">
      <h2>{task ? 'Изменить задачу' : 'Новая задача'}</h2>
      <label>Что нужно сделать?
        <input value={title} onChange={event => setTitle(event.target.value)} maxLength={150} placeholder="Например, закончить проект" required />
      </label>
      <div className="form-row">
        <label>Категория
          <select value={category} onChange={event => setCategory(event.target.value)}>
            <option>Учёба</option><option>Личное</option><option>Дом</option>
          </select>
        </label>
        <label>Приоритет
          <select value={priority} onChange={event => setPriority(event.target.value)}>
            <option>Обычная</option><option>Важная</option>
          </select>
        </label>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="buttons">
        <button type="submit">{task ? 'Сохранить' : 'Добавить задачу'}</button>
        {task && <button type="button" className="secondary" onClick={onCancel}>Отмена</button>}
      </div>
    </form>
  )
}
