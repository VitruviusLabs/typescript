import type { Buffer as NodeBuffer } from "node:buffer";
import type { HTTPMethodEnum } from "../enum/http-method.enum.mjs";

interface SignatureInstantiationInterface
{
	accessKeyId: string;
	accessSecret: string;
	region: string;
	service: string;
	method: HTTPMethodEnum;
	headers: Array<Array<string>> | Headers | Record<string, string>;
	url: string;
	body: NodeBuffer | string;
}

export type { SignatureInstantiationInterface };

