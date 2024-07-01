import type { SharedData } from "../definition/interface/shared-data.mjs";
import { randomUUID } from "node:crypto";

function initialize(shared_data: SharedData): void
{
	shared_data.port.postMessage(randomUUID());
}

export { initialize };
