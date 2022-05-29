import { io } from 'socket.io-client';

let socket;

export const initiateSocketConnection = () => {
	socket = io('http://192.168.0.15:3000');
	console.log(`Connecting socket...`);
}