import { createHash, createHmac } from "node:crypto";
import type { Buffer as NodeBuffer } from "node:buffer";

import { SignatureEnum } from "./definitions/enums/signature.enum.mjs";
import type { SignatureInterface } from "./definitions/interfaces/signature.interface.mjs";
import { HTTPMethodEnum } from "./definitions/enums/http-method.enum.mjs";
import type { SignatureInstantiationInterface } from "./definitions/interfaces/signature-instantiation.interface.mjs";

class Signature
{
	private readonly algorithm: string = "AWS4-HMAC-SHA256";

	private readonly accessKeyId: string;
	private readonly accessSecret: string;
	private readonly region: string;
	private readonly service: string;
	private readonly url: URL;

	private method: HTTPMethodEnum;
	private headers: Headers;
	private body: NodeBuffer | string;

	private bodyHash: string = "";
	private amzShortDate: string = "";
	private amzFullDate: string = "";
	private computedHeaders: Headers = new Headers();
	private canonicalHeadersString: string = "";
	private signedHeadersString: string = "";
	private canonicalQueryString: string = "";
	private canonicalRequest: string = "";
	private signingKey: Buffer = Buffer.from("");
	private credentialScope: string = "";
	private stringToSign: string = "";
	private signature: string = "";
	private authorizationHeader: string = "";

	public constructor(input: SignatureInstantiationInterface)
	{
		this.accessKeyId = input.accessKeyId;
		this.accessSecret = input.accessSecret;
		this.region = input.region;
		this.service = input.service;
		this.method = input.method;
		this.headers = new Headers(input.headers);
		this.url = new URL(input.url);
		this.body = input.body;
	}

	public getRegion(): string
	{
		return this.region;
	}

	public getService(): string
	{
		return this.service;
	}

	public getMethod(): HTTPMethodEnum
	{
		return this.method;
	}

	public getHeaders(): Headers
	{
		return this.headers;
	}

	public getURL(): URL
	{
		return this.url;
	}

	public getBody(): NodeBuffer | string
	{
		return this.body;
	}

	public getCanonicalUri(): string
	{
		return this.url.pathname;
	}

	public getQuery(): URLSearchParams
	{
		return this.url.searchParams;
	}

	public getBodyHash(): string
	{
		return this.bodyHash;
	}

	public getAmzShortDate(): string
	{
		return this.amzShortDate;
	}

	public getAmzFullDate(): string
	{
		return this.amzFullDate;
	}

	public getComputedHeaders(): Headers
	{
		return this.computedHeaders;
	}

	public getCanonicalHeadersString(): string
	{
		return this.canonicalHeadersString;
	}

	public getSignedHeadersString(): string
	{
		return this.signedHeadersString;
	}

	public getCanonicalQueryString(): string
	{
		return this.canonicalQueryString;
	}

	public getCanonicalRequest(): string
	{
		return this.canonicalRequest;
	}

	public getSigningKey(): Buffer
	{
		return this.signingKey;
	}

	public getCredentialScope(): string
	{
		return this.credentialScope;
	}

	public getStringToSign(): string
	{
		return this.stringToSign;
	}

	public getSignature(): string
	{
		return this.signature;
	}

	public getAuthorizationHeader(): string
	{
		return this.authorizationHeader;
	}

	public generate(): SignatureInterface
	{
		this.generateBodyHash();
		this.generateAMZDate();
		this.generateComputedHeaders();
		this.generateSignedHeaders();
		this.generateCanonicalQueryString();
		this.generateCanonicalRequest();
		this.generateCredentialScope();
		this.generateStringToSign();
		this.getSignatureKey();
		this.generateSignature();
		this.generateAuthorizationHeader();

		return {
			signature: this.signature,
			authorizationHeader: this.authorizationHeader,
			xAmzContentSha256: this.bodyHash,
			xAmzDate: this.amzFullDate,
			headers: this.computedHeaders,
		};
	}

	public getPresignedURL(expires: number): string
	{
		// const signature: SignatureInterface = this.generate();

		this.method = HTTPMethodEnum.GET;
		this.body = "";
		this.headers = new Headers();
		this.headers.append("host", this.url.host);

		this.generateBodyHash();
		this.generateAMZDate();
		this.generateComputedHeaders();
		this.generateSignedHeaders();

		this.url.searchParams.append("X-Amz-Algorithm", this.algorithm);
		this.url.searchParams.append("X-Amz-Credential", `${this.accessKeyId}/${this.credentialScope}`);
		this.url.searchParams.append("X-Amz-Date", this.amzFullDate);
		this.url.searchParams.append("X-Amz-Expires", expires.toString());
		this.url.searchParams.append("X-Amz-SignedHeaders", this.signedHeadersString);

		this.generateCanonicalQueryString();
		this.generateCanonicalRequestForPresigned();
		this.generateCredentialScope();
		this.generateStringToSign();
		this.getSignatureKey();
		this.generateSignature();
		this.generateAuthorizationHeader();

		const presignedURL: URL = new URL(this.url);

		presignedURL.searchParams.append("X-Amz-Signature", this.signature);

		return presignedURL.toString();
	}

