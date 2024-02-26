import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { JWTClaimsInterface } from "../_index.mjs";

function validateClaims(claims: JWTClaimsInterface, check_active: boolean = true): void
{
	const NOW: number = Date.now();

	if (TypeGuard.isDefined(claims.iat) && claims.iat > NOW)
	{
		throw new Error("JWT issued in the future.");
	}

	if (TypeGuard.isDefined(claims.exp) && claims.exp < NOW)
	{
		throw new Error("JWT is expired.");
	}

	if (check_active && TypeGuard.isDefined(claims.nbf) && claims.nbf > NOW)
	{
		throw new Error("JWT is not active yet.");
	}

	if (TypeGuard.isDefined(claims.iat) && TypeGuard.isDefined(claims.nbf) && claims.iat > claims.nbf)
	{
		throw new Error("Inconsistency: active before being issued.");
	}

	if (TypeGuard.isDefined(claims.iat) && TypeGuard.isDefined(claims.exp) && claims.iat > claims.exp)
	{
		throw new Error("Inconsistency: issued already expired.");
	}

	if (TypeGuard.isDefined(claims.nbf) && TypeGuard.isDefined(claims.exp) && claims.nbf > claims.exp)
	{
		throw new Error("Inconsistency: active after it expires.");
	}
}

export { validateClaims };
