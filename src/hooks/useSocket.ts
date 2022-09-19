import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Nullable } from 'src/types';

export default function useSocket() {
  const [socket, setSocket] = useState<Nullable<Socket>>(null);

  useEffect(() => {
    const socketIo = io('http://localhost:3080', { withCredentials: true });

    setSocket(socketIo);

    const cleanup = () => {
      socketIo.disconnect();
    };
    return cleanup;
  }, []);

  return socket;
}
