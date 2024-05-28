import { ExecutionContext, type RichClientRequest, type RichServerResponse } from "../../../src/_index.mjs";
import { mockRequest } from "./mock-request.mjs";
import { mockResponse } from "./mock-response.mjs";

function mockContext(request?: RichClientRequest, response?: RichServerResponse): ExecutionContext
{
	const CONTEXT: ExecutionContext = new ExecutionContext({
		request: request ?? mockRequest(),
		response: response ?? mockResponse(),
	});

	return CONTEXT;
}

export { mockContext };
