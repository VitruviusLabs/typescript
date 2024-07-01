import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";
import { fileURLToPath } from "node:url";
import { resolveModuleIdentifier } from "./resolve-module-identifier.mjs";

function convertImport(infos: MockingInfos, imported_items: string, dependency_identifier: string): string
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

	let items: string = imported_items;

	if (items.startsWith("*"))
	{
		items = items.replace(/\*\s*as\s+/, "");
	}
	else if (items.startsWith("{"))
	{
		items = items.replaceAll(/\s+as\s+/g, ": ");
	}
	else
	{
		items = `{ default: ${items} }`;
	}

	return `const ${items} = MockStorage.Get("${infos.token}_${absolute_dependency_identifier}")`;
}

export { convertImport };
