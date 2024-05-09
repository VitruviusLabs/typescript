import type { JWTClaimsInterface } from "../definition/interface/jwt-claims.interface.mjs";
import { isRecord } from "@vitruvius-labs/ts-predicate/type-guard";

function assertClaims(claims: unknown): asserts claims is JWTClaimsInterface
{
	if (!isRecord(claims))
	{
		throw new Error("Invalid claims.");
	}
}

export { assertClaims };
