import type { SecretType } from "../definition/type/secret.type.mjs";
import type { JWTHeaderInterface } from "../definition/interface/jwt-header.interface.mjs";
import type { JWTClaimsInterface } from "../definition/interface/jwt-claims.interface.mjs";
import { Base64URL } from "../utility/base64-url.mjs";
import { validateAlgorithm } from "../utility/validate-algorithm.mjs";
import { validateSecret } from "../utility/validate-secret.mjs";
import { validateClaims } from "../utility/validate-claims.mjs";
import { computeSignature } from "../utility/compute-signature.mjs";
import { JSONUtility } from "../../../utility/json/json-utility.mjs";

/**
 * JSON Web Token
 *
 * @sealed
 */
class JWT
{
	private readonly header: JWTHeaderInterface;
	private readonly secret: SecretType;
	private claims: JWTClaimsInterface;

	/**
	 * Create a new JWT
	 *
	 * @throws if the some parameters are invalid
	 */
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

	/**
	 * Get the algorithm
	 */
	public getAlgorithm(): string
	{
		return this.header.alg;
	}

	/**
	 * Get the claims
	 */
	public getClaims(): JWTClaimsInterface
	{
		return this.claims;
	}

	/**
	 * Set the claims
	 *
	 * @throws if the claims are invalid
	 */
	public setClaims(claims: JWTClaimsInterface): void
	{
		validateClaims(claims);
		this.claims = claims;
	}

	/**
	 * Encode the JWT
	 *
	 * @throws if the claims are invalid (modified externally)
	 */
	public toString(): string
	{
		validateClaims(this.claims);
		const HEADER: string = Base64URL.Encode(JSON.stringify(this.header));
		const CLAIMS: string = Base64URL.Encode(JSONUtility.Encode(this.claims));

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
