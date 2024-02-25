import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { ModuleFormat } from "../definition/enum/module-format.mjs";
import { decodeInfos } from "../utils/mocking-infos.mjs";
import { buildCause } from "../utils/build-cause.mjs";
import { convertSource } from "../utils/convert-source.mjs";
import { prefix } from "../utils/prefix.mjs";
import type { LoadContext } from "../definition/interface/load-context.mjs";
import type { LoadResult } from "../definition/interface/load-result.mjs";
import type { MockingInfos } from "../definition/interface/mocking-infos.mjs";
import type { NextLoad } from "../definition/type/next-load.mjs";

async function load(module_identifier: string, context: LoadContext, next_load: NextLoad): Promise<LoadResult>
{
	if (!module_identifier.startsWith(prefix))
	{
		return await next_load(module_identifier, context);
	}

	const INFOS: MockingInfos = decodeInfos(module_identifier.slice(prefix.length));

	let source: string | undefined = undefined;

	try
	{
		source = (await readFile(fileURLToPath(INFOS.moduleIdentifier))).toString("utf-8");
	}
	catch (error: unknown)
	{
		throw new Error(`Unable to retrieve module ${INFOS.moduleIdentifier}.`, buildCause(error));
	}

	source = convertSource(source, INFOS);

	return {
		shortCircuit: true,
		format: ModuleFormat.MODULE,
		source: source,
	};
}

export { load };
