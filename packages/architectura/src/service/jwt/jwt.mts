import type { SecretType } from "./definition/type/secret.type.mjs";
import type { JWTHeaderInterface } from "./definition/interface/jwt-header.interface.mjs";
import type { JWTClaimsInterface } from "./definition/interface/jwt-claims.interface.mjs";
import { Base64URL } from "./helper/base64-url.mjs";
import { validateAlgorithm } from "./helper/validate-algorithm.mjs";
import { validateSecret } from "./helper/validate-secret.mjs";
import { validateClaims } from "./helper/validate-claims.mjs";
import { computeSignature } from "./helper/compute-signature.mjs";

class JWT
{
	private readonly header: JWTHeaderInterface;
	private readonly secret: SecretType;
	private claims: JWTClaimsInterface;

	public constructor(algorithm: string, secret: SecretType, claims: JWTClaimsInterface)
	{
		validateAlgorithm(algorithm);
		validateSecret(secret);
		validateClaims(claims);

		this.header = {
			typ: "JWT",
			alg: algorithm,
		};

		this.secret = secret;
		this.claims = claims;
	}

	public getAlgorithm(): string
	{
		return this.header.alg;
	}

	public getClaims(): JWTClaimsInterface
	{
		return this.claims;
	}

	public setClaims(claims: JWTClaimsInterface): void
	{
		validateClaims(claims);
		this.claims = claims;
	}

	public toString(): string
	{
		validateClaims(this.claims);
		const HEADER: string = Base64URL.Encode(JSON.stringify(this.header));
		const CLAIMS: string = Base64URL.Encode(JSON.stringify(this.claims));

		const SIGNATURE: string = computeSignature({
			algorithm: this.header.alg,
			secret: this.secret,
			encodedHeader: HEADER,
			encodedClaims: CLAIMS,
		});

		const SECURE_TOKEN: string = `${HEADER}.${CLAIMS}.${SIGNATURE}`;

		return SECURE_TOKEN;
	}
}

export { JWT };
