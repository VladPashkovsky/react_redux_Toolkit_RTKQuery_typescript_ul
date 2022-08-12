import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ITodo } from '../models/ITodo'

export const todoAPI = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    fetchTodos: build.query<ITodo[], number>({
      query: (limit: number = 5) => ({ url: '/todos', params: { _limit: limit } }),
      providesTags: result => ['Todo'],
    }),
    createTodos: build.mutation<ITodo, ITodo>({
      query: (todo) => ({ url: '/todos', method: 'POST', body: todo }),
      invalidatesTags: ['Todo'],
    }),
    updateTodos: build.mutation<ITodo, ITodo>({
      query: (todo) => ({ url: `/todos/${todo.id}`, method: 'PUT', body: todo }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodos: build.mutation<ITodo, ITodo>({
      query: (todo) => ({ url: `/todos/${todo.id}`, method: 'DELETE', body: todo }),
      invalidatesTags: ['Todo'],
    }),
  }),
})
