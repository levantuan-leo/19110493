import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { deletePost, selectPostById } from './postsSlice'
import { PostComments } from './PostComments'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const dispatch = useDispatch()
  const history = useHistory()

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onDeletePostClicked = () => {
    if (window.confirm("Are you sure?") === true) {
      dispatch(deletePost({ postId }))
      history.push(`/`)
    }
  }

  return (
    <section>
      <article className="post">
        <div className="post-title">
          <h2>{post.title}</h2>
          <div className="post-action">
            <Link to={`/editPost/${post.id}`} className="button muted-button edit">
              Edit Post
            </Link>
            <button className="button delete" onClick={onDeletePostClicked}>
              <span>-</span>
            </button>
          </div>
        </div>  
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <PostComments comments={post.comments} postId={post.id}/>
      </article>
    </section>
  )
}
