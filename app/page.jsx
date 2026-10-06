'use client'

import { useEffect, useState } from 'react'
import initialTasks from '../data/tasks'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'

export default function HomePage() {
  const [tasks, setTasks] = useState([])
  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Все')
  const [status, setStatus] = useState('Все')
  const [editing, setEditing] = useState(null)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('my-tasks')
      const list = saved ? JSON.parse(saved) : initialTasks
      if (!Array.isArray(list) || !list.every(task => typeof task.title === 'string' && typeof task.done === 'boolean')) {
        throw new Error('Некорректные данные')
      }
      setTasks(list)
    } catch {
      setTasks(initialTasks)
      setStorageError('Не удалось прочитать сохранённые задачи. Открыт пример списка.')
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem('my-tasks', JSON.stringify(tasks))
    } catch {
      setStorageError('Браузер не разрешает сохранять задачи. После перезагрузки изменения могут потеряться.')
    }
  }, [tasks, ready])

  function saveTask(values) {
    if (editing) {
      setTasks(tasks.map(task => task.id === editing.id ? { ...task, ...values } : task))
      setEditing(null)
    } else {
      setTasks([...tasks, { id: crypto.randomUUID(), ...values, done: false }])
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  function editTask(task) {
    setEditing(task)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const visibleTasks = tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(search.trim().toLowerCase())
    const matchesCategory = category === 'Все' || task.category === category
    const matchesStatus = status === 'Все' || (status === 'Выполненные' ? task.done : !task.done)
    return matchesTitle && matchesCategory && matchesStatus
  })
  const completed = tasks.filter(task => task.done).length

  if (!ready) return <p>Загрузка задач...</p>

  return (
    <>
      <div className="intro"><h1>Дела на каждый день</h1><p>Запишите задачи и отмечайте то, что уже готово.</p></div>
      <div className="summary"><span>Всего: <b>{tasks.length}</b></span><span>Осталось: <b>{tasks.length - completed}</b></span><span>Выполнено: <b>{completed}</b></span></div>
      {storageError && <p className="error" role="alert">{storageError}</p>}
      <TaskForm key={editing?.id || 'new'} task={editing} onSave={saveTask} onCancel={() => setEditing(null)} />
      <section className="task-list">
        <h2>Мой список</h2>
        <div className="filters">
          <label>Поиск<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Название задачи" /></label>
          <label>Категория<select value={category} onChange={event => setCategory(event.target.value)}><option>Все</option><option>Учёба</option><option>Личное</option><option>Дом</option></select></label>
          <label>Статус<select value={status} onChange={event => setStatus(event.target.value)}><option>Все</option><option>Активные</option><option>Выполненные</option></select></label>
        </div>
        {visibleTasks.map(task => <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />)}
        {visibleTasks.length === 0 && <p className="empty">{tasks.length === 0 ? 'Задач пока нет. Добавьте первую выше.' : 'По этим условиям задачи не найдены.'}</p>}
      </section>
      <p className="hint">Задачи сохраняются в этом браузере.</p>
    </>
  )
}
