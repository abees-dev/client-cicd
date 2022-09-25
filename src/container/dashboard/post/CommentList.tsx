import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Comment, Post, useGetCommentByPostQuery, useListenCommentPostSubscription } from 'src/generated/graphql';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const RootStyled = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
}));

interface CommentListProps {
  post: Post;
  // comments: Comment[];
}

export default function CommentList({ post }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  const { data } = useGetCommentByPostQuery({
    variables: {
      postId: Number(post.id),
    },
  });

  const { data: socketData } = useListenCommentPostSubscription({
    variables: {
      topic: post.id,
    },
  });

  useEffect(() => {
    if (data) {
      setComments(data.comments as Comment[]);
    }
  }, [data]);

  useEffect(() => {
    if (socketData) {
      setComments((prev) => [socketData.listenCommentPost as Comment, ...prev]);
    }
  }, [socketData]);

  return (
    <RootStyled>
      <CommentInput post={post as Post} />
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment as Comment} />
      ))}
    </RootStyled>
  );
}
