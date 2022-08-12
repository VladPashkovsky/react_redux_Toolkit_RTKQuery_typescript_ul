import { AppDispatch } from '../store'
import axios from 'axios'
import { IUser } from '../../models/IUser'
import { userSlice } from './UserSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPosts } from '../../models/IPosts'

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching())
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    dispatch(userSlice.actions.usersFetchingSuccess(response.data))
  } catch (e: any) {
    dispatch(userSlice.actions.usersFetchingError(e.message))
  }
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get<IPosts[]>('https://jsonplaceholder.typicode.com/posts')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)