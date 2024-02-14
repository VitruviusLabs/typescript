import { fileURLToPath } from "node:url";

import { resolveModuleIdentifier } from "./resolveModuleIdentifier.mjs";

import type { MockingInfos } from "../Type/MockingInfos.mjs";

function convertSource(source: string, infos: MockingInfos): string
{
	let modified_source: string = source;

	modified_source = modified_source.replaceAll(
		/import\s*(?<imported_items>.+?)\s*from\s*['"](?<dependency_identifier>[^'"]+)['"]/g,
		// @ts-expect-error: first parameter is unused
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- first parameter is unused
		(match: string, imported_items: string, dependency_identifier: string): string =>
		{
			let absolute_dependency_identifier: string = resolveModuleIdentifier(dependency_identifier, infos.moduleIdentifier);

			if (!infos.dependencyIdentifiers.includes(absolute_dependency_identifier))
			{
				if (absolute_dependency_identifier.startsWith("file://"))
				{
					absolute_dependency_identifier = fileURLToPath(absolute_dependency_identifier);
				}

				return `import ${imported_items} from "${absolute_dependency_identifier}";`;
			}

			let items: string = imported_items.trim();

			if (items.startsWith("*"))
			{
				items = items.replace(/\*\s*as\s+/, "");
			}
			else if (!items.startsWith("{"))
			{
				items = `{ default: ${items} }`;
			}
			else if (/\bas\b/.test(items))
			{
				items = items.replaceAll(/\s+as\s+/g, ": ");
			}

			return `const ${items} = MockStorage.Get("${infos.token}_${absolute_dependency_identifier}")`;
		}
	);

	const STORAGE_LIB: string = resolveModuleIdentifier("./MockStorage.mjs", import.meta.url);
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
