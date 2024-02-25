import { TypeAssertion } from "@vitruvius-labs/ts-predicate";
import type { JWTHeaderInterface } from "../definition/interface/jwt-header.interface.mjs";

function assertHeader(header: unknown): asserts header is JWTHeaderInterface
{
	TypeAssertion.isStructuredData(
		header,
		{
			typ: {
				test: (value: unknown): asserts value is "JWT" =>
				{
					if (value !== "JWT")
					{
						throw new Error('"typ" must be "JWT".');
					}
				},
			},
			alg: {
				test: TypeAssertion.isString,
			},
		},
		{
			allowExtraneousProperties: true,
		}
	);
}

export { assertHeader };
