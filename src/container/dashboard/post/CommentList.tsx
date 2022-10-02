import { styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import {
  Comment,
  CommentListResponse,
  Post,
  useCreateCommentMutation,
  useGetCommentByPostQuery,
  useListJoinCommentPostSubscription,
} from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import CommentInput from './CommentInput';
import CommentItemRoot from './CommentItem';

const RootStyled = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

interface CommentListProps {
  post: Post;
  // comments: Comment[];
}

interface CommentList extends CommentListResponse {
  comment?: Comment[];
}

export default function CommentList({ post }: CommentListProps) {
  const [commentResponse, setCommentResponse] = useState<CommentList>({});
  const [page, setPage] = useState(0);

  const { comment, totalCount, totalPage } = commentResponse;

  const user = useAppSelector((state) => state.auth.user);

  const [message, setMessage] = useState('');

  const { data, fetchMore, previousData } = useGetCommentByPostQuery({
    variables: {
      postId: String(post.id),
      query: {
        page: 0,
        limit: 3,
      },
    },
  });

  const { data: socketData } = useListJoinCommentPostSubscription({
    variables: {
      room: String(post.id),
    },
  });

  useEffect(() => {
    if (data && !previousData) {
      setCommentResponse(data.comments as CommentList);
      setPage(0);
    }
  }, [data]);

  useEffect(() => {
    if (socketData && socketData.listJoinCommentPost.type === 'comment') {
      setCommentResponse((prev) => ({
        ...prev,
        comment: [{ ...(socketData.listJoinCommentPost.data as Comment), reply: [] }, ...(prev.comment as Comment[])],
      }));
    }

    if (socketData && socketData.listJoinCommentPost.type === 'reply') {
      const commentId = socketData.listJoinCommentPost.commentId;
      const reply = socketData.listJoinCommentPost.data;
      console.log(isEmpty(commentResponse.comment?.find((item) => item.id === commentId)));
      setCommentResponse((prev) => ({
        ...prev,
        comment: prev.comment?.map((item) =>
          item.id !== commentId ? item : { ...item, reply: [reply, ...(item.reply as any[])] }
        ),
      }));
    }
  }, [socketData]);

  const [createComment] = useCreateCommentMutation();

  const handleSendComment = async () => {
    try {
      await createComment({
        variables: {
          commentInput: {
            post: post,
            author: user,
            message,
          },
          room: String(post.id),
        },
      });
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewComment = async () => {
    try {
      const { data: fetchMoreData } = await fetchMore({
        variables: {
          query: {
            page: page + 1,
            limit: 3,
          },
        },
      });

      const { comment, ...other } = fetchMoreData.comments as CommentList;

      console.log(fetchMoreData);
      setPage((prev) => prev + 1);
      setCommentResponse((prev) => ({
        comment: [...(prev.comment as any[]), ...(comment as Comment[])],
        ...other,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootStyled>
      <CommentInput value={message} setValue={setMessage} handleSubmit={handleSendComment} />
      {comment?.map((commentItem) => (
        <div key={commentItem.id}>
          <CommentItemRoot key={commentItem.id} comment={commentItem as Comment} post={post} />
        </div>
      ))}
      {Number(page) < Number(totalPage) - 1 && (
        <Typography
          variant="body2"
          mt={1}
          onClick={handleViewComment}
          sx={{
            mt: 1,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          See more {Number(totalCount) - Number(comment?.length)} comments
        </Typography>
      )}
    </RootStyled>
  );
}
