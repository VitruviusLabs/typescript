import type { SignatureIngredientsInterface } from "../../../../src/service/jwt/definition/interface/signature-ingredients.interface.mjs";
import { computeSignature } from "../../../../src/service/jwt/utility/compute-signature.mjs";
import { Base64URL } from "../../../../src/service/jwt/utility/base64-url.mjs";
import { describe, it } from "node:test";
import { strictEqual } from "node:assert";

describe("computeSignature", (): void => {
	it("should return a signature", (): void => {
		const HEADER: object = { typ: "JWT", alg: "RSA-SHA256" };
		const CLAIMS: object = {};

		const INGREDIENTS: SignatureIngredientsInterface = {
			algorithm: "RSA-SHA256",
			secret: "your-256-bit-secret-here",
			encodedHeader: Base64URL.Encode(JSON.stringify(HEADER)),
			encodedClaims: Base64URL.Encode(JSON.stringify(CLAIMS)),
		};

		const SIGNATURE: string = computeSignature(INGREDIENTS);

		// cspell:disable
		const EXPECTED_SIGNATURE: string = "HMKfUm13aMKBccKPw6DCjsOdwq3Cvh4ewpXCtxogFAI4w4IMRsK8w53Cn8OuTFg";
		// cspell:enable

		strictEqual(SIGNATURE, EXPECTED_SIGNATURE);
	});
});
