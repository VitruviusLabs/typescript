import { convertImport } from "./convertImport.mjs";

import { resolveModuleIdentifier } from "./resolveModuleIdentifier.mjs";

import type { MockingInfos } from "../Type/MockingInfos.mjs";

function convertSource(source: string, infos: MockingInfos): string
{
	let modified_source: string = source;

	// const IMPORT_REGEXP: RegExp = /import\s*(?<imported_items>.+?)\s*from\s*['"](?<dependency_identifier>[^'"]+)['"]/g,
	// eslint-disable-next-line prefer-named-capture-group -- Bug in Stryker with underscore in capture group name
	const IMPORT_REGEXP: RegExp = /import\s*(.+?)\s*from\s*['"]([^'"]+)['"]/g;

	modified_source = modified_source.replaceAll(
		IMPORT_REGEXP,
		/* eslint-disable @typescript-eslint/no-unused-vars -- first parameter is unused */
		// @ts-ignore: first parameter is unused
		(match: string, imported_items: string, dependency_identifier: string): string =>
		{
			return convertImport(infos, imported_items, dependency_identifier);
		}
		/* eslint-enable @typescript-eslint/no-unused-vars -- first parameter is unused */
	);

	const STORAGE_LIB: string = resolveModuleIdentifier("./MockStorage.mjs", import.meta.url);
	const MOCK_HEADER: string = `import { MockStorage } from "${STORAGE_LIB}";`;
	const MOCK_CLEAN_UP: Array<string> = infos.dependencyIdentifiers.map(
		(absolute_dependency_identifier: string): string =>
		{
			return `MockStorage.Remove("${infos.token}_${absolute_dependency_identifier}");`;
		}
	);

	modified_source = `${MOCK_HEADER}\n\n${modified_source}\n${MOCK_CLEAN_UP.join("")}\n`;

	return modified_source;
}

export { convertSource };
