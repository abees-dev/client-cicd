import { Divider, Input, InputAdornment, styled } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import useSocket from 'src/hooks/useSocket';
import { useAppSelector } from 'src/redux/hooks';

const RootStyle = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  minHeight: 56,
  paddingLeft: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
}));

interface MessageInputProp {
  receive: string;
}

export default function MessageInput({ receive }: MessageInputProp) {
  const [message, setMessage] = useState('');

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const user = useAppSelector((state) => state.auth.user);

  const socket = useSocket();

  const handleSendMessage = () => {
    socket?.emit('private-chat', { sender: user, receive, message });
    setMessage('');
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && message) {
      handleSendMessage();
    }
  };

  return (
    <RootStyle>
      <Input
        fullWidth
        disableUnderline
        value={message}
        onChange={handleOnchange}
        onKeyUp={handleKeyUp}
        placeholder="Type message"
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="logos:jwt-icon" />
          </InputAdornment>
        }
      />
      <Divider flexItem orientation="vertical" />
      <IconButtonAnimate sx={{ mx: 1.5 }} onClick={handleSendMessage}>
        <Iconify icon="akar-icons:send" />
      </IconButtonAnimate>
    </RootStyle>
  );
}
