import type { MockedDependency } from "../definition/interface/mocked-dependency.mjs";
import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";
import { randomUUID } from "node:crypto";
import { MockStorage } from "./mock-storage.mjs";
import { isMockedDependency } from "./is-mocked-dependency.mjs";
import { isMockingInfos } from "./is-mocking-infos.mjs";
import { resolveModuleIdentifier } from "./resolve-module-identifier.mjs";

interface ConvertTextOptions
{
	from: BufferEncoding;
	to: BufferEncoding;
}

function convertText(data: string, options: ConvertTextOptions): string
{
	return Buffer.from(data, options.from).toString(options.to);
}

function encodeInfos(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): string
{
	const TOKEN: string = randomUUID();
	const ABSOLUTE_MODULE_IDENTIFIER: string = resolveModuleIdentifier(module_identifier, meta_url);
	const DEPENDENCY_IDENTIFIERS: Array<string> = [];

	Object.keys(mocks).forEach(
		(dependency_identifier: string): void =>
		{
			const ABSOLUTE_DEPENDENCY_IDENTIFIER: string = resolveModuleIdentifier(dependency_identifier, ABSOLUTE_MODULE_IDENTIFIER);
			const MOCKED_DEPENDENCY: unknown = mocks[dependency_identifier];

			isMockedDependency(MOCKED_DEPENDENCY, dependency_identifier);

			MockStorage.Set(`${TOKEN}_${ABSOLUTE_DEPENDENCY_IDENTIFIER}`, MOCKED_DEPENDENCY);
			DEPENDENCY_IDENTIFIERS.push(ABSOLUTE_DEPENDENCY_IDENTIFIER);
		}
	);

	const INFOS: MockingInfos = {
		token: TOKEN,
		moduleIdentifier: ABSOLUTE_MODULE_IDENTIFIER,
		dependencyIdentifiers: DEPENDENCY_IDENTIFIERS,
	};

	const JSON_ENCODED: string = JSON.stringify(INFOS);

	return convertText(JSON_ENCODED, { from: "utf-8", to: "base64" });
}

function decodeInfos(data: string): MockingInfos
{
	const JSON_ENCODED: string = convertText(data, { from: "base64", to: "utf-8" });

	const INFOS: unknown = JSON.parse(JSON_ENCODED);

	isMockingInfos(INFOS);

	return INFOS;
}

export { decodeInfos, encodeInfos };
