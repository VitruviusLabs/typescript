import { after, beforeEach, describe, it } from "mocha";
// import { Buffer as NodeBuffer } from "node:buffer";
import { use as chaiUse, expect } from "chai";
import { type SinonSpy, type SinonStub, spy, stub } from "sinon";
import { S3Service, type S3ServiceInstantiationInterface } from "../src/_index.mjs";
import { mockS3ServiceInstantiationInterface } from "../mocks/definition/interface/s3-service-instantiation.interface.mjs";
import { Signature } from "@vitruvius-labs/aws-signature-v4";

import { default as chaiAsPromised } from "chai-as-promised";

chaiUse(chaiAsPromised);

describe("S3Service", (): void => {
	const stubbedSignature: { getComputedHeaders: SinonStub; getAuthorizationHeader: SinonStub } = {
		getComputedHeaders: stub(Signature.prototype, "getComputedHeaders"),
		getAuthorizationHeader: stub(Signature.prototype, "getAuthorizationHeader"),
	};

	const spiedSignature: { generate: SinonSpy } = {
		generate: spy(Signature.prototype, "generate"),
	};

	beforeEach((): void => {
		stubbedSignature.getAuthorizationHeader.reset();
		stubbedSignature.getComputedHeaders.reset();

		spiedSignature.generate.resetHistory();
	});

	after((): void => {
		stubbedSignature.getAuthorizationHeader.restore();
		stubbedSignature.getComputedHeaders.restore();

		spiedSignature.generate.restore();
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
		});
	});
});