	private generateBodyHash(): void
	{
		this.bodyHash = createHash("sha256").update(this.body)
			.digest("hex");
	}

	private generateAMZDate(): void
	{
		const amzDate: Date = new Date();

		const year: string = amzDate.getUTCFullYear().toString();
		const month: string = (amzDate.getUTCMonth() + 1).toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
		const day: string = amzDate.getUTCDate().toString()
			.padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
		const hours: string = amzDate.getUTCHours().toString()
			.padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
		const minutes: string = amzDate.getUTCMinutes().toString()
			.padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
		const seconds: string = amzDate.getUTCSeconds().toString()
			.padStart(SignatureEnum.TIME_PAD_LENGTH, "0");

		const shortDate: string = `${year}${month}${day}`;
		const fullDate: string = `${shortDate}T${hours}${minutes}${seconds}Z`;

		this.amzShortDate = shortDate;
		this.amzFullDate = fullDate;
	}

	private generateComputedHeaders(): void
	{
		this.computedHeaders = new Headers(this.headers);
		this.computedHeaders.append("x-amz-content-sha256", this.bodyHash);
		this.computedHeaders.append("x-amz-date", this.amzFullDate);
	}

	private generateSignedHeaders(): void
	{
		const canonicalHeaders: Array<string> = [];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
		// const headersKeys: Array<string> = Array.from(this.computedHeaders.keys());

		const headerNames: Array<string> = [];

		for (const [name, value] of this.computedHeaders.entries())
		{
			canonicalHeaders.push(`${name}:${value}`);
			headerNames.push(name);
		}

		const canonicalHeadersString: string = canonicalHeaders.join("\n");
		const signedHeaders: string = headerNames.join(";");

		this.canonicalHeadersString = canonicalHeadersString;
		this.signedHeadersString = signedHeaders;
	}

	private generateCanonicalQueryString(): void
	{
		this.url.searchParams.sort();

		this.canonicalQueryString = this.url.searchParams.toString();
	}

	private generateCanonicalRequest(): void
	{
		const canonicalRequest: Array<string> = [
			this.method,
			this.getCanonicalUri(),
			this.canonicalQueryString,
			this.canonicalHeadersString,
			"",
			this.signedHeadersString,
			this.bodyHash,
		];

		this.canonicalRequest = canonicalRequest.join("\n");
	}

	private generateCanonicalRequestForPresigned(): void
	{
		const canonicalRequest: Array<string> = [
			this.method,
			this.getCanonicalUri(),
			this.canonicalQueryString,
			this.canonicalHeadersString,
			"",
			this.signedHeadersString,
			"UNSIGNED-PAYLOAD",
		];

		this.canonicalRequest = canonicalRequest.join("\n");
	}

	private generateCredentialScope(): void
	{
		this.credentialScope = `${this.amzShortDate}/${this.region}/${this.service}/aws4_request`;
	}

	private generateStringToSign(): void
	{
		const elementsToSign: Array<string> = [
			this.algorithm,
			this.amzFullDate,
			this.credentialScope,
			createHash("sha256").update(this.canonicalRequest)
				.digest("hex"),
		];

		this.stringToSign = elementsToSign.join("\n");
	}

	private getSignatureKey(): void
	{
		const dateBuffer: Buffer = createHmac("sha256", `AWS4${this.accessSecret}`).update(this.amzShortDate)
			.digest();
		const regionBuffer: Buffer = createHmac("sha256", dateBuffer).update(this.region)
			.digest();
		const serviceBuffer: Buffer = createHmac("sha256", regionBuffer).update(this.service)
			.digest();
		const signingBuffer: Buffer = createHmac("sha256", serviceBuffer).update("aws4_request")
			.digest();

		this.signingKey = signingBuffer;
	}

	private generateSignature(): void
	{
		this.signature = createHmac("sha256", this.signingKey).update(this.stringToSign)
			.digest("hex");
	}

	private generateAuthorizationHeader(): void
	{
		this.authorizationHeader = [
			this.algorithm,
			`Credential=${this.accessKeyId}/${this.credentialScope},`,
			`SignedHeaders=${this.signedHeadersString},`,
			`Signature=${this.signature}`,
		].join(" ");
	}
}

export { Signature };
