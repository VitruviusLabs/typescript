import type { JWTHeaderInterface } from "../definition/interface/jwt-header.interface.mjs";
import { assertEnumValue, assertString, assertStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-assertion";

function assertHeader(header: unknown): asserts header is JWTHeaderInterface
{
	assertStructuredData<JWTHeaderInterface>(
		header,
		{
			typ: {
				test: unary(assertEnumValue, ["JWT"]),
			},
			alg: {
				test: assertString,
			},
		},
		{
			allowExtraneousProperties: true,
		}
	);
}

export { assertHeader };
