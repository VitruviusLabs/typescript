// eslint-disable-next-line @typescript-eslint/no-shadow -- Native type
import type { MessagePort } from "node:worker_threads";

interface SharedData
{
	port: MessagePort;
}

export type { SharedData };
