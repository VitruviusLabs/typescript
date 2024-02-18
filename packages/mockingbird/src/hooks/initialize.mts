import { randomUUID } from "node:crypto";

import type { SharedData } from "../Type/SharedData.mjs";

function initialize(shared_data: SharedData): void
{
    shared_data.port.postMessage(randomUUID());
}

export { initialize };
