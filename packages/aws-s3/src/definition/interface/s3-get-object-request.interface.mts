import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3GetObjectRequestInterface extends S3RequestInterface
{
	range?: string;
}

export type { S3GetObjectRequestInterface };
