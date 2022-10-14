import { alpha, Avatar, Stack, styled, Typography } from '@mui/material';
import { capitalCase } from 'change-case';
import React from 'react';
import { PrivateChat } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { fDistanceStrict, fDistanceToNow } from 'src/utils/formatTime';

interface RootProps {
  reply: boolean;
}

interface MessageProp {
  reply: boolean;
}

const RootStyled = styled('div')<RootProps>(({ theme, reply }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  ...(!reply && {
    justifyContent: 'flex-end',
  }),
  paddingTop: theme.spacing(1),
}));

const MessageStyled = styled('div')<MessageProp>(({ theme, reply }) => ({
  width: 'fit-content',
  maxWidth: 320,
  backgroundColor: reply ? alpha(theme.palette.grey[500], 0.3) : alpha(theme.palette.primary.main, 0.9),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,

  ...(!reply && {
    alignSelf: 'flex-end',
  }),
}));

interface ChatItemProp {
  reply: boolean;
  data: PrivateChat;
}

export default function ChatItem({ reply, data }: ChatItemProp) {
  const user = useAppSelector((state) => state.auth.user);

  const { message, sender, createdAt } = data;
  return (
    <RootStyled reply={reply}>
      {reply && <Avatar src={user?.avatar || ''} sx={{ width: 35, height: 35, alignSelf: 'flex-end' }} />}
      <Stack spacing={0.5}>
        <Typography variant="caption" align={reply ? 'left' : 'right'} mr={1}>
          {reply ? capitalCase(`${sender.firstName} ${sender.lastName}`) : 'You'}, {fDistanceStrict(createdAt)}
        </Typography>
        <MessageStyled reply={reply}>
          <Typography variant="body2">{message}</Typography>
        </MessageStyled>
      </Stack>
    </RootStyled>
  );
}
