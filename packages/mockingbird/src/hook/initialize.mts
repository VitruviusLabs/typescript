import { randomUUID } from "node:crypto";
import type { SharedData } from "../definition/interface/shared-data.mjs";

function initialize(shared_data: SharedData): void
{
	shared_data.port.postMessage(randomUUID());
}

export { initialize };
