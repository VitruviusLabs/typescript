import type { AWSErrorInstantiationInterface } from "./definition/interface/aws-error-instantiation.interface.mjs";

class AWSError extends Error
{
	private readonly awsType: string;
	private readonly awsCode: string;
	private readonly awsMessage: string;

	public constructor(parameters: AWSErrorInstantiationInterface)
	{
		super(`[${parameters.type}] ${parameters.message} (${parameters.code})`);

		this.awsType = parameters.type;
		this.awsCode = parameters.code;
		this.awsMessage = parameters.message;
	}

	public getMessage(): string
	{
		return this.message;
	}

	public getAWSType(): string
	{
		return this.awsType;
	}

	public getAWSCode(): string
	{
		return this.awsCode;
	}

	public getAWSMessage(): string
	{
		return this.awsMessage;
	}
}

export { AWSError };
