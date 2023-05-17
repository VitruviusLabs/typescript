import { TypeAssertion } from "@vitruvius-lab/ts-predicate";

import type { MockingInfos } from "../Type/MockingInfos.js";

function isMockingInfos(value: unknown): asserts value is MockingInfos
{
	TypeAssertion.isStructuredData<MockingInfos>(
		value,
		{
			token: {
				test: TypeAssertion.isString
			},
			moduleIdentifier: {
				test: TypeAssertion.isString
			},
			dependencyIdentifiers: {
				test: (scoped_value: unknown): scoped_value is Array<string> =>
				{
					return TypeAssertion.isArray(scoped_value, { itemGuard: TypeAssertion.isString });
				}
			},
		}
	);
}

export { isMockingInfos };
