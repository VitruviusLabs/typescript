import type { MessagePort as NodeMessagePort } from "node:worker_threads";

interface SharedData
{
	port: NodeMessagePort;
}

export type { SharedData };
