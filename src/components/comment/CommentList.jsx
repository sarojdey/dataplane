import Comment from "./Comment";

const CommentList = ({
  comments,
  onEditClick,
  onEditChangeCommentContent,
  onEditSetEditingComment,
}) => {
  return (
    <div style={{ width: "100%" }}>
      {comments.map((comment) => (
        <Comment
          onEditSetEditingComment={onEditSetEditingComment}
          onEditChangeCommentContent={onEditChangeCommentContent}
          onEditClick={onEditClick}
          key={comment._id}
          comment={comment}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default CommentList;
