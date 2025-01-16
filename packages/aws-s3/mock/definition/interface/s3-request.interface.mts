import type { S3RequestInterface } from "../../../src/definition/interface/s3-request.interface.mjs";

function mockDefaultS3RequestInterface(): S3RequestInterface
{
	return {
		bucket: "mocked_bucket",
		key: "mocked_key.json",
	};
}

export { mockDefaultS3RequestInterface };
