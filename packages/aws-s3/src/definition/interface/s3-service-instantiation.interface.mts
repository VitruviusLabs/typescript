interface S3ServiceInstantiationInterface
{
	accessKeyId: string;
	accessSecret: string;
	region: string;
	host: string;
	https: boolean;
	localStack?: boolean;
}

export type { S3ServiceInstantiationInterface };
