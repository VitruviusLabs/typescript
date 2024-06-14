import { HTTPMethodEnum, type SignatureInstantiationInterface } from "../../../src/_index.mjs";

function mockSignatureInstantiationInterface(): SignatureInstantiationInterface
{
	const mocked_access_key_id: string = "mocked_access_key_id";
	const mocked_access_secret: string = "mocked_access_secret";
	const mocked_region: string = "mocked_region";
	const mocked_service: string = "s3";
	const mocked_url: string = "https://www.example.com/";
	const mocked_method: HTTPMethodEnum = HTTPMethodEnum.POST;
	const mocked_host: string = "www.example.com";
	const mocked_body: string = JSON.stringify({ foo: "bar" });
	const mocked_headers: Headers = new Headers({
		Host: mocked_host,
	});

	return {
		accessKeyId: mocked_access_key_id,
		accessSecret: mocked_access_secret,
		region: mocked_region,
		service: mocked_service,
		method: mocked_method,
		headers: mocked_headers,
		url: mocked_url,
		body: mocked_body,
	};
}

export { mockSignatureInstantiationInterface };
