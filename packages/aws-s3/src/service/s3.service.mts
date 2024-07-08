import type { S3ServiceInstantiationInterface } from "../definition/interface/s3-service-instantiation.interface.mjs";
import type { S3RequestInterface } from "../definition/interface/s3-request.interface.mjs";
import type { S3PutObjectRequestInterface } from "../definition/interface/s3-put-object-request.interface.mjs";
import type { S3UploadPartRequestInterface } from "../definition/interface/s3-upload-part-request.interface.mjs";
import type { S3CompleteMultipartUploadRequestInterface } from "../definition/interface/s3-complete-multipart-upload-request.interface.mjs";
import type { S3AbortMultipartUploadRequestInterface } from "../definition/interface/s3-abort-multipart-upload-request.interface.mjs";
import type { S3GetPresignedUrlRequestInterface } from "../definition/interface/s3-get-presigned-url-request.interface.mjs";
import { type Blob as NodeBlob, Buffer as NodeBuffer } from "node:buffer";
import { HTTPMethodEnum, Signature } from "@vitruvius-labs/aws-signature-v4";
import { HTTPStatusCodeEnum } from "../definition/enum/http-status-code.enum.mjs";
import type { S3ComputeAddressInterface } from "../definition/interface/s3-compute-address.interface.mjs";

class S3Service
{
	private readonly accessKeyId: string;
	private readonly accessSecret: string;
	private readonly region: string;
	private readonly host: string;
	private readonly https: boolean;
	private readonly protocol: "http" | "https";
	private readonly localStack: boolean = false;

	public constructor(instantiationInterface: S3ServiceInstantiationInterface)
	{
		this.accessKeyId = instantiationInterface.accessKeyId;
		this.accessSecret = instantiationInterface.accessSecret;
		this.region = instantiationInterface.region;
		this.host = instantiationInterface.host;
		this.https = instantiationInterface.https;
		this.protocol = this.https ? "https" : "http";

		if (instantiationInterface.localStack !== undefined)
		{
			this.localStack = instantiationInterface.localStack;
		}
	}

	public async getObject(request: S3RequestInterface): Promise<NodeBuffer>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.GET,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: "",
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.GET,
			headers: finalHeaders,
			keepalive: true,
		});

		const responseBlob: NodeBlob = await response.blob();
		const responseArrayBuffer: ArrayBuffer = await responseBlob.arrayBuffer();
		const content: NodeBuffer = NodeBuffer.from(responseArrayBuffer);

		return content;
	}

	public async putObject(request: S3PutObjectRequestInterface): Promise<void>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.PUT,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: request.body,
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.PUT,
			headers: finalHeaders,
			body: request.body,
			keepalive: true,
		});

		const responseText: string = await response.text();

		if (responseText !== "")
		{
			throw new Error(responseText);
		}
	}

	public getPresignedUrlForObject(request: S3GetPresignedUrlRequestInterface): string
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.GET,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: "",
		});

		const url: string = signature.getPresignedURL(request.expires);

		return url;
	}

	public async createMultipartUpload(request: S3RequestInterface): Promise<string>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		parameters.append("uploads", "");

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.POST,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: parameters.toString(),
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.POST,
			headers: finalHeaders,
			keepalive: true,
		});

		const responseText: string = await response.text();

		if (response.status !== HTTPStatusCodeEnum.OK)
		{
			throw new Error("Unable to create multipart upload.");
		}

		const uploadIdMatches: RegExpMatchArray | null = /<UploadId>(?<uploadId>[^<]+)<\/UploadId>/.exec(responseText);

		if (uploadIdMatches?.groups?.["uploadId"] === undefined)
		{
			throw new Error("Unable to retrieve upload ID.");
		}

		return uploadIdMatches.groups["uploadId"];
	}

	public async uploadPart(request: S3UploadPartRequestInterface): Promise<string>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		parameters.append("partNumber", request.partNumber.toString());
		parameters.append("uploadId", request.uploadId);

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.PUT,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: request.part,
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.PUT,
			headers: finalHeaders,
			body: request.part,
			keepalive: true,
		});

		if (response.status !== HTTPStatusCodeEnum.OK)
		{
			throw new Error("Unable to upload part.");
		}

		const responseHeaders: Headers = response.headers;
		const eTagHeader: string | null = responseHeaders.get("ETag");

		if (eTagHeader === null)
		{
			throw new Error("Unable to retrieve ETag.");
		}

		return eTagHeader;
	}

	public async completeMultipartUpload(request: S3CompleteMultipartUploadRequestInterface): Promise<void>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		parameters.append("uploadId", request.uploadId);

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const bodyHeader: string = '<CompleteMultipartUpload xmlns="http://s3.amazonaws.com/doc/2006-03-01/">';
		const bodyFooter: string = "</CompleteMultipartUpload>";
		const bodyParts: Array<string> = [];

		for (const part of request.parts)
		{
			const partNumber: string = `<PartNumber>${part.number.toString()}</PartNumber>`;
			const etag: string = `<ETag>${part.eTag}</ETag>`;

			bodyParts.push(`<Part>${partNumber}${etag}</Part>`);
		}

		const joinedParts: string = bodyParts.join("");
		const body: string = `${bodyHeader}${joinedParts}${bodyFooter}`;

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.POST,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: body,
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.POST,
			headers: finalHeaders,
			body: body,
			keepalive: true,
		});

		if (response.status !== HTTPStatusCodeEnum.OK)
		{
			throw new Error("Unable to complete multipart upload.");
		}
	}

	public async abortMultipartUpload(request: S3AbortMultipartUploadRequestInterface): Promise<void>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		parameters.append("uploadId", request.uploadId);

		const address: string = this.computeAddress({
			protocol: this.protocol,
			host: this.host,
			bucket: request.bucket,
			key: request.key,
			parameters: parameters,
		});

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "s3",
			url: address,
			method: HTTPMethodEnum.DELETE,
			headers: {
				Host: `${request.bucket}.${this.host}`,
			},
			body: "",
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.DELETE,
			headers: finalHeaders,
			keepalive: true,
		});

		if (response.status !== HTTPStatusCodeEnum.NO_CONTENT)
		{
			throw new Error("Unable to abort multipart upload.");
		}
	}

	private computeAddress(parameters: S3ComputeAddressInterface): string
	{
		if (this.localStack)
		{
			return `${this.protocol}://${this.host}/${parameters.bucket}/${parameters.key}?${parameters.parameters.toString()}`.replace(/\?$/, "");
		}

		return `${this.protocol}://${parameters.bucket}.${this.host}/${parameters.key}?${parameters.parameters.toString()}`.replace(/\?$/, "");
	}
}

export { S3Service };
