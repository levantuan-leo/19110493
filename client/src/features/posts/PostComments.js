import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { commentPost } from './postsSlice';
import { TimeAgo } from './TimeAgo'

export const PostComments = ({ comments, postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onPostCommentClick = () => {
    dispatch(commentPost({ text, postId }))
    setText('');
  }

  return (
  <div className="post-comments">
  <div className="comments-title">Comments</div>
  <ul className="comments-ul">
    {comments?.map((cmt) => (
        <li key={cmt.id} className="comments-li">
            {cmt.text}
            <div className="comments-li__time-ago">
                <TimeAgo timestamp={cmt.date} />
            </div>
        </li>
        )
      )}
  </ul>
  <form id="comment-form" className="comments-input">
    <input 
      type="text" 
      name="postComment" 
      value={text} 
      onChange={(e) => setText(e.target.value)} 
      placeholder="Leave a comment..." 
      required
    />
    <button type="button" className="emoji-button muted-button" onClick={onPostCommentClick}>{">>"}</button>
  </form>
</div>
)
}
