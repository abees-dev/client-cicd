import { Avatar, Box, Divider, Stack, styled, Typography } from '@mui/material';
import { MutableRefObject } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { MessageResponse } from 'src/types/response';
import { fDistanceToNow } from 'src/utils/formatTime';
import MessageInput from './MessageInput';

const RootStyle = styled('div')(({ theme }) => ({
  flex: 1,
}));

interface MessageBoxProp {
  receive: string;
  messageList: MessageResponse[];
  viewRef: MutableRefObject<HTMLInputElement | undefined>;
}
export default function MessageBox({ receive, messageList, viewRef }: MessageBoxProp) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <RootStyle>
      <Box>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ height: 92 }}>
          <Avatar src="" sx={{ width: 45, height: 45 }} />
          <Box>
            <Typography variant="subtitle1">Abees</Typography>
            <Typography variant="caption">Online</Typography>
          </Box>
        </Stack>
        <Divider />
        <Box sx={{ height: 600, display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>
          {messageList.map((message) => (
            <MessageItem key={message.id} message={message} isReply={message.sender.id !== user?.id} />
          ))}
          <Box sx={{ height: 2 }} ref={viewRef}></Box>
        </Box>
        <MessageInput receive={receive} />
      </Box>
    </RootStyle>
  );
}

interface MessageItemProp {
  isReply: boolean;
}

const MessageItemStyle = styled('div')<MessageItemProp>(({ theme, isReply }) => ({
  backgroundColor: isReply ? theme.palette.grey[700] : theme.palette.primary.main,
  maxWidth: 240,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
  height: 'fit-content',
  wordWrap: 'break-word',
}));

const MessageItemRoot = styled('div')<MessageItemProp>(({ theme, isReply }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  ...(!isReply && {
    justifyContent: 'flex-end',
  }),
}));

const MessageItemBoxStyle = styled('div')(({ theme }) => ({}));

interface MessageItem {
  message: MessageResponse;
  isReply: boolean;
}

function MessageItem({ message, isReply }: MessageItem) {
  return (
    <MessageItemRoot isReply={isReply}>
      {isReply && <Avatar src="" sx={{ width: 40, height: 40, mt: 2 }} />}
      <Stack alignItems={!isReply ? 'flex-end' : 'flex-start'}>
        <MessageItemStyle isReply={isReply}>
          <Typography>{message.message}</Typography>
        </MessageItemStyle>
        <Typography variant="caption" ml={1} mt={0.5} align={!isReply ? 'right' : 'left'}>
          {fDistanceToNow(Number(message.createdAt))}
        </Typography>
      </Stack>
      {!isReply && <Avatar src="" sx={{ width: 40, height: 40, mt: 2 }} />}
    </MessageItemRoot>
  );
}
