import { type Hash, createHash } from "node:crypto";

import type { SQSServiceInstantiationInterface } from "../definition/interface/sqs-service-instantiation.interface.mjs";
import { HTTPMethodEnum, Signature } from "@vitruvius-labs/aws-signature-v4";
import { ResponseEnvelope } from "../entity/response-envelope.mjs";
import { assertResponseEnvelope } from "../predicate/assert-response-envelope.mjs";

class SQSService
{
	private readonly accessKeyId: string;
	private readonly accessSecret: string;
	private readonly region: string;
	private readonly host: string;
	private readonly accountId: string;
	private readonly https: boolean;
	private readonly protocol: "http" | "https";

	public constructor(parameters: SQSServiceInstantiationInterface)
	{
		this.accessKeyId = parameters.accessKeyId;
		this.accessSecret = parameters.accessSecret;
		this.region = parameters.region;
		this.host = parameters.host;
		this.accountId = parameters.accountId;
		this.https = parameters.https;
		this.protocol = this.https ? "https" : "http";
	}

	public async receiveMessage(queueName: string): Promise<ResponseEnvelope>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const headers: Record<string, string> = {
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
			"Host": this.host,
		};

		parameters.append("Action", "ReceiveMessage");

		const address: string = `${this.protocol}://${this.host}/${this.accountId}/${queueName}`;

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "sqs",
			url: address,
			method: HTTPMethodEnum.POST,
			headers: headers,
			body: parameters.toString(),
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.POST,
			body: parameters,
			headers: finalHeaders,
			keepalive: true,
		});

		const responseText: string = await response.text();
		const responseJSON: unknown = JSON.parse(responseText);

		assertResponseEnvelope(responseJSON);

		const envelope: ResponseEnvelope = new ResponseEnvelope(responseJSON);

		return envelope;
	}

	public async sendMessage(queueName: string, message: string): Promise<unknown>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const hash: Hash = createHash("sha256");

		hash.update(message);

		// const messageDigest: string = hash.digest("hex");

		parameters.append("Action", "SendMessage");
		parameters.append("MessageBody", message);
		// parameters.append("MessageGroupId", randomUUID());
		// parameters.append("MessageDeduplicationId", messageDigest);

		const headers: Record<string, string> = {
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
			"Host": this.host,
		};

		const address: string = `${this.protocol}://${this.host}/${this.accountId}/${queueName}`;

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "sqs",
			url: address,
			method: HTTPMethodEnum.POST,
			headers: headers,
			body: parameters.toString(),
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.POST,
			body: parameters,
			headers: finalHeaders,
			keepalive: true,
		});

		const responseText: string = await response.text();
		const responseJson: unknown = JSON.parse(responseText);

		return responseJson;
	}

	public async acknowledgeMessage(queueName: string, receiptHandle: string): Promise<unknown>
	{
		const parameters: URLSearchParams = new URLSearchParams();

		const headers: Record<string, string> = {
			Accept: "application/json",
			ContentType: "application/x-www-form-urlencoded",
			Host: this.host,
		};

		parameters.append("Action", "DeleteMessage");
		parameters.append("ReceiptHandle", receiptHandle);

		const address: string = `${this.protocol}://${this.host}/${this.accountId}/${queueName}`;

		const signature: Signature = new Signature({
			accessKeyId: this.accessKeyId,
			accessSecret: this.accessSecret,
			region: this.region,
			service: "sqs",
			url: address,
			method: HTTPMethodEnum.POST,
			headers: headers,
			body: parameters.toString(),
		});

		signature.generate();

		const finalHeaders: Headers = signature.getComputedHeaders();

		finalHeaders.append("Authorization", signature.getAuthorizationHeader());

		const response: Response = await fetch(address, {
			method: HTTPMethodEnum.POST,
			body: parameters,
			headers: finalHeaders,
			keepalive: true,
		});

		const responseText: string = await response.text();
		const responseJson: unknown = JSON.parse(responseText);

		return responseJson;
	}
}

export { SQSService };
