import type { JWTClaimsInterface } from "../definition/interface/jwt-claims.interface.mjs";
import { isRecord } from "@vitruvius-labs/ts-predicate";

/**
 * Asserts that the claims are valid
 *
 * @throws if the claims are invalid
 */
function assertClaims(claims: unknown): asserts claims is JWTClaimsInterface
{
	if (!isRecord(claims))
	{
		throw new Error("Invalid claims.");
	}
}

export { assertClaims };
