import type { MockSocketInterface } from "./definition/interface/mock-socket.interface.mjs";
import type { MockRequestInterface } from "./definition/interface/mock-request.interface.mjs";
import type { Socket, SocketConstructorOpts } from "node:net";
import { stub } from "sinon";
import { baseMock } from "../../mock-utility/base-mock.mjs";
import { mockSocket } from "./mock-socket.mjs";
import { isMockRequest } from "./predicate/is-mock-request.mjs";
import { RichClientRequest } from "../../../src/_index.mjs";

/**
 * Create a mock request.
 *
 * @remarks
 * Whatever the parameter is, the function will return a mock request.
 * Steps will be skipped according to the type of the parameter.
 */
function mockRequest(
	parameter?:
		| MockRequestInterface
		| MockSocketInterface
		| RichClientRequest
		| Socket
		| SocketConstructorOpts
): MockRequestInterface
{
	if (isMockRequest(parameter))
	{
		return parameter;
	}

	let mock_socket: MockSocketInterface | undefined = undefined;
	let request: RichClientRequest | undefined = undefined;

	if (parameter instanceof RichClientRequest)
	{
		mock_socket = mockSocket(parameter.socket);
		request = parameter;
	}
	else
	{
		mock_socket = mockSocket(parameter);
		request = new RichClientRequest(mock_socket.instance);

		/* Default IncomingMessage properties */
		request.httpVersion = "1.1";
		request.httpVersionMajor = 1;
		request.httpVersionMinor = 1;
		request.method = "GET";
		request.url = "/";
		request.headers = {};
		request.headersDistinct = {};
		request.rawHeaders = [];
		request.complete = true;
		request.trailers = {};
		request.trailersDistinct = {};
		request.rawTrailers = [];
	}

	const MOCK: MockRequestInterface = baseMock({
		instance: request,
		socket: mock_socket,
		stubs: {
			// @ts-expect-error: Mock private method
			listenForContent: stub(request, "listenForContent"),
			initialize: stub(request, "initialize"),
			getUnsafeMethod: stub(request, "getUnsafeMethod"),
			hasStandardMethod: stub(request, "hasStandardMethod"),
			getMethod: stub(request, "getMethod"),
			getUnsafeURL: stub(request, "getUnsafeURL"),
			hasURL: stub(request, "hasURL"),
			getURL: stub(request, "getURL"),
			getUnsafePath: stub(request, "getUnsafePath"),
			hasPath: stub(request, "hasPath"),
			getPath: stub(request, "getPath"),
			getPathFragments: stub(request, "getPathFragments"),
			getPathVariable: stub(request, "getPathVariable"),
			getPathVariables: stub(request, "getPathVariables"),
			getQuery: stub(request, "getQuery"),
			hasQueryItem: stub(request, "hasQueryItem"),
			getQueryItemAll: stub(request, "getQueryItemAll"),
			getQueryItem: stub(request, "getQueryItem"),
			getRawHeaders: stub(request, "getRawHeaders"),
			getHeaders: stub(request, "getHeaders"),
			hasHeader: stub(request, "hasHeader"),
			getRawHeader: stub(request, "getRawHeader"),
			getHeader: stub(request, "getHeader"),
			getCookies: stub(request, "getCookies"),
			hasCookie: stub(request, "hasCookie"),
			getCookie: stub(request, "getCookie"),
			getBoundary: stub(request, "getBoundary"),
			getContentType: stub(request, "getContentType"),
			getRawBody: stub(request, "getRawBody"),
			getBodyAsString: stub(request, "getBodyAsString"),
			getBodyAsJSON: stub(request, "getBodyAsJSON"),
		},
	});

	MOCK.callThroughAllStubs();

	return MOCK;
}

export { mockRequest };
