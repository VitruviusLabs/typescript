import type { JWTClaimsInterface } from "../_index.mjs";
import { isDefined } from "@vitruvius-labs/ts-predicate/type-guard";

// @internal
function validateClaims(claims: JWTClaimsInterface, check_active: boolean = true): void
{
	const NOW: number = Date.now();

	if (isDefined(claims.iat) && claims.iat > NOW)
	{
		throw new Error("JWT issued in the future.");
	}

	if (isDefined(claims.exp) && claims.exp < NOW)
	{
		throw new Error("JWT is expired.");
	}

	if (check_active && isDefined(claims.nbf) && claims.nbf > NOW)
	{
		throw new Error("JWT is not active yet.");
	}

	if (isDefined(claims.iat) && isDefined(claims.nbf) && claims.iat > claims.nbf)
	{
		throw new Error("Inconsistency: active before being issued.");
	}

	if (isDefined(claims.iat) && isDefined(claims.exp) && claims.iat > claims.exp)
	{
		throw new Error("Inconsistency: issued already expired.");
	}

	if (isDefined(claims.nbf) && isDefined(claims.exp) && claims.nbf > claims.exp)
	{
		throw new Error("Inconsistency: active after it expires.");
	}
}

export { validateClaims };
