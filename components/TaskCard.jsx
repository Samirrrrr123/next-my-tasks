export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={task.done ? 'task done' : 'task'}>
      <label className="task-title">
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        <span>{task.title}</span>
      </label>
      <div className="task-bottom">
        <div className="tags">
          <span>{task.category}</span>
          {task.priority === 'Важная' && <span className="important">Важная</span>}
          {task.done && <span>Выполнена</span>}
        </div>
        <div className="buttons">
          <button type="button" className="text-button" onClick={() => onEdit(task)}>Изменить</button>
          <button type="button" className="text-button delete" onClick={() => onDelete(task.id)}>Удалить</button>
        </div>
      </div>
    </article>
  )
}
