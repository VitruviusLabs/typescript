import type { JWTClaimsInterface } from "../definition/interface/jwt-claims.interface.mjs";
import { isDefined } from "@vitruvius-labs/ts-predicate";

/**
 * Validates the standard properties of a JWT claims
 *
 * @internal
 */
function validateClaims(claims: JWTClaimsInterface, validate_nbf: boolean = false): void
{
	const NOW: number = Date.now();

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

	if (isDefined(claims.iat) && claims.iat > NOW)
	{
		throw new Error("JWT issued in the future.");
	}

	if (isDefined(claims.exp) && claims.exp < NOW)
	{
		throw new Error("JWT is expired.");
	}

	/* A token may be created without being immediately usable */
	if (validate_nbf && isDefined(claims.nbf) && claims.nbf > NOW)
	{
		throw new Error("JWT is not active yet.");
	}
}

export { validateClaims };
