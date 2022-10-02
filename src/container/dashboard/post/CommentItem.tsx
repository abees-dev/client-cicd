import { alpha, Avatar, Box, Link, Stack, styled, SxProps, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import ProfileTooltip from 'src/components/ProfileTooltip';
import { Comment, Post, ReplyCommentPost, useCreateReplyCommentMutation, User } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { fDistanceToNow } from 'src/utils/formatTime';
import CommentInput from './CommentInput';
import NextLink from 'next/link';

const CommentsItemStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: alpha(theme.palette.divider, 0.2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
}));

const ActionStyled = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  fontWeight: 700,
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

interface CommentItemProp {
  comment: Partial<Comment> | Partial<ReplyCommentPost>;
  sx?: SxProps;
  handleOpenRely?: () => void;
  type?: string;
}

function CommentItem({ comment, sx, handleOpenRely }: CommentItemProp) {
  const { avatar, firstName, lastName, id: userId } = comment.author as User;
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mt: 1,
        ...sx,
      }}
    >
      <ProfileTooltip userId={String(userId)}>
        <Avatar src={avatar || ''} sx={{ width: 35, height: 35, cursor: 'pointer' }} />
      </ProfileTooltip>
      <Box sx={{ width: 1 }}>
        <CommentsItemStyled>
          <Stack>
            <ProfileTooltip userId={String(userId)}>
              <NextLink href="/">
                <Link
                  variant="caption"
                  underline="hover"
                  color="inherit"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >{`${firstName} ${lastName}`}</Link>
              </NextLink>
            </ProfileTooltip>
            <Typography variant="body2" sx={{ lineHeight: (theme) => theme.typography.caption.lineHeight }}>
              {comment.message}
            </Typography>
          </Stack>
        </CommentsItemStyled>
        <Stack direction="row" spacing={2} mt={0.5} ml={1} alignItems="baseline">
          <ActionStyled>Like</ActionStyled>
          <ActionStyled onClick={handleOpenRely}>Reply</ActionStyled>
          <ActionStyled sx={{ fontWeight: 300, fontSize: 11 }}>
            {fDistanceToNow(Number(comment?.createdAt))}
          </ActionStyled>
        </Stack>
      </Box>
    </Stack>
  );
}

interface CommentItemRootProp {
  comment: Partial<Comment>;
  count?: number;
  post: Post;
}

export default function CommentItemRoot({ comment, post }: CommentItemRootProp) {
  const [openRely, setOpenReply] = useState(false);
  const [reply, setRely] = useState('');
  const user = useAppSelector((state) => state.auth.user);

  const [commentState, setCommentState] = useState<Comment>(comment as Comment);

  useEffect(() => {
    setCommentState(comment as Comment);
  }, [comment]);

  const handleOpenRely = () => {
    setOpenReply(true);
  };
  const hashReply = isEmpty(commentState.reply);

  const [replyComment] = useCreateReplyCommentMutation();

  const handleSendReply = async () => {
    try {
      await replyComment({
        variables: {
          replyInput: {
            author: user,
            comment: comment,
            message: reply,
          },
          room: String(post.id),
        },
      });
      setOpenReply(false);
      setRely('');
    } catch (error) {
      console.log(error);
    }
  };

  const [replyPage, setReplyPage] = useState(3);

  if (!hashReply) {
    const length = commentState.reply?.length;

    const handleSeeRely = () => {
      if (replyPage < Number(length)) {
        setReplyPage((prev) => prev + 3);
      }
    };
    return (
      <>
        <CommentItem comment={comment} handleOpenRely={handleOpenRely} />
        {openRely && (
          <CommentInput sx={{ mt: 2, ml: 6 }} value={reply} setValue={setRely} handleSubmit={handleSendReply} />
        )}
        {commentState?.reply?.slice(0, replyPage)?.map((reply) => (
          <CommentItem
            handleOpenRely={handleOpenRely}
            key={reply.id}
            sx={{
              ml: 6,
            }}
            comment={reply}
          />
        ))}
        {Number(length) - replyPage > 0 && (
          <Typography
            variant="caption"
            onClick={handleSeeRely}
            sx={{
              mt: 1,
              ml: 12,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            See more {Number(length) - replyPage} reply
          </Typography>
        )}
      </>
    );
  }

  return (
    <>
      <CommentItem comment={comment} handleOpenRely={handleOpenRely} />
      {openRely && (
        <CommentInput sx={{ mt: 2, ml: 6 }} value={reply} setValue={setRely} handleSubmit={handleSendReply} />
      )}
    </>
  );
}
