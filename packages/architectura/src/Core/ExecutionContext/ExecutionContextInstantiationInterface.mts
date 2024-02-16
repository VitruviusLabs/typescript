import type { RichClientRequest } from "../RichClientRequest.mjs";

import type { RichServerResponse } from "../RichServerResponse.mjs";

interface ExecutionContextInstantiationInterface
{
	request: RichClientRequest;
	response: RichServerResponse;
}

export type { ExecutionContextInstantiationInterface };
