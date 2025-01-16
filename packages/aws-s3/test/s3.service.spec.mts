import { after, beforeEach, describe, it } from "mocha";
// import { Buffer as NodeBuffer } from "node:buffer";
import { use as chaiUse, expect } from "chai";
import { type SinonFakeTimers, type SinonSpy, type SinonStub, spy, stub, useFakeTimers } from "sinon";
import { S3Service, type S3ServiceInstantiationInterface } from "../src/_index.mjs";
import { mockS3ServiceInstantiationInterface } from "../mock/definition/interface/s3-service-instantiation.interface.mjs";
import { Signature } from "@vitruvius-labs/aws-signature-v4";

import { default as chaiAsPromised } from "chai-as-promised";
import type { S3RequestInterface } from "../src/definition/interface/s3-request.interface.mjs";
import { mockDefaultS3RequestInterface } from "../mock/definition/interface/s3-request.interface.mjs";

chaiUse(chaiAsPromised);

describe("S3Service", (): void => {
	const stubbedS3Service: { computeAddress: SinonStub } = {
		// @ts-expect-error - We need to access this private method for testing purposes.
		computeAddress: stub(S3Service.prototype, "computeAddress"),
	};

	const stubbedSignature: { getComputedHeaders: SinonStub; getAuthorizationHeader: SinonStub } = {
		getComputedHeaders: stub(Signature.prototype, "getComputedHeaders"),
		getAuthorizationHeader: stub(Signature.prototype, "getAuthorizationHeader"),
	};

	const spiedSignature: { generate: SinonSpy } = {
		generate: spy(Signature.prototype, "generate"),
	};

	const stubbedFetch: SinonStub = stub(globalThis, "fetch");

	const clock: SinonFakeTimers = useFakeTimers();

	clock.now = new Date("2024-01-01").getTime();

	beforeEach((): void => {
		stubbedS3Service.computeAddress.reset();
		stubbedS3Service.computeAddress.callThrough();

		stubbedSignature.getAuthorizationHeader.reset();
		stubbedSignature.getComputedHeaders.reset();

		spiedSignature.generate.resetHistory();

		stubbedFetch.reset();

		clock.reset();
	});

	after((): void => {
		stubbedS3Service.computeAddress.restore();

		stubbedSignature.getAuthorizationHeader.restore();
		stubbedSignature.getComputedHeaders.restore();

		spiedSignature.generate.restore();

		stubbedFetch.restore();

		clock.restore();
	});

	describe("constructor", (): void => {
		it("should return a properly initialised S3Service instance when called with the appropriate interface", (): void => {
			const mocked_instantiation_interface: S3ServiceInstantiationInterface = mockS3ServiceInstantiationInterface();

			const s3service: S3Service = new S3Service(mocked_instantiation_interface);

			expect(s3service).to.be.instanceOf(S3Service);

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.accessKeyId).to.deep.equal(mocked_instantiation_interface.accessKeyId, "accessKeyId is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.accessSecret).to.deep.equal(mocked_instantiation_interface.accessSecret, "accessSecret is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.region).to.deep.equal(mocked_instantiation_interface.region, "region is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.service).to.deep.equal(mocked_instantiation_interface.service, "service is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.method).to.deep.equal(mocked_instantiation_interface.method, "method is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.https).to.deep.equal(mocked_instantiation_interface.https, "https is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.protocol).to.deep.equal(mocked_instantiation_interface.https ? "https" : "http", "protocol is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(s3service.localStack).to.deep.equal(mocked_instantiation_interface.localStack, "localStack is not valid");
		});
	});

	describe("headObject", (): void => {
		it("should return the eTag and Content-Type headers when they are defined", async (): Promise<void> => {
			const mocked_instantiation_interface: S3ServiceInstantiationInterface = mockS3ServiceInstantiationInterface();
			const mockedAddress: string = "https://www.example.com/sample_bucket/sample_key.json";
			const mockedHeaders: Headers = new Headers();
			const mockedResponseHeaders: Headers = new Headers();
			const mockedETag: string = "mocked_etag";
			const mockedContentType: string = "application/json";
			const mockedAuthorizationHeader: string = "AWS4-HMAC-SHA256 Credential=mocked_access_key_id/20210101/mocked_region/mocked_service/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=mocked_signature";
			const mockedResponse: Response = new Response();
			const mockedS3RequestInterface: S3RequestInterface = mockDefaultS3RequestInterface();

			const mockedContentLength: number = 1;
			const mockedLastModified: Date = new Date(clock.now);

			const stubbedHeaders: SinonStub = stub(mockedResponse, "headers");

			mockedResponseHeaders.set("Content-Length", mockedContentLength.toString());
			mockedResponseHeaders.set("Last-Modified", mockedLastModified.toISOString());
			mockedResponseHeaders.set("eTag", mockedETag);
			mockedResponseHeaders.set("content-type", mockedContentType);

			stubbedHeaders.get((): Headers => {
				return mockedResponseHeaders;
			});

			stubbedS3Service.computeAddress.returns(mockedAddress);
			stubbedSignature.getComputedHeaders.returns(mockedHeaders);
			stubbedSignature.getAuthorizationHeader.returns(mockedAuthorizationHeader);
			stubbedFetch.resolves(mockedResponse);

			const s3service: S3Service = new S3Service(mocked_instantiation_interface);

			await expect(s3service.headObject(mockedS3RequestInterface)).to.eventually.deep.equal({
				contentLength: mockedContentLength,
				lastModified: mockedLastModified,
				eTag: mockedETag,
				contentType: mockedContentType,
			});
		});
	});

	describe("computeAddress", (): void => {
		it("should return an AWS formed address if the localStack property is false", (): void => {
			const mocked_instantiation_interface: S3ServiceInstantiationInterface = mockS3ServiceInstantiationInterface();
			const mockedURLSearchParams: URLSearchParams = new URLSearchParams();
			const mockedBucket: string = "sample_bucket";
			const mockedKey: string = "sample_key.json";

			const s3service: S3Service = new S3Service(mocked_instantiation_interface);

			const address: string = s3service["computeAddress"]({
				protocol: s3service["protocol"],
				host: s3service["host"],
				bucket: mockedBucket,
				key: mockedKey,
				parameters: mockedURLSearchParams,
			});

			expect(address).to.deep.equal(`${s3service["protocol"]}://${mockedBucket}.${s3service["host"]}/${mockedKey}?${mockedURLSearchParams.toString()}`.replace(/\?$/, ""), "Address is not valid");
		});

		it("should return a localStack formed address if the localStack property is true", (): void => {
			const mocked_instantiation_interface: S3ServiceInstantiationInterface = {
				...mockS3ServiceInstantiationInterface(),
				localStack: true,
			};
			const mockedURLSearchParams: URLSearchParams = new URLSearchParams();
			const mockedBucket: string = "sample_bucket";
			const mockedKey: string = "sample_key.json";

			const s3service: S3Service = new S3Service(mocked_instantiation_interface);

			const address: string = s3service["computeAddress"]({
				protocol: s3service["protocol"],
				host: s3service["host"],
				bucket: mockedBucket,
				key: mockedKey,
				parameters: mockedURLSearchParams,
			});

			expect(address).to.deep.equal(`${s3service["protocol"]}://${s3service["host"]}/${mockedBucket}/${mockedKey}?${mockedURLSearchParams.toString()}`.replace(/\?$/, ""), "Address is not valid");
		});
	});
});
