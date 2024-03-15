import type { Blob as NodeBlob } from "node:buffer";
// eslint-disable-next-line no-duplicate-imports
import { Buffer as NodeBuffer } from "node:buffer";

import type { SignatureInterface } from "./definitions/interfaces/signature.interface.mjs";
import { Signature } from "./signature.mjs";
import { HTTPMethodEnum } from "./definitions/enums/http-method.enum.mjs";
import type { S3RequestInterface } from "./s3-request.interface.mjs";

abstract class S3Service
{
	private static Initialised: boolean = false;
	private static accessKeyId: string;
	private static secretAccessKey: string;
	private static region: string;
	private static host: string;
	private static protocol: "http" | "https";

	public static Initialise(): void
	{
		if (S3Service.Initialised)
		{
			return;
		}

		S3Service.accessKeyId = "";
		S3Service.secretAccessKey = "";
		S3Service.region = "eu-west-1";
		S3Service.host = "s3.eu-west-1.amazonaws.com";
		S3Service.protocol = "https";

		S3Service.Initialised = true;
	}

	public static async GetObject(request: S3RequestInterface): Promise<NodeBuffer>
	{
		S3Service.Initialise();

		// console.debug(`${this.protocol}://${request.bucket}.${this.host}/${request.key}`);

		const address: string = `${this.protocol}://${request.bucket}.${this.host}/${request.key}`;

		const signatureV4: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.secretAccessKey,
			service: "s3",
			region: this.region,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			url: address,
			method: HTTPMethodEnum.GET,
			body: "",
		});

		const signature: SignatureInterface = signatureV4.generate();

		const headers: Headers = signature.headers;

		headers.append("Authorization", signature.authorizationHeader);

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.GET,
			headers: {
				...Object.fromEntries(headers.entries()),
				authorization: signature.authorizationHeader,
			},
			keepalive: true,
		});

		console.debug(signatureV4.getPresignedURL(86400));

		console.debug("=====================================");
		console.debug("=====================================");
		console.debug("=====================================");
		console.debug(signatureV4.getStringToSign());
		console.debug("=====================================");
		console.debug("=====================================");
		console.debug("=====================================");
		console.debug(signatureV4.getCanonicalRequest());
		console.debug("=====================================");
		console.debug("=====================================");
		console.debug("=====================================");

		const responseBlob: NodeBlob = await response.blob();
		const responseArrayBuffer: ArrayBuffer = await responseBlob.arrayBuffer();
		const content: NodeBuffer = NodeBuffer.from(responseArrayBuffer);

		return content;
	}
}

export { S3Service };
