import type { Socket, SocketConstructorOpts } from "node:net";
import type { MockContextInterface } from "./definition/interface/mock-context.interface.mjs";
import type { MockResponseInterface } from "./definition/interface/mock-response.interface.mjs";
import type { MockRequestInterface } from "./definition/interface/mock-request.interface.mjs";
import type { MockSocketInterface } from "./definition/interface/mock-socket.interface.mjs";
import { stub } from "sinon";
import { baseMock } from "../mock-utility/base-mock.mjs";
import { mockResponse } from "./mock-response.mjs";
import { isMockContext } from "./predicate/is-mock-context.mjs";
import { ExecutionContext, type RichClientRequest, type RichServerResponse } from "../../src/_index.mjs";

/**
 * Create a mock context.
 *
 * @remarks
 * Whatever the parameter is, the function will return a mock context.
 * Steps will be skipped according to the type of the parameter.
 */
function mockContext(
	parameter?:
		| ExecutionContext
		| MockContextInterface
		| MockRequestInterface
		| MockResponseInterface
		| MockSocketInterface
		| RichClientRequest
		| RichServerResponse
		| Socket
		| SocketConstructorOpts
): MockContextInterface
{
	if (isMockContext(parameter))
	{
		return parameter;
	}

	let context: ExecutionContext | undefined = undefined;
	let mock_response: MockResponseInterface | undefined = undefined;

	if (parameter instanceof ExecutionContext)
	{
		context = parameter;
		mock_response = mockResponse(parameter.getResponse());
	}
	else
	{
		mock_response = mockResponse(parameter);

		context = new ExecutionContext({
			request: mock_response.request.instance,
			response: mock_response.instance,
		});

		Reflect.set(context, "uuid", "00000000-0000-0000-0000-000000000000");
	}

	const MOCK: MockContextInterface = baseMock({
		instance: context,
		socket: mock_response.socket,
		request: mock_response.request,
		response: mock_response,
		stubs: {
			getRequest: stub(context, "getRequest"),
			getResponse: stub(context, "getResponse"),
			getUUID: stub(context, "getUUID"),
			findContextualItem: stub(context, "findContextualItem"),
			getContextualItem: stub(context, "getContextualItem"),
			setContextualItem: stub(context, "setContextualItem"),
			removeContextualItem: stub(context, "removeContextualItem"),
			clearContextualItems: stub(context, "clearContextualItems"),
		},
	});

	MOCK.callThroughAllStubs();

	return MOCK;
}

export { mockContext };
