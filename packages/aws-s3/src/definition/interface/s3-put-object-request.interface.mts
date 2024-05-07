import type { Buffer as NodeBuffer } from "node:buffer";

import type { S3RequestInterface } from "./s3-request.interface.mjs";

interface S3PutObjectRequestInterface extends S3RequestInterface
{
  body: NodeBuffer | string;
}

export type { S3PutObjectRequestInterface };
