import { type Hmac, createHmac } from "node:crypto";
import type { SignatureIngredientsInterface } from "../definition/interface/signature-ingredients.interface.mjs";
import { Base64URL } from "../base64-url.mjs";

function computeSignature(ingredients: SignatureIngredientsInterface): string
{
	const PAYLOAD: string = `${ingredients.encodedHeader}.${ingredients.encodedClaims}`;
	const HMAC: Hmac = createHmac(ingredients.algorithm, ingredients.secret);
	const HASH: Buffer = HMAC.update(PAYLOAD).digest();
	const SIGNATURE: string = Base64URL.Encode(HASH.toString("binary"));

	return SIGNATURE;
}

export { computeSignature };
