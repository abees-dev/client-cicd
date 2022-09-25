import { Input, InputAdornment, styled } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import EmojiPicker from 'src/components/EmojiPicker';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { Post, useCreateCommentPostMutation } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';

const RootStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const InputStyled = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  minHeight: 42,
  paddingLeft: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}));

interface CommentInputProps {
  post: Post;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [comment, setComment] = useState('');

  const user = useAppSelector((state) => state.auth.user);

  const [createComment, _] = useCreateCommentPostMutation();

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSendComment = async () => {
    try {
      const newComment = await createComment({
        variables: {
          commentInput: {
            message: comment,
            post,
            user,
          },
          topic: post.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyUp = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleSendComment();
    }
  };
  return (
    <RootStyled>
      <MyAvatar sx={{ width: 35, height: 35 }} />
      <InputStyled>
        <Input
          fullWidth
          disableUnderline
          value={comment}
          onChange={handleOnchange}
          onKeyUp={handleKeyUp}
          placeholder="Comments"
          endAdornment={
            <InputAdornment position="start" sx={{ gap: 1, mr: 2 }}>
              <IconButtonAnimate size="small">
                <Iconify icon="carbon:camera" />
              </IconButtonAnimate>

              <EmojiPicker setValue={setComment} value={comment} size="small" />

              <IconButtonAnimate size="small" onClick={handleSendComment}>
                <Iconify icon="fluent:send-20-regular" />
              </IconButtonAnimate>
            </InputAdornment>
          }
        />
      </InputStyled>
    </RootStyled>
  );
}
