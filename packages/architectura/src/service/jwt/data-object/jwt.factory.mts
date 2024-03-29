import type { TokenType } from "../definition/type/token.type.mjs";
import type { SecretType } from "../definition/type/secret.type.mjs";
import type { JWTClaimsInterface } from "../definition/interface/jwt-claims.interface.mjs";
import { Base64URL } from "../utility/base64-url.mjs";
import { validateSecret } from "../utility/validate-secret.mjs";
import { assertToken } from "../predicate/assert-token.mjs";
import { assertHeader } from "../predicate/assert-header.mjs";
import { computeSignature } from "../utility/compute-signature.mjs";
import { assertClaims } from "../predicate/assert-claims.mjs";
import { JWT } from "./jwt.mjs";

class JWTFactory
{
	public static Create(algorithm: string, secret: SecretType, claims?: JWTClaimsInterface): JWT
	{
		return new JWT(algorithm, secret, claims ?? {});
	}

	public static Parse(encoded_token: string, secret: SecretType): JWT
	{
		if (!/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+){2}$/.test(encoded_token))
		{
			throw new Error("Invalid JWT.");
		}

		validateSecret(secret);

		const PARTS: Array<string> = encoded_token.split(".");

		assertToken(PARTS);

		const [ENCODED_HEADER, ENCODED_CLAIMS, ENCODED_SIGNATURE]: TokenType = PARTS;

		const HEADER: unknown = JSON.parse(Base64URL.Decode(ENCODED_HEADER));

		assertHeader(HEADER);

		const SIGNATURE: string = computeSignature({
			algorithm: HEADER.alg,
			secret: secret,
			encodedHeader: ENCODED_HEADER,
			encodedClaims: ENCODED_CLAIMS,
		});

		if (SIGNATURE !== ENCODED_SIGNATURE)
		{
			throw new Error("Invalid token signature.");
		}

		const CLAIMS: unknown = JSON.parse(Base64URL.Decode(ENCODED_CLAIMS));

		assertClaims(CLAIMS);

		const TOKEN: JWT = new JWT(HEADER.alg, secret, CLAIMS);

		return TOKEN;
	}
}

export { JWTFactory };
