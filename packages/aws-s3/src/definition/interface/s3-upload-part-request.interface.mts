import type { Buffer as NodeBuffer } from "node:buffer";

import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3UploadPartRequestInterface extends S3RequestInterface
{
	part: NodeBuffer | string;
	partNumber: number;
	uploadId: string;
}

export type { S3UploadPartRequestInterface };
