import React, { createContext, ReactElement, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Maybe } from 'src/generated/graphql';

interface IInitialState {
  socket?: Maybe<Socket>;
}

const initialState: IInitialState = {
  socket: null,
};

export const SocketContext = createContext(initialState);

interface SocketContextProp {
  children: ReactElement;
}

export default function SocketContextProvider({ children }: SocketContextProp) {
  const socketIo = io('http://localhost:3089', { withCredentials: true });

  const socket = useRef<Maybe<Socket>>(null);

  useEffect(() => {
    socket.current = socketIo;

    const cleanup = () => {
      socketIo.disconnect();
    };
    return cleanup;
  }, []);

  return <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>;
}
