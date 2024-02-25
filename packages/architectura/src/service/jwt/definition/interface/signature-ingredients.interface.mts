import type { SecretType } from "../type/secret.type.mjs";

interface SignatureIngredientsInterface
{
	algorithm: string;
	secret: SecretType;
	encodedHeader: string;
	encodedClaims: string;
}

export type { SignatureIngredientsInterface };
