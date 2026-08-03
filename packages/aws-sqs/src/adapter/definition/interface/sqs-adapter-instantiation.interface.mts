interface SQSAdapterInstantiationInterface
{
	accessKeyId: string;
	accessSecret: string;
	sessionToken?: string;
	region: string;
	host: string;
	accountId: string;
	https: boolean;
}

export type { SQSAdapterInstantiationInterface };
