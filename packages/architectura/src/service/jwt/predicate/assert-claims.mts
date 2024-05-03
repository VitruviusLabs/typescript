import type { JWTClaimsInterface } from "../_index.mjs";
import { isRecord } from "@vitruvius-labs/ts-predicate/type-guard";

function assertClaims(claims: unknown): asserts claims is JWTClaimsInterface
{
	if (!isRecord(claims))
	{
		throw new Error("Invalid claims.");
	}
}

export { assertClaims };
