import React, { useEffect, useState } from 'react'
import { todoAPI } from '../services/TodoService'
import TodoItem from './TodoItem'
import { ITodo } from '../models/ITodo'

const Todo = () => {
  const [limit, setLimit] = useState(100)
  const { data: todos, isLoading, error, refetch } = todoAPI.useFetchTodosQuery(limit,
    // {pollingInterval: 1000}
  )
  const [createTodos, { isLoading: isCreateLoading, error: isCreateError }] = todoAPI.useCreateTodosMutation()
  const [deleteTodos, {}] = todoAPI.useDeleteTodosMutation()
  const [updateTodos, {}] = todoAPI.useUpdateTodosMutation()

  useEffect(() => {
    // setTimeout(() => {
    //   setLimit(3)
    // }, 2000)
  }, [])

  const handleCreate = async () => {
    const title = prompt()
    await createTodos({ title, body: title } as ITodo)
  }

  const handleRemove = (todo: ITodo) => {
    deleteTodos(todo)
  }

  const handleUpdate = (todo: ITodo) => {
    updateTodos(todo)
  }

  return (
    <div>
      <div className='post__list'>
        {/*<button onClick={() => refetch()}>REFETCH</button>*/}
        <button onClick={handleCreate}>Add Todo</button>
        {isLoading && <h1>loading...</h1>}
        {error && <h1>Error...</h1>}
        {todos && todos.map(todo => <TodoItem remove={handleRemove} update={handleUpdate} key={todo.id} todo={todo} />)}
      </div>
    </div>
  )
}

export default Todo