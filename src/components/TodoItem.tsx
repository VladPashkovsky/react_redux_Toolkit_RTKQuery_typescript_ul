import React, { FC } from 'react'
import { ITodo } from '../models/ITodo'

interface TodoItemProps {
  todo: ITodo,
  remove: (todo: ITodo) => void,
  update: (todo: ITodo) => void
}

const TodoItem: FC<TodoItemProps> = ({ todo, remove, update }) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(todo)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || ''
    update({ ...todo, title })
  }

  return (
    <div className='post' onClick={handleUpdate}>
      {todo.id}. {todo.title}
      <button onClick={handleRemove}>Delete</button>
    </div>
  )
}

export default TodoItem