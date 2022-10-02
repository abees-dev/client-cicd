import { Input, InputAdornment, styled, SxProps } from '@mui/material';
import { ChangeEvent, Dispatch, KeyboardEvent } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import EmojiPicker from 'src/components/EmojiPicker';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { Comment, Post } from 'src/generated/graphql';

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

type TypeProp = 'reply' | 'comment';
interface CommentInputProps {
  post?: Post;
  type?: TypeProp;
  sx?: SxProps;
  currentComment?: Comment;
  value: string;
  setValue: Dispatch<string>;
  handleSubmit: () => void;
}

export default function CommentInput({ sx, handleSubmit, value, setValue }: CommentInputProps) {
  const handleKeyUp = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <RootStyled sx={sx}>
      <MyAvatar sx={{ width: 35, height: 35 }} />
      <InputStyled>
        <Input
          fullWidth
          disableUnderline
          value={value}
          onChange={handleOnchange}
          onKeyUp={handleKeyUp}
          placeholder="Comments"
          endAdornment={
            <InputAdornment position="start" sx={{ gap: 1, mr: 2 }}>
              <IconButtonAnimate size="small">
                <Iconify icon="carbon:camera" />
              </IconButtonAnimate>

              <EmojiPicker setValue={setValue} value={value} size="small" />

              <IconButtonAnimate size="small" onClick={handleSubmit}>
                <Iconify icon="fluent:send-20-regular" />
              </IconButtonAnimate>
            </InputAdornment>
          }
        />
      </InputStyled>
    </RootStyled>
  );
}
