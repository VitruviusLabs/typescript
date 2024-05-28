import { type RichClientRequest, RichServerResponse } from "../../../src/_index.mjs";
import { mockRequest } from "./mock-request.mjs";

function mockResponse(request?: RichClientRequest): RichServerResponse
{
	const RESPONSE: RichServerResponse = new RichServerResponse(request ?? mockRequest());

	return RESPONSE;
}

export { mockResponse };
