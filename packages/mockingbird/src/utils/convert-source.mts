import { convertImport } from "./convert-import.mjs";
import { resolveModuleIdentifier } from "./resolve-module-identifier.mjs";
import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";

function convertSource(source: string, infos: MockingInfos): string
{
	let modified_source: string = source;

	const IMPORT_REGEXP: RegExp = /import\s*(?<imported_items>.+?)\s*from\s*['"](?<dependency_identifier>[^'"]+)['"]/g;

	modified_source = modified_source.replaceAll(
		IMPORT_REGEXP,
		// @ts-expect-error: first parameter is unused
		(match: string, imported_items: string, dependency_identifier: string): string =>
		{
			return convertImport(infos, imported_items, dependency_identifier);
		}
	);

	const STORAGE_LIB: string = resolveModuleIdentifier("./mock-storage.mjs", import.meta.url);
	const MOCK_HEADER: string = `import { MockStorage } from "${STORAGE_LIB}";`;
	const MOCK_CLEAN_UP: Array<string> = infos.dependencyIdentifiers.map(
		(absolute_dependency_identifier: string): string =>
		{
			return `MockStorage.Remove("${infos.token}_${absolute_dependency_identifier}");`;
		}
	);

	modified_source = `${MOCK_HEADER}\n\n${modified_source}\n${MOCK_CLEAN_UP.join("\n")}\n`;

	return modified_source;
}

export { convertSource };
