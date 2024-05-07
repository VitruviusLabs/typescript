import type { S3CompletedPartInterface } from "./s3-completed-part.interface.mjs";
import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3CompleteMultipartUploadRequestInterface extends S3RequestInterface
{
	uploadId: string;
	parts: Array<S3CompletedPartInterface>;
}

export type { S3CompleteMultipartUploadRequestInterface };
