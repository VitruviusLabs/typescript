import { TypeAssertion, TypeGuard } from "@vitruvius-lab/ts-predicate";

import type { MockingInfos } from "../Type/MockingInfos.mjs";

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
				test: (scoped_value: unknown): asserts scoped_value is Array<string> =>
				{
					TypeAssertion.isArray(scoped_value, { itemGuard: TypeGuard.isString });
				}
			},
		}
	);
}

export { isMockingInfos };
