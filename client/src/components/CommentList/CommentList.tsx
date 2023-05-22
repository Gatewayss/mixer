import React, {FunctionComponent} from 'react';
import './commentList.css';


interface Comment {
  _id: string
  commentText: string
  commentAuthor: string
  createdAt: string
}

type CommentProps = {
  comments: any  
}

const CommentList:FunctionComponent<CommentProps> = ({ comments }) => {
  // console.log(comments);
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div className="commentlist-container">
      <h3 className="commentlist-header">
        Comments
      </h3>
      <div className="comment-container">
        {comments &&
          comments.map((comment: Comment) => (
            <div key={comment._id}>
              <div className="single-comment">
                <h5 className="comment-header">
                  {comment.commentAuthor} commented{' '}
                  <span >
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="comment-body">{comment.commentText}</p>
            </div>
          </div>
        ))}
    </div>
  </div>
);
};

export default CommentList;
