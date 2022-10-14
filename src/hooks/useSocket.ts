import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from 'src/contexts/SocketContext';
import { Maybe } from 'src/generated/graphql';

export default function useSocket() {
  // const [socket, setSocket] = useState<Maybe<Socket>>(null);

  // useEffect(() => {
  //   const socketIo = io('http://localhost:3089', { withCredentials: true });

  //   setSocket(socketIo);

  //   const cleanup = () => {
  //     socketIo.disconnect();
  //   };
  //   return cleanup;
  // }, []);

  // return socket;

  return null;
}
