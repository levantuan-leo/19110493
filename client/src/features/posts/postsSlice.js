import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/post', initialPost)
    return response.data
  }
)
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const response = await client.post('/post/edit', initialPost)
    const data = response.data

    return {
      id: data.id,
      changes: {
        ...data
      }
    }
  }
)
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (initialPost) => {
    const response = await client.post('/post/delete', initialPost)
    return response.data
  }
)

export const commentPost = createAsyncThunk(
  'posts/commentPost',
  async (initialPost, { getState }) => {
    console.log(initialPost);

    const response = await client.post('/comment', initialPost)
    const { postId } = response.data
    console.log(getState())
    const data = getState().posts.entities[postId];

    return {
      id: data.id,
      changes: {
        ...data,
        comments: [ ...data.comments, response.data ]
      }
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, _) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(updatePost.fulfilled, postsAdapter.updateOne)
      .addCase(deletePost.fulfilled, postsAdapter.removeOne)
      .addCase(commentPost.fulfilled, postsAdapter.updateOne)
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)
