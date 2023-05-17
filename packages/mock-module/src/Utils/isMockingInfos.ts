import { TypeAssertion, TypeGuard } from "@vitruvius-lab/ts-predicate";

import type { MockingInfos } from "../Type/MockingInfos.js";

function isMockingInfos(value: unknown): asserts value is MockingInfos
{
	TypeAssertion.isStructuredData<MockingInfos>(
		value,
		{
			token: {
				test: TypeGuard.isString
			},
			moduleIdentifier: {
				test: TypeGuard.isString
			},
			dependencyIdentifiers: {
				test: (scoped_value: unknown): scoped_value is Array<string> =>
				{
					return TypeGuard.isArray(scoped_value, { itemGuard: TypeGuard.isString });
				}
			},
		}
	);
}

export { isMockingInfos };
