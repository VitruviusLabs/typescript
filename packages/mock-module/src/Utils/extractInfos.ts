import { isMockingInfos } from "./isMockingInfos.js";

import type { MockingInfos } from "../Type/MockingInfos.js";

function extractInfos(data: string): MockingInfos
{
	const INFOS: unknown = JSON.stringify(Buffer.from(data, "base64").toString("utf-8"));

	isMockingInfos(INFOS);

	return INFOS;
}

export { extractInfos };
