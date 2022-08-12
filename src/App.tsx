import React, { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchPosts, fetchUsers } from './store/reducers/Action-Creators'
import Todo from './components/Todo'

function App() {
  const { users, isLoading, error } = useAppSelector(state => state.userReducer)
  const { posts, postIsLoading, postError } = useAppSelector(state => state.postsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPosts())
  }, [])

  return (
    <div className='App'>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error...{error}</h1>}
      {JSON.stringify(users, null, 2)}
      <hr style={{margin: '20px'}}/>
      {postIsLoading && <h1>Loading...</h1>}
      {postError && <h1>Error...{postError}</h1>}
      {JSON.stringify(posts, null, 2)}
      <hr style={{margin: '20px'}}/>
      <Todo />
    </div>
  )
}

export default App
