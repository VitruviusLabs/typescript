import type { MockSocketInterface } from "./definition/interface/mock-socket.interface.mjs";
import { Socket, type SocketConstructorOpts } from "node:net";
import { baseMock } from "../mock-utility/base-mock.mjs";
import { isMockSocket } from "./predicate/is-mock-socket.mjs";

/**
 * Create a mock socket.
 *
 * @remarks
 * Whatever the parameter is, the function will return a mock socket.
 * Steps will be skipped according to the type of the parameter.
 */
function mockSocket(parameter?: MockSocketInterface | Socket | SocketConstructorOpts): MockSocketInterface
{
	if (isMockSocket(parameter))
	{
		return parameter;
	}

	let socket: Socket | undefined = undefined;

	if (parameter instanceof Socket)
	{
		socket = parameter;
	}

	if (parameter !== undefined)
	{
		socket = new Socket(parameter);
	}

	if (socket === undefined)
	{
		socket = new Socket();
	}

	return baseMock({
		instance: socket,
		stubs: {},
	});
}

export { mockSocket };
