import type { Buffer as NodeBuffer } from "node:buffer";
import type { HTTPMethodEnum } from "../enums/http-method.enum.mjs";

interface SignatureGenerationInterface
{
  method: HTTPMethodEnum;
  headers: Record<string, string>;
  body: NodeBuffer | string;
  service: "s3" | "ses" | "sns" | "sqs";
  region: string;
  requestParameters: string;
  accessKey: string;
  secretKey: string;
  canonicalUri: string;
}

export type { SignatureGenerationInterface };
