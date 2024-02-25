import { TypeAssertion } from "@vitruvius-labs/ts-predicate";
import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";

function isMockingInfos(value: unknown): asserts value is MockingInfos
{
	TypeAssertion.isStructuredData<MockingInfos>(
		value,
		{
			token: {
				test: TypeAssertion.isString,
			},
			moduleIdentifier: {
				test: TypeAssertion.isString,
			},
			dependencyIdentifiers: {
				test: (scoped_value: unknown): asserts scoped_value is Array<string> =>
				{
					TypeAssertion.isArray(scoped_value, { itemTest: TypeAssertion.isString });
				},
			},
		}
	);
}

export { isMockingInfos };
