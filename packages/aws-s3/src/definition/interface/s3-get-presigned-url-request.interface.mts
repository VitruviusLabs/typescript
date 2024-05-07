import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3GetPresignedUrlRequestInterface extends S3RequestInterface
{
	expires: number;
}

export type { S3GetPresignedUrlRequestInterface };
