import { useGetAllCommentsQuery } from "@/features/comment/commentSlice";
import { useParams } from "react-router-dom";

import CommentItem from "../TempPost/CommentItem";
import Box from "@mui/material/Box";
import CommentForm from "../TempPost/CommentForm";
import { useState } from "react";

const CommentPage = ({ postId }) => {
  const [mentionUser, setMentionUser] = useState();

  const {
    commentId,
    // postId
  } = useParams();
  const { data: comments } = useGetAllCommentsQuery(postId);
  const selectedComment = comments?.filter(
    (comment) => comment._id === commentId
  );
  console.log(comments);
  return (
    <>
      <Box>
        <CommentForm
          mentionUser={mentionUser}
          setMentionUser={setMentionUser}
        />
      </Box>
      <Box>
        {comments && (
          <Box>
            {comments?.map((comment) => (
              <Box sx={{ padding: "0.5rem 1rem" }} key={comment._id}>
                <CommentItem comment={comment} setMentionUser={setMentionUser}>
                  {comment.replies?.map((reply) => (
                    <CommentItem
                      comment={reply}
                      key={reply._id}
                      setMentionUser={setMentionUser}
                    />
                  ))}
                </CommentItem>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CommentPage;
