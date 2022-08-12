import { IPosts } from '../../models/IPosts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPosts } from './Action-Creators'

interface PostState {
  posts: IPosts[],
  postIsLoading: boolean,
  postError: string
}

const initialState: PostState = {
  posts: [],
  postIsLoading: false,
  postError: '',
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPosts[]>) => {
      state.posts = action.payload
      state.postIsLoading = false
      state.postError = ''
    },
    [fetchPosts.pending.type]: (state) => {
      state.postIsLoading = true
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.postIsLoading = false
      state.postError = action.payload
    },
  },
})

export default postSlice.reducer