import { before, describe, it } from "mocha";
import { expect } from "chai";
import { type SinonStub, stub, useFakeTimers } from "sinon";
import { HTTPMethodEnum, Signature, SignatureEnum, type SignatureInstantiationInterface, type SignatureInterface } from "../src/_index.mjs";
import { mockSignatureInstantiationInterface } from "../mocks/definitions/interfaces/signature-instantiation.interface.mjs";
import { createHash, createHmac } from "crypto";

describe("Signature", (): void => {
	// eslint-disable-next-line prefer-arrow-callback
	before(function(): void {
		this["clock"] = useFakeTimers({
			now: Date.now(),
			toFake: [
				"Date",
			],
		});
	});

	describe("constructor", (): void => {
		it("should return a properly initialised Signature instance when called with the appropriate interface", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const signature: Signature = new Signature(mocked_instantiation_interface);

			expect(signature).to.be.instanceOf(Signature);

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.accessKeyId).to.deep.equal(mocked_instantiation_interface.accessKeyId, "accessKeyId is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.accessSecret).to.deep.equal(mocked_instantiation_interface.accessSecret, "accessSecret is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.region).to.deep.equal(mocked_instantiation_interface.region, "region is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.service).to.deep.equal(mocked_instantiation_interface.service, "service is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.method).to.deep.equal(mocked_instantiation_interface.method, "method is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.headers.has("host"), "host is missing from the signature headers").to.be.true;
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.headers.get("host")).to.deep.equal(new Headers(mocked_instantiation_interface.headers).get("host"), "host header is different from the one provided");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.toString()).to.deep.equal(mocked_instantiation_interface.url, "url is not valid");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.body).to.deep.equal(mocked_instantiation_interface.body, "body is not valid");
		});
	});

	describe("getRegion", (): void => {
		it("should return the region property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "region";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.region = mocked_property;

			const tested_property: string = "region";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getRegion()).to.deep.equal(signature.region, error_message);
		});
	});

	describe("getService", (): void => {
		it("should return the service property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "service";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.service = mocked_property;

			const tested_property: string = "service";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getService()).to.deep.equal(signature.service, error_message);
		});
	});

	describe("getMethod", (): void => {
		it("should return the service property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: HTTPMethodEnum = HTTPMethodEnum.GET;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.method = mocked_property;

			const tested_property: string = "method";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getMethod()).to.deep.equal(signature.method, error_message);
		});
	});

	describe("getHeaders", (): void => {
		it("should return the headers property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: Headers = new Headers({
				host: "example.com",
			});

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.headers = mocked_property;

			const tested_property: string = "headers";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getHeaders()).to.deep.equal(signature.headers, error_message);
		});
	});

	describe("getURL", (): void => {
		it("should return the url property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: URL = new URL("https://example.com");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.url = mocked_property;

			const tested_property: string = "url";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getURL()).to.deep.equal(signature.url, error_message);
		});
	});

	describe("getBody", (): void => {
		it("should return the body property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = JSON.stringify({ foo: "bar" });

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.body = mocked_property;

			const tested_property: string = "body";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getBody()).to.deep.equal(signature.body, error_message);
		});
	});

	describe("getCanonicalURI", (): void => {
		it("should return the path property of the url property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: URL = new URL("https://example.com/test/path");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.url = mocked_property;

			const tested_property: string = "canonicalURI";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getCanonicalURI()).to.deep.equal(signature.url.pathname, error_message);
		});
	});

	describe("getQuery", (): void => {
		it("should return the searchParams property of the url property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: URL = new URL("https://example.com/test/path?foo=bar&quz=qux");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.query = mocked_property;

			const tested_property: string = "query";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getQuery()).to.deep.equal(signature.url.searchParams, error_message);
		});
	});

	describe("getBodyHash", (): void => {
		it("should return the bodyHash property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "bodyHash";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.bodyHash = mocked_property;

			const tested_property: string = "bodyHash";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getBodyHash()).to.deep.equal(signature.bodyHash, error_message);
		});
	});

	describe("getAmzShortDate", (): void => {
		it("should return the amzShortDate property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "20240301";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.amzShortDate = mocked_property;

			const tested_property: string = "amzShortDate";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getAmzShortDate()).to.deep.equal(signature.amzShortDate, error_message);
		});
	});

	describe("getAmzFullDate", (): void => {
		it("should return the amzFullDate property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "20240301151213";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.amzFullDate = mocked_property;

			const tested_property: string = "amzFullDate";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getAmzFullDate()).to.deep.equal(signature.amzFullDate, error_message);
		});
	});

	describe("getComputedHeaders", (): void => {
		it("should return the computedHeaders property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: Headers = new Headers({
				host: "example.com",
			});

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.computedHeaders = mocked_property;

			const tested_property: string = "computedHeaders";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getComputedHeaders()).to.deep.equal(signature.computedHeaders, error_message);
		});
	});

	describe("getCanonicalHeadersString", (): void => {
		it("should return the canonicalHeadersString property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "canonicalHeadersString";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.canonicalHeadersString = mocked_property;

			const tested_property: string = "canonicalHeadersString";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getCanonicalHeadersString()).to.deep.equal(signature.canonicalHeadersString, error_message);
		});
	});

	describe("getSignedHeadersString", (): void => {
		it("should return the signedHeadersString property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "signedHeadersString";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.signedHeadersString = mocked_property;

			const tested_property: string = "signedHeadersString";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getSignedHeadersString()).to.deep.equal(signature.signedHeadersString, error_message);
		});
	});

	describe("getCanonicalQueryString", (): void => {
		it("should return the canonicalQueryString property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "canonicalQueryString";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.canonicalQueryString = mocked_property;

			const tested_property: string = "canonicalQueryString";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getCanonicalQueryString()).to.deep.equal(signature.canonicalQueryString, error_message);
		});
	});

	describe("getCanonicalRequest", (): void => {
		it("should return the canonicalRequest property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "canonicalRequest";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.canonicalRequest = mocked_property;

			const tested_property: string = "canonicalRequest";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getCanonicalRequest()).to.deep.equal(signature.canonicalRequest, error_message);
		});
	});

	describe("getSigningKey", (): void => {
		it("should return the signingKey property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: Buffer = Buffer.from("signingKey");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.signingKey = mocked_property;

			const tested_property: string = "signingKey";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getSigningKey()).to.deep.equal(signature.signingKey, error_message);
		});
	});

	describe("getCredentialScope", (): void => {
		it("should return the credentialScope property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "credentialScope";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.credentialScope = mocked_property;

			const tested_property: string = "credentialScope";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getCredentialScope()).to.deep.equal(signature.credentialScope, error_message);
		});
	});

	describe("getStringToSign", (): void => {
		it("should return the stringToSign property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "stringToSign";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.stringToSign = mocked_property;

			const tested_property: string = "stringToSign";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getStringToSign()).to.deep.equal(signature.stringToSign, error_message);
		});
	});

	describe("getSignature", (): void => {
		it("should return the signature property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "signature";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.signature = mocked_property;

			const tested_property: string = "signature";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getSignature()).to.deep.equal(signature.signature, error_message);
		});
	});

	describe("getAuthorizationHeader", (): void => {
		it("should return the authorizationHeader property", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_property: string = "authorizationHeader";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to access this private property for testing purposes.
			signature.authorizationHeader = mocked_property;

			const tested_property: string = "authorizationHeader";

			const error_message: string = `The ${tested_property} returned by the getter is not the same as the one set in the object.`;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.getAuthorizationHeader()).to.deep.equal(signature.authorizationHeader, error_message);
		});
	});

	describe("generate", (): void => {
		// eslint-disable-next-line max-statements
		it("should return the signature interface with all the properties set to the expected values when called and follow the proper workflow", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_signature: string = "signature";
			const mocked_authorization_header: string = "authorizationHeader";
			const mocked_body_hash: string = "bodyHash";
			const mocked_amz_full_date: string = "20240301T151213Z";
			const mocked_computed_headers: Headers = new Headers({
				"host": "example.com",
				"x-amz-content-sha256": "bodyHash",
				"x-amz-date": "20240301T151213Z",
			});

			const expected_result: SignatureInterface = {
				signature: mocked_signature,
				authorizationHeader: mocked_authorization_header,
				xAmzContentSha256: mocked_body_hash,
				xAmzDate: mocked_amz_full_date,
				headers: mocked_computed_headers,
			};

			const signature: Signature = new Signature(mocked_instantiation_interface);

			const stubbedSignature: {
				generateBodyHash: SinonStub;
				generateAMZDate: SinonStub;
				generateComputedHeaders: SinonStub;
				appendAuthorizationHeaderMethodHeaders: SinonStub;
				generateSignedHeaders: SinonStub;
				generateCanonicalQueryString: SinonStub;
				generateCanonicalRequest: SinonStub;
				generateCredentialScope: SinonStub;
				generateStringToSign: SinonStub;
				getSignatureKey: SinonStub;
				generateSignature: SinonStub;
				generateAuthorizationHeader: SinonStub;
			} = {
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateBodyHash: stub(signature, "generateBodyHash").returns(mocked_body_hash),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateAMZDate: stub(signature, "generateAMZDate").returns(mocked_amz_full_date),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateComputedHeaders: stub(signature, "generateComputedHeaders").returns(mocked_computed_headers),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				appendAuthorizationHeaderMethodHeaders: stub(signature, "appendAuthorizationHeaderMethodHeaders"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateSignedHeaders: stub(signature, "generateSignedHeaders"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCanonicalQueryString: stub(signature, "generateCanonicalQueryString"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCanonicalRequest: stub(signature, "generateCanonicalRequest"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCredentialScope: stub(signature, "generateCredentialScope"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateStringToSign: stub(signature, "generateStringToSign"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				getSignatureKey: stub(signature, "getSignatureKey"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateSignature: stub(signature, "generateSignature").returns(mocked_signature),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateAuthorizationHeader: stub(signature, "generateAuthorizationHeader").returns(mocked_authorization_header),
			};

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signature = mocked_signature;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.authorizationHeader = mocked_authorization_header;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.bodyHash = mocked_body_hash;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.amzFullDate = mocked_amz_full_date;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.computedHeaders = mocked_computed_headers;

			const result: SignatureInterface = signature.generate();

			expect(result).to.deep.equal(expected_result, "The signature returned by the generate method is not the same as the one expected.");
			expect(stubbedSignature.generateBodyHash.calledOnceWithExactly(), "The generateBodyHash method has not been called.").to.be.true;
			expect(stubbedSignature.generateBodyHash.calledImmediatelyBefore(stubbedSignature.generateAMZDate), "The generateBodyHash method was not called before generateAMZDate.").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledOnceWithExactly(), "The generateAMZDate method has not been called.").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledImmediatelyAfter(stubbedSignature.generateBodyHash), "The generateAMZDate method was not called after generateBodyHash").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledImmediatelyBefore(stubbedSignature.generateComputedHeaders), "The generateAMZDate method was not called before generateComputedHeaders.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledOnceWithExactly(), "The generateComputedHeaders method has not been called.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledImmediatelyAfter(stubbedSignature.generateAMZDate), "The generateComputedHeaders method was not called after generateAMZDate.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledImmediatelyBefore(stubbedSignature.appendAuthorizationHeaderMethodHeaders), "The generateComputedHeaders method was not called before appendAuthorizationHeaderMethodHeaders.").to.be.true;
			expect(stubbedSignature.appendAuthorizationHeaderMethodHeaders.calledOnceWithExactly(), "The appendAuthorizationHeaderMethodHeaders method has not been called.").to.be.true;
			expect(stubbedSignature.appendAuthorizationHeaderMethodHeaders.calledImmediatelyAfter(stubbedSignature.generateComputedHeaders), "The appendAuthorizationHeaderMethodHeaders method was not called after generateComputedHeaders.").to.be.true;
			expect(stubbedSignature.appendAuthorizationHeaderMethodHeaders.calledImmediatelyBefore(stubbedSignature.generateSignedHeaders), "The appendAuthorizationHeaderMethodHeaders method was not called before generateSignedHeaders.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledOnceWithExactly(), "The generateSignedHeaders method has not been called.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledImmediatelyAfter(stubbedSignature.appendAuthorizationHeaderMethodHeaders), "The generateSignedHeaders method was not called after appendAuthorizationHeaderMethodHeaders.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledImmediatelyBefore(stubbedSignature.generateCanonicalQueryString), "The generateSignedHeaders method was not called before generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledOnceWithExactly(), "The generateCanonicalQueryString method has not been called.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledImmediatelyAfter(stubbedSignature.generateSignedHeaders), "The generateCanonicalQueryString method was not called after generateSignedHeaders.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledImmediatelyBefore(stubbedSignature.generateCanonicalRequest), "The generateCanonicalQueryString method was not called before generateCanonicalRequest.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledOnceWithExactly(), "The generateCanonicalRequest method has not been called.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledImmediatelyAfter(stubbedSignature.generateCanonicalQueryString), "The generateCanonicalRequest method was not called after generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledImmediatelyBefore(stubbedSignature.generateCredentialScope), "The generateCanonicalRequest method was not called before generateCredentialScope.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledOnceWithExactly(), "The generateCredentialScope method has not been called.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledImmediatelyAfter(stubbedSignature.generateCanonicalRequest), "The generateCredentialScope method was not called after generateCanonicalRequest.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledImmediatelyBefore(stubbedSignature.generateStringToSign), "The generateCredentialScope method was not called before generateStringToSign.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledOnceWithExactly(), "The generateStringToSign method has not been called.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledImmediatelyAfter(stubbedSignature.generateCredentialScope), "The generateStringToSign method was not called after generateCredentialScope.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledImmediatelyBefore(stubbedSignature.getSignatureKey), "The generateStringToSign method was not called before getSignatureKey.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledOnceWithExactly(), "The getSignatureKey method has not been called.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledImmediatelyAfter(stubbedSignature.generateStringToSign), "The getSignatureKey method was not called after generateStringToSign.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledImmediatelyBefore(stubbedSignature.generateSignature), "The getSignatureKey method was not called before generateSignature.").to.be.true;
			expect(stubbedSignature.generateSignature.calledOnceWithExactly(), "The generateSignature method has not been called.").to.be.true;
			expect(stubbedSignature.generateSignature.calledImmediatelyAfter(stubbedSignature.getSignatureKey), "The generateSignature method was not called after getSignatureKey.").to.be.true;
			expect(stubbedSignature.generateSignature.calledImmediatelyBefore(stubbedSignature.generateAuthorizationHeader), "The generateSignature method was not called before generateAuthorizationHeader.").to.be.true;
			expect(stubbedSignature.generateAuthorizationHeader.calledOnceWithExactly(), "The generateAuthorizationHeader method has not been called.").to.be.true;
			expect(stubbedSignature.generateAuthorizationHeader.calledImmediatelyAfter(stubbedSignature.generateSignature), "The generateAuthorizationHeader method was not called after generateSignature.").to.be.true;

			stubbedSignature.generateBodyHash.restore();
			stubbedSignature.generateAMZDate.restore();
			stubbedSignature.generateComputedHeaders.restore();
			stubbedSignature.appendAuthorizationHeaderMethodHeaders.restore();
			stubbedSignature.generateSignedHeaders.restore();
			stubbedSignature.generateCanonicalQueryString.restore();
			stubbedSignature.generateCanonicalRequest.restore();
			stubbedSignature.generateCredentialScope.restore();
			stubbedSignature.generateStringToSign.restore();
			stubbedSignature.getSignatureKey.restore();
			stubbedSignature.generateSignature.restore();
			stubbedSignature.generateAuthorizationHeader.restore();
		});
	});

	describe("getPresignedURL", (): void => {
		// eslint-disable-next-line max-statements
		it("should return the url property with the query parameters appended when called and follow the appropriate workflow", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_signature: string = "signature";
			const mocked_authorization_header: string = "authorizationHeader";
			const mocked_body_hash: string = "bodyHash";
			const mocked_amz_full_date: string = "20240301T151213Z";
			const mocked_computed_headers: Headers = new Headers({
				"host": "example.com",
				"x-amz-content-sha256": "bodyHash",
				"x-amz-date": "20240301T151213Z",
			});

			const expected_presigned_url: URL = new URL(mocked_instantiation_interface.url);

			expected_presigned_url.searchParams.append("X-Amz-Signature", mocked_signature);

			const signature: Signature = new Signature(mocked_instantiation_interface);

			const stubbedSignature: {
				resetForPresigned: SinonStub;
				generateAMZDate: SinonStub;
				generateComputedHeaders: SinonStub;
				generateSignedHeaders: SinonStub;
				generateCredentialScope: SinonStub;
				appendParametersForPresigned: SinonStub;
				generateCanonicalQueryString: SinonStub;
				generateCanonicalRequest: SinonStub;
				generateStringToSign: SinonStub;
				getSignatureKey: SinonStub;
				generateSignature: SinonStub;
				generateAuthorizationHeader: SinonStub;
			} = {
				// @ts-expect-error - We need to stub this private method for testing purposes.
				resetForPresigned: stub(signature, "resetForPresigned"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateAMZDate: stub(signature, "generateAMZDate").returns(mocked_amz_full_date),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateComputedHeaders: stub(signature, "generateComputedHeaders").returns(mocked_computed_headers),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateSignedHeaders: stub(signature, "generateSignedHeaders"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCredentialScope: stub(signature, "generateCredentialScope"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				appendParametersForPresigned: stub(signature, "appendParametersForPresigned"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCanonicalQueryString: stub(signature, "generateCanonicalQueryString"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateCanonicalRequest: stub(signature, "generateCanonicalRequest"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateStringToSign: stub(signature, "generateStringToSign"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				getSignatureKey: stub(signature, "getSignatureKey"),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateSignature: stub(signature, "generateSignature").returns(mocked_signature),
				// @ts-expect-error - We need to stub this private method for testing purposes.
				generateAuthorizationHeader: stub(signature, "generateAuthorizationHeader").returns(mocked_authorization_header),
			};

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signature = mocked_signature;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.authorizationHeader = mocked_authorization_header;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.bodyHash = mocked_body_hash;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.amzFullDate = mocked_amz_full_date;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.computedHeaders = mocked_computed_headers;

			const result: string = signature.getPresignedURL(86400);

			expect(result).to.deep.equal(expected_presigned_url.toString(), "The presigned URL returned by the getPresignedURL method is not the same as the one expected.");
			expect(stubbedSignature.resetForPresigned.calledOnceWithExactly(), "The resetForPresigned method has not been called.").to.be.true;
			expect(stubbedSignature.resetForPresigned.calledImmediatelyBefore(stubbedSignature.generateAMZDate), "The resetForPresigned method was not called before generateAMZDate.").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledOnceWithExactly(), "The generateAMZDate method has not been called.").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledImmediatelyAfter(stubbedSignature.resetForPresigned), "The generateAMZDate method was not called after resetForPresigned.").to.be.true;
			expect(stubbedSignature.generateAMZDate.calledImmediatelyBefore(stubbedSignature.generateComputedHeaders), "The generateAMZDate method was not called before generateComputedHeaders.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledOnceWithExactly(), "The generateComputedHeaders method has not been called.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledImmediatelyAfter(stubbedSignature.generateAMZDate), "The generateComputedHeaders method was not called after generateAMZDate.").to.be.true;
			expect(stubbedSignature.generateComputedHeaders.calledImmediatelyBefore(stubbedSignature.generateSignedHeaders), "The generateComputedHeaders method was not called before appendParametersForPresigned.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledOnceWithExactly(), "The generateSignedHeaders method has not been called.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledImmediatelyAfter(stubbedSignature.generateComputedHeaders), "The generateSignedHeaders method was not called after generateComputedHeaders.").to.be.true;
			expect(stubbedSignature.generateSignedHeaders.calledImmediatelyBefore(stubbedSignature.generateCredentialScope), "The generateSignedHeaders method was not called before generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledOnceWithExactly(), "The generateCredentialScope method has not been called.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledImmediatelyAfter(stubbedSignature.generateSignedHeaders), "The generateCredentialScope method was not called after generateSignedHeaders.").to.be.true;
			expect(stubbedSignature.generateCredentialScope.calledImmediatelyBefore(stubbedSignature.appendParametersForPresigned), "The generateCredentialScope method was not called before generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.appendParametersForPresigned.calledOnceWithExactly(86400), "The appendParametersForPresigned method has not been called.").to.be.true;
			expect(stubbedSignature.appendParametersForPresigned.calledImmediatelyAfter(stubbedSignature.generateCredentialScope), "The appendParametersForPresigned method was not called after generateCredentialScope.").to.be.true;
			expect(stubbedSignature.appendParametersForPresigned.calledImmediatelyBefore(stubbedSignature.generateCanonicalQueryString), "The appendParametersForPresigned method was not called before generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledOnceWithExactly(), "The generateCanonicalQueryString method has not been called.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledImmediatelyAfter(stubbedSignature.appendParametersForPresigned), "The generateCanonicalQueryString method was not called after appendParametersForPresigned.").to.be.true;
			expect(stubbedSignature.generateCanonicalQueryString.calledImmediatelyBefore(stubbedSignature.generateCanonicalRequest), "The generateCanonicalQueryString method was not called before generateCanonicalRequest.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledOnceWithExactly(), "The generateCanonicalRequest method has not been called.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledImmediatelyAfter(stubbedSignature.generateCanonicalQueryString), "The generateCanonicalRequest method was not called after generateCanonicalQueryString.").to.be.true;
			expect(stubbedSignature.generateCanonicalRequest.calledImmediatelyBefore(stubbedSignature.generateStringToSign), "The generateCanonicalRequest method was not called before generateStringToSign.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledOnceWithExactly(), "The generateStringToSign method has not been called.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledImmediatelyAfter(stubbedSignature.generateCanonicalRequest), "The generateStringToSign method was not called after generateCanonicalRequest.").to.be.true;
			expect(stubbedSignature.generateStringToSign.calledImmediatelyBefore(stubbedSignature.getSignatureKey), "The generateStringToSign method was not called before getSignatureKey.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledOnceWithExactly(), "The getSignatureKey method has not been called.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledImmediatelyAfter(stubbedSignature.generateStringToSign), "The getSignatureKey method was not called after generateStringToSign.").to.be.true;
			expect(stubbedSignature.getSignatureKey.calledImmediatelyBefore(stubbedSignature.generateSignature), "The getSignatureKey method was not called before generateSignature.").to.be.true;
			expect(stubbedSignature.generateSignature.calledOnceWithExactly(), "The generateSignature method has not been called.").to.be.true;
			expect(stubbedSignature.generateSignature.calledImmediatelyAfter(stubbedSignature.getSignatureKey), "The generateSignature method was not called after getSignatureKey.").to.be.true;
			expect(stubbedSignature.generateSignature.calledImmediatelyBefore(stubbedSignature.generateAuthorizationHeader), "The generateSignature method was not called before generateAuthorizationHeader.").to.be.true;
			expect(stubbedSignature.generateAuthorizationHeader.calledOnceWithExactly(), "The generateAuthorizationHeader method has not been called.").to.be.true;
			expect(stubbedSignature.generateAuthorizationHeader.calledImmediatelyAfter(stubbedSignature.generateSignature), "The generateAuthorizationHeader method was not called after generateSignature.").to.be.true;
		});
	});

	describe("resetForPresigned", (): void => {
		it("should set the method, body, bodyHash and headers properties to the needed values when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.resetForPresigned();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.method).to.deep.equal(HTTPMethodEnum.GET, `Signature method is not ${HTTPMethodEnum.GET} after being reset for presigned method.`);
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.body).to.deep.equal(SignatureEnum.PRESIGNED_METHOD_BODY, `Signature body is not ${SignatureEnum.PRESIGNED_METHOD_BODY} after being reset for presigned method.`);
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.bodyHash).to.deep.equal(SignatureEnum.PRESIGNED_METHOD_BODY, `Signature bodyHash is not ${SignatureEnum.PRESIGNED_METHOD_BODY} after being reset for presigned method.`);
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.headers.has("host"), "host is missing from the signature headers after being reset for presigned method.").to.be.true;
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.headers.get("host")).to.deep.equal(new Headers(mocked_instantiation_interface.headers).get("host"), "host header is different from the one provided after being reset for presigned method.");
		});
	});

	describe("generateBodyHash", (): void => {
		it("should compute the bodyHash property to the hashed body when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const expected_hash: string = createHash(SignatureEnum.CRYPTO_ALGORITHM).update(mocked_instantiation_interface.body).digest("hex");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateBodyHash();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.bodyHash).to.deep.equal(expected_hash, "Signature bodyHash is not equal to the expected hash after generateBodyHash has been called.");
		});
	});

	describe("generateAMZDate", (): void => {
		// eslint-disable-next-line prefer-arrow-callback
		it("should compute the amzShortDate and amzFullDate properties when called", function(): void {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_date: Date = new Date(this["clock"].now);

			const expected_year: string = mocked_date.getUTCFullYear().toString();
			const expected_month: string = (mocked_date.getUTCMonth() + 1).toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
			const expected_day: string = mocked_date.getUTCDate().toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
			const expected_hours: string = mocked_date.getUTCHours().toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
			const expected_minutes: string = mocked_date.getUTCMinutes().toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
			const expected_seconds: string = mocked_date.getUTCSeconds().toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");

			const expected_short_date: string = `${expected_year}${expected_month}${expected_day}`;
			const expected_full_date: string = `${expected_short_date}T${expected_hours}${expected_minutes}${expected_seconds}Z`;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateAMZDate();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.amzShortDate).to.deep.equal(expected_short_date, "Signature amzShortDate is not equal to the expected value after generateAMZDate has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.amzFullDate).to.deep.equal(expected_full_date, "Signature amzFullDate is not equal to the expected value after generateAMZDate has been called.");
		});
	});

	describe("generateComputedHeaders", (): void => {
		it("should compute the computedHeaders property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateComputedHeaders();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.computedHeaders).to.be.instanceOf(Headers, "Signature computedHeaders is not an instance of Headers after generateComputedHeaders has been called.");

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.computedHeaders.has("host"), "Signature computedHeaders does not have the host property from the instantiation interface after generateComputedHeaders has been called.").to.be.true;

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.computedHeaders.get("host")).to.deep.equal(signature.headers.get("host"), "Signature computedHeaders host property is not equal to the expected value after generateComputedHeaders has been called.");
		});
	});

	describe("appendAuthorizationHeaderMethodHeaders", (): void => {
		it("should add the headers required for the authorization header method when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.appendAuthorizationHeaderMethodHeaders();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.computedHeaders.get("x-amz-content-sha256")).to.deep.equal(signature.bodyHash, "Signature computedHeaders x-amz-content-sha256 headers is not equal to the signature bodyHash property after appendAuthorizationHeaderMethodHeaders has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.computedHeaders.get("x-amz-date")).to.deep.equal(signature.amzFullDate, "Signature computedHeaders x-amz-date headers is not equal to the signature amzFullDate property after appendAuthorizationHeaderMethodHeaders has been called.");
		});
	});

	describe("appendParametersForPresigned", (): void => {
		it("should append the necessary URL parameters for a presigned URL method when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();
			const mocked_expires: number = 86400;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.resetForPresigned();
			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateAMZDate();
			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateComputedHeaders();
			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateSignedHeaders();
			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.appendParametersForPresigned(mocked_expires);

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.searchParams.get("X-Amz-Algorithm")).to.deep.equal(SignatureEnum.AWS_ALGORITHM, "Signature url search param 'X-Amz-Algorithm' is not equal to SignatureEnum.AWS_ALGORITHM after appendParametersForPresigned has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.searchParams.get("X-Amz-Credential")).to.deep.equal(`${signature.accessKeyId}/${signature.credentialScope}`, "Signature url search param 'X-Amz-Credential' is not equal to the expected value after appendParametersForPresigned has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.searchParams.get("X-Amz-Date")).to.deep.equal(signature.amzFullDate, "Signature url search param 'X-Amz-Date' is not equal to the signature amzFullDate property after appendParametersForPresigned has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.searchParams.get("X-Amz-Expires")).to.deep.equal(mocked_expires.toString(), "Signature url search param 'X-Amz-Expires' is not equal to passed expires parameter converted to string after appendParametersForPresigned has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.url.searchParams.get("X-Amz-SignedHeaders")).to.deep.equal(signature.signedHeadersString, "Signature url search param 'X-Amz-SignedHeaders' is not equal to signature signedHeadersString property after appendParametersForPresigned has been called.");
		});
	});

	describe("generateSignedHeaders", (): void => {
		it("should compute the signed property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mockedComputedHeaders: Headers = new Headers({
				"host": "example.com",
				"x-amz-content-sha256": "bodyHash",
				"x-amz-date": "amzFullDate",
			});

			const expected_canonical_header_string: string = "host:example.com\nx-amz-content-sha256:bodyHash\nx-amz-date:amzFullDate\n";
			const expected_signed_headers_string: string = "host;x-amz-content-sha256;x-amz-date";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.computedHeaders = mockedComputedHeaders;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateSignedHeaders();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.canonicalHeadersString).to.deep.equal(expected_canonical_header_string, "Signature canonicalHeadersString is not equal to the expected value after generateSignedHeaders has been called.");
			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.signedHeadersString).to.deep.equal(expected_signed_headers_string, "Signature signedHeadersString is not equal to the expected value after generateSignedHeaders has been called.");
		});
	});

	describe("generateCanonicalQueryString", (): void => {
		it("should compute the canonicalQueryString property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = {
				...mockSignatureInstantiationInterface(),
				method: HTTPMethodEnum.POST,
				url: "https://www.lilo.org?foo=bar&quz=qux&a=b",
			};

			const expected_canonical_query_string: string = "";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateCanonicalQueryString();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.canonicalQueryString).to.deep.equal(expected_canonical_query_string, "Signature canonicalQueryString is not equal to the expected value after generateCanonicalQueryString has been called.");
		});

		it("should immediately return when the method is not GET or HEAD", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = {
				...mockSignatureInstantiationInterface(),
				method: HTTPMethodEnum.GET,
				url: "https://www.lilo.org?foo=bar&quz=qux&a=b",
			};

			const expected_canonical_query_string: string = "a=b&foo=bar&quz=qux";

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateCanonicalQueryString();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.canonicalQueryString).to.deep.equal(expected_canonical_query_string, "Signature canonicalQueryString is not equal to the expected value after generateCanonicalQueryString has been called.");
		});
	});

	describe("generateCanonicalRequest", (): void => {
		it("should compute the canonicalRequest property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_url: URL = new URL("https://www.lilo.org/test/path?foo=bar&quz=qux&a=b");
			const mocked_canonical_query_string: string = "a=b&foo=bar&quz=qux";
			const mocked_canonical_headers_string: string = "canonicalHeadersString";
			const mocked_signed_headers_string: string = "signedHeadersString";
			const mocked_body_hash: string = "bodyHash";

			const expected_canonical_request: string = `${mocked_instantiation_interface.method}
${mocked_url.pathname}
${mocked_canonical_query_string}
${mocked_canonical_headers_string}
${mocked_signed_headers_string}
${mocked_body_hash}`;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.url = mocked_url;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.canonicalQueryString = mocked_canonical_query_string;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.canonicalHeadersString = mocked_canonical_headers_string;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signedHeadersString = mocked_signed_headers_string;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.bodyHash = mocked_body_hash;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateCanonicalRequest();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.canonicalRequest).to.deep.equal(expected_canonical_request, "Signature canonicalRequest is not equal to the expected value after generateCanonicalRequest has been called.");
		});
	});

	describe("generateCredentialScope", (): void => {
		// eslint-disable-next-line prefer-arrow-callback
		it("should compute the credentialScope property when called", function(): void {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_date: Date = new Date(this["clock"].now);

			const expected_year: string = mocked_date.getUTCFullYear().toString();
			const expected_month: string = (mocked_date.getUTCMonth() + 1).toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");
			const expected_day: string = mocked_date.getUTCDate().toString().padStart(SignatureEnum.TIME_PAD_LENGTH, "0");

			const expected_short_date: string = `${expected_year}${expected_month}${expected_day}`;
			const expected_credential_scope: string = `${expected_short_date}/${mocked_instantiation_interface.region}/${mocked_instantiation_interface.service}/aws4_request`;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.amzShortDate = expected_short_date;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateCredentialScope();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.credentialScope).to.deep.equal(expected_credential_scope, "Signature credentialScope is not equal to the expected value after generateCredentialScope has been called.");
		});
	});

	describe("generateStringToSign", (): void => {
		it("should compute the stringToSign property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_canonical_request: string = "canonicalRequest";
			const mocked_amz_short_date: string = "20240301";
			const mocked_amz_full_date: string = `${mocked_amz_short_date}T151412Z`;
			const mocked_credential_scope: string = `${mocked_amz_short_date}/${mocked_instantiation_interface.region}/${mocked_instantiation_interface.service}/aws4_request`;

			const expected_string_to_sign: string = `${SignatureEnum.AWS_ALGORITHM}
${mocked_amz_full_date}
${mocked_credential_scope}
${createHash(SignatureEnum.CRYPTO_ALGORITHM).update(mocked_canonical_request).digest("hex")}`;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.amzFullDate = mocked_amz_full_date;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.credentialScope = mocked_credential_scope;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.canonicalRequest = mocked_canonical_request;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateStringToSign();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.stringToSign).to.deep.equal(expected_string_to_sign, "Signature stringToSign is not equal to the expected value after generateStringToSign has been called.");
		});
	});

	describe("getSignatureKey", (): void => {
		it("should compute the signingKey property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_secret: string = "secret";
			const mocked_amz_short_date: string = "20240301";

			const expected_date_buffer: Buffer = createHmac(SignatureEnum.CRYPTO_ALGORITHM, `AWS4${mocked_secret}`).update(mocked_amz_short_date).digest();
			const expected_region_buffer: Buffer = createHmac(SignatureEnum.CRYPTO_ALGORITHM, expected_date_buffer).update(mocked_instantiation_interface.region).digest();
			const expected_service_buffer: Buffer = createHmac(SignatureEnum.CRYPTO_ALGORITHM, expected_region_buffer).update(mocked_instantiation_interface.service).digest();
			const expected_signing_key: Buffer = createHmac(SignatureEnum.CRYPTO_ALGORITHM, expected_service_buffer).update("aws4_request").digest();

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.accessSecret = mocked_secret;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.amzShortDate = mocked_amz_short_date;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.getSignatureKey(mocked_secret);

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.signingKey).to.deep.equal(expected_signing_key, "Signature signingKey is not equal to the expected value after getSigningKey has been called.");
		});
	});

	describe("generateSignature", (): void => {
		it("should compute the signature property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_string_to_sign: string = "stringToSign";
			const mocked_signing_key: Buffer = Buffer.from("signingKey");

			const expected_signature: string = createHmac(SignatureEnum.CRYPTO_ALGORITHM, mocked_signing_key).update(mocked_string_to_sign).digest("hex");

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.stringToSign = mocked_string_to_sign;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signingKey = mocked_signing_key;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateSignature();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.signature).to.deep.equal(expected_signature, "Signature signature is not equal to the expected value after generateSignature has been called.");
		});
	});

	describe("generateAuthorizationHeader", (): void => {
		it("should compute the authorizationHeader property when called", (): void => {
			const mocked_instantiation_interface: SignatureInstantiationInterface = mockSignatureInstantiationInterface();

			const mocked_access_key_id: string = "accessKeyId";
			const mocked_credential_scope: string = "credentialScope";
			const mocked_signed_headers_string: string = "signedHeadersString";
			const mocked_signature: string = "signature";

			const expected_authorization_header: string = `${SignatureEnum.AWS_ALGORITHM} Credential=${mocked_access_key_id}/${mocked_credential_scope}, SignedHeaders=${mocked_signed_headers_string}, Signature=${mocked_signature}`;

			const signature: Signature = new Signature(mocked_instantiation_interface);

			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.accessKeyId = mocked_access_key_id;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.credentialScope = mocked_credential_scope;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signedHeadersString = mocked_signed_headers_string;
			// @ts-expect-error - We need to write this private property for testing purposes.
			signature.signature = mocked_signature;

			// @ts-expect-error - We need to call this private method for testing purposes.
			signature.generateAuthorizationHeader();

			// @ts-expect-error - We need to access this private property for testing purposes.
			expect(signature.authorizationHeader).to.deep.equal(expected_authorization_header, "Signature authorizationHeader is not equal to the expected value after generateAuthorizationHeader has been called.");
		});
	});
});
