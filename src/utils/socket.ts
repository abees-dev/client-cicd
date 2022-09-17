import { io } from 'socket.io-client';

const socket = io('http://localhost:3080', {
  transports: ['websocket'],
});

export default socket;
