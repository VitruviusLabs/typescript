import type { SecretType } from "../type/secret.type.mjs";

/**
 * Ingredients to sign a JWT
 *
 * @internal
 */
interface SignatureIngredientsInterface
{
	algorithm: string;
	secret: SecretType;
	encodedHeader: string;
	encodedClaims: string;
}

export type { SignatureIngredientsInterface };
