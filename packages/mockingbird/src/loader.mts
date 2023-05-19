import { readFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";

import { ModuleFormat } from "./Type/ModuleFormat.mjs";

import { prefix } from "./prefix.mjs";

import { decodeInfos } from "./utils/MockingInfos.mjs";

import { buildCause } from "./utils/buildCause.mjs";

import { resolveModuleIdentifier } from "./utils/resolveModuleIdentifier.mjs";

import type { LoadContext } from "./Type/LoadContext.mjs";

import type { LoadResult } from "./Type/LoadResult.mjs";

import type { MockingInfos } from "./Type/MockingInfos.mjs";

import type { NextLoad } from "./Type/NextLoad.mjs";

import type { NextResolve } from "./Type/NextResolve.mjs";

import type { ResolveContext } from "./Type/ResolveContext.mjs";

import type { ResolveResult } from "./Type/ResolveResult.mjs";

function resolve(module_identifier: string, context: ResolveContext, next_resolve: NextResolve): ResolveResult
{
	if (module_identifier.startsWith(prefix))
	{
		return {
			shortCircuit: true,
			url: module_identifier,
			format: ModuleFormat.MODULE,
		};
	}

	return next_resolve(module_identifier, context);
}

async function load(module_identifier: string, context: LoadContext, next_load: NextLoad): Promise<LoadResult>
{
	if (!module_identifier.startsWith(prefix))
	{
		return await next_load(module_identifier, context);
	}

	const INFOS: MockingInfos = decodeInfos(module_identifier);

	let source: string | undefined = undefined;

	try
	{
		source = (await readFile(fileURLToPath(INFOS.moduleIdentifier))).toString("utf-8");
	}
	catch (error: unknown)
	{
		throw new Error(`Unable to retrieve module ${INFOS.moduleIdentifier}.`, buildCause(error));
	}

	source = source.replaceAll(
		/import\s*(?<imported_items>.+?)\s*from\s*['"](?<dependency_identifier>[^'"]+)['"]/g,
		// @ts-expect-error: first parameter is unused
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- first parameter is unused
		(match: string, imported_items: string, dependency_identifier: string): string =>
		{
			let absolute_dependency_identifier: string = resolveModuleIdentifier(dependency_identifier, INFOS.moduleIdentifier);

			if (!INFOS.dependencyIdentifiers.includes(absolute_dependency_identifier))
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

			return `const ${items} = MockStorage.Get("${INFOS.token}_${absolute_dependency_identifier}")`;
		}
	);

	const STORAGE_LIB: string = resolveModuleIdentifier("./utils/MockStorage.mjs", import.meta.url);
	const MOCK_HEADER: string = `import { MockStorage } from "${STORAGE_LIB}";`;
	const MOCK_CLEAN_UP: Array<string> = INFOS.dependencyIdentifiers.map(
		(absolute_dependency_identifier: string): string =>
		{
			return `MockStorage.Remove("${INFOS.token}_${absolute_dependency_identifier}");`;
		}
	);

	source = `${MOCK_HEADER}\n\n${source}\n${MOCK_CLEAN_UP.join("\n")}\n`;

	return {
		shortCircuit: true,
		format: ModuleFormat.MODULE,
		source: source,
	};
}

export { load, resolve };
