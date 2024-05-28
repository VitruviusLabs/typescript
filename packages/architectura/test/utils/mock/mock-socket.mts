import { Socket, type SocketConstructorOpts } from "node:net";

function mockSocket(options?: SocketConstructorOpts): Socket
{
	const SOCKET: Socket = new Socket(options);

	return SOCKET;
}

export { mockSocket };
