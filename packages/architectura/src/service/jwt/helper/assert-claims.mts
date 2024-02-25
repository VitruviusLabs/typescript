import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { JWTClaimsInterface } from "../_index.mjs";

function assertClaims(claims: unknown): asserts claims is JWTClaimsInterface
{
	if (!TypeGuard.isRecord(claims))
	{
		throw new Error("Invalid claims.");
	}
}

export { assertClaims };
