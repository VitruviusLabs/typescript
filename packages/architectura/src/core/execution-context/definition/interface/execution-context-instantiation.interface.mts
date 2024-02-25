import type { RichClientRequest } from "../../../server/rich-client-request.mjs";

import type { RichServerResponse } from "../../../server/rich-server-response.mjs";

interface ExecutionContextInstantiationInterface
{
	request: RichClientRequest;
	response: RichServerResponse;
}

export type { ExecutionContextInstantiationInterface };
