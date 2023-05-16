import { readFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";

import { ModuleFormat } from "./Type/ModuleFormat.js";

import { buildCause } from "./Utils/buildCause.js";

import { isMockingInfos } from "./Utils/isMockingInfos.js";

import { resolveModuleIdentifier } from "./Utils/resolveModuleIdentifier.js";

import { prefix } from "./prefix.js";

import type { LoadContext } from "./Type/LoadContext.js";

import type { LoadResult } from "./Type/LoadResult.js";

import type { MockingInfos } from "./Type/MockingInfos.js";

import type { NextLoad } from "./Type/NextLoad.js";

import type { NextResolve } from "./Type/NextResolve.js";

import type { ResolveContext } from "./Type/ResolveContext.js";

import type { ResolveResult } from "./Type/ResolveResult.js";

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

function extractInfos(module_identifier: string): MockingInfos
{
	const INFOS: unknown = JSON.parse(Buffer.from(module_identifier.slice(prefix.length), "base64").toString("utf-8"));

	if (isMockingInfos(INFOS))
	{
		return INFOS;
	}

	throw new Error("Invalid mocking infos");
}

async function load(module_identifier: string, context: LoadContext, next_load: NextLoad): Promise<LoadResult>
{
	if (!module_identifier.startsWith(prefix))
	{
		return await next_load(module_identifier, context);
	}

	const INFOS: MockingInfos = extractInfos(module_identifier);

	let source: string = "";

	try
	{
		source = (await readFile(fileURLToPath(INFOS.moduleIdentifier))).toString("utf-8");
	}
	catch (error: unknown)
	{
		throw new Error(`Unable to retrieve module ${INFOS.moduleIdentifier}`, buildCause(error));
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

			return `const ${items} = getMockedModule("${INFOS.token}_${absolute_dependency_identifier}")`;
		}
	);

	const STORAGE_LIB: string = resolveModuleIdentifier("./mockStorage.mjs", import.meta.url);
	const MOCK_HEADER: string = `import { getMockedModule, removeMockedModule } from "${STORAGE_LIB}";`;
	const MOCK_CLEAN_UP: Array<string> = INFOS.dependencyIdentifiers.map(
		(absolute_dependency_identifier: string): string =>
		{
			return `removeMockedModule("${INFOS.token}_${absolute_dependency_identifier}");`;
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
