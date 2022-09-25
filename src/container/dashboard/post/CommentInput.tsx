import { Divider, Input, InputAdornment, styled } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import EmojiPicker from 'src/components/EmojiPicker';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { useListentCommentSubscription, useMutationCommentMutation } from 'src/generated/graphql';

const RootStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
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

interface MessageInputProp {
  receive: string;
}

export default function CommentInput() {
  const [comment, setComment] = useState('');

  const { data, loading } = useListentCommentSubscription();

  const [commentMutation, _] = useMutationCommentMutation();

  useEffect(() => {
    console.log(data, loading);
  }, [data]);

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleComment = async () => {
    try {
      const { data } = await commentMutation({
        variables: {
          message: comment,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
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
          placeholder="Comments"
          endAdornment={
            <InputAdornment position="start" sx={{ gap: 1, mr: 2 }}>
              <IconButtonAnimate size="small" onClick={handleComment}>
                <Iconify icon="carbon:camera" />
              </IconButtonAnimate>
              <EmojiPicker setValue={setComment} value={comment} size="small" />
            </InputAdornment>
          }
        />
      </InputStyled>
    </RootStyled>
  );
}
