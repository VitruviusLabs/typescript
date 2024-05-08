import type { ResponseMetadataInterface } from "../definition/interface/response-metadata.interface.mjs";

class ResponseMetadata
{
	private readonly requestId: string;

	public constructor(value: ResponseMetadataInterface)
	{
		this.requestId = value.RequestId;
	}

	public getRequestId(): string
	{
		return this.requestId;
	}
}

export { ResponseMetadata };
