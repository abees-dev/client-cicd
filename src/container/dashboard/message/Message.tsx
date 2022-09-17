import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSocket from '../../../hooks/useSocket';

export default function MessageBox() {
  const [message, setMessage] = useState('');
  const [mess, setMess] = useState<string[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('message:1', (msg: string) => {
        console.log(msg);
        setMess((prev) => [...prev, msg]);
      });
      console.log('first');
    }
  }, [socket]);

  const handleSendChat = () => {
    socket?.emit('message:1', 'message');
  };

  return (
    <Container maxWidth="sm">
      {mess.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}

      <TextField fullWidth label="Chat" onChange={(event) => setMessage(event.target.value)} />
      <Button onClick={handleSendChat}>Send Chat</Button>
    </Container>
  );
}
