import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";
import { assertArray, assertString, assertStructuredData } from "@vitruvius-labs/ts-predicate";

function isMockingInfos(value: unknown): asserts value is MockingInfos
{
	assertStructuredData<MockingInfos>(
		value,
		{
			token: {
				test: assertString,
			},
			moduleIdentifier: {
				test: assertString,
			},
			dependencyIdentifiers: {
				test: (scoped_value: unknown): asserts scoped_value is Array<string> =>
				{
					assertArray(scoped_value, { itemTest: assertString });
				},
			},
		}
	);
}

export { isMockingInfos };
