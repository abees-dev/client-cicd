import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_BASE_API_URL as string, {
  transports: ['websocket'],
});

export default socket;
