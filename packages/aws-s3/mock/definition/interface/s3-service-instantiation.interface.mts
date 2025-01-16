import type { S3ServiceInstantiationInterface } from "../../../src/_index.mjs";

function mockS3ServiceInstantiationInterface(): S3ServiceInstantiationInterface
{
	const mocked_access_key_id: string = "mocked_access_key_id";
	const mocked_access_secret: string = "mocked_access_secret";
	const mocked_region: string = "mocked_region";
	const mocked_host: string = "www.example.com";

	return {
		accessKeyId: mocked_access_key_id,
		accessSecret: mocked_access_secret,
		region: mocked_region,
		host: mocked_host,
		https: true,
		localStack: false,
	};
}

export { mockS3ServiceInstantiationInterface };
