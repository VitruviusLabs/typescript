import type { MockResponseInterface } from "./definition/interface/mock-response.interface.mjs";
import type { MockRequestInterface } from "./definition/interface/mock-request.interface.mjs";
import type { MockSocketInterface } from "./definition/interface/mock-socket.interface.mjs";
import type { Socket, SocketConstructorOpts } from "node:net";
import { stub } from "sinon";
import { mockRequest } from "./mock-request.mjs";
import { isMockResponse } from "./predicate/is-mock-response.mjs";
import { baseMock } from "./base-mock.mjs";
import { type RichClientRequest, RichServerResponse } from "../src/_index.mjs";

/**
 * Create a mock response.
 *
 * @remarks
 * Whatever the parameter is, the function will return a mock response.
 * Steps will be skipped according to the type of the parameter.
 */
function mockResponse(
	parameter?:
		| MockRequestInterface
		| MockResponseInterface
		| MockSocketInterface
		| RichClientRequest
		| RichServerResponse
		| Socket
		| SocketConstructorOpts
): MockResponseInterface
{
	if (isMockResponse(parameter))
	{
		return parameter;
	}

	let mock_request: MockRequestInterface | undefined = undefined;
	let response: RichServerResponse | undefined = undefined;

	if (parameter instanceof RichServerResponse)
	{
		mock_request = mockRequest(parameter.req);
		response = parameter;
	}
	else
	{
		mock_request = mockRequest(parameter);
		response = new RichServerResponse(mock_request.instance);
	}

	const MOCK: MockResponseInterface = baseMock({
		instance: response,
		socket: mock_request.socket,
		request: mock_request,
		stubs: {
			json: stub(response, "json"),
			text: stub(response, "text"),
			replyWith: stub(response, "replyWith"),
			isLocked: stub(response, "isLocked"),
			isProcessed: stub(response, "isProcessed"),
			hasContent: stub(response, "hasContent"),
			getUnsafeContent: stub(response, "getUnsafeContent"),
			getRawContent: stub(response, "getRawContent"),
			getContent: stub(response, "getContent"),
			setContent: stub(response, "setContent"),
			getStatusCode: stub(response, "getStatusCode"),
			setStatusCode: stub(response, "setStatusCode"),
			getHeaderRaw: stub(response, "getHeaderRaw"),
			getHeaderAll: stub(response, "getHeaderAll"),
			getHeader: stub(response, "getHeader"),
			setCookie: stub(response, "setCookie"),
			write: stub(response, "write"),
			end: stub(response, "end"),
		},
	});

	MOCK.callThroughAllStubs();

	return MOCK;
}

export { mockResponse };
