import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3AbortMultipartUploadRequestInterface extends S3RequestInterface
{
	uploadId: string;
}

export type { S3AbortMultipartUploadRequestInterface };
