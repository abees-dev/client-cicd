import {
  Avatar,
  Box,
  Card,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getAllUser, getMessage } from 'src/api/message';
import useSocket from 'src/hooks/useSocket';
import { useAppSelector } from 'src/redux/hooks';
import { User } from 'src/types';
import { MessageResponse } from 'src/types/response';
import MessageBox from './MessageBox';

const RootStyle = styled(Card)(() => ({
  display: 'flex',
  gap: 2,
}));

export default function Message() {
  const { user } = useAppSelector((state) => state.auth);
  const viewRef = useRef<HTMLInputElement>();

  const [allUser, setAllUser] = useState<User[]>([]);

  const [receive, setReceive] = useState('');

  const socket = useSocket();
  const [messageList, setMessageList] = useState<MessageResponse[]>([]);

  useQuery(
    ['message', { sender: user?.id, receive }],
    () =>
      getMessage({
        params: {
          sender: user?.id,
          receive,
        },
      }),
    {
      enabled: !!receive,
      onSuccess({ data }) {
        setMessageList(data.data);
      },
    }
  );

  const handleScrollIsview = () => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (socket) {
      // socket.emit('created-room', { user_id: user?.id });
      socket.on('private-chat', (msg) => {
        setMessageList((prev) => [...prev, msg]);
        handleScrollIsview();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit('join-chat-room', { sender: user?.id, receive });
      console.log('first');
    }
  }, [socket, receive]);

  useEffect(() => {
    handleScrollIsview();
  }, [messageList]);

  useQuery(
    ['user-chat', { type: 'ne', user_id: user?.id }],
    () =>
      getAllUser({
        params: {
          type: 'ne',
          id: user?.id,
        },
      }),
    {
      onSuccess({ data }) {
        const newUser = data.user as unknown as User[];
        setAllUser([...newUser]);
      },
    }
  );

  const handleClick = (id: string) => {
    setReceive(id);
  };

  return (
    <RootStyle>
      <Box sx={{ width: 320 }}>
        <List>
          {allUser.map((user) => (
            <ListItemButton key={user.id} sx={{ borderRadius: 1 }} onClick={() => handleClick(user.id)}>
              <ListItemAvatar>
                <Avatar src="" />
              </ListItemAvatar>
              <ListItemText>
                <Typography>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="caption">status</Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
      {/* <Stack>
        {mess.map((item, index) => (
          <div key={index}>
          <Typography key={index}>{item.message}</Typography>
          </div>
          ))}
          
          <TextField fullWidth label="Chat" onChange={(event) => setMessage(event.target.value)} />
        </Stack> */}
      {/* <Button onClick={handleSendChat}>Send Chat</Button> */}
      <MessageBox receive={receive} messageList={messageList} viewRef={viewRef} />
    </RootStyle>
  );
}
