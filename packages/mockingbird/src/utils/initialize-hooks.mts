// Stryker disable all: This file is pure side effect
import { register } from "node:module";
import { MessageChannel as NodeMessageChannel } from "node:worker_threads";
import type { SharedData } from "../definition/interface/shared-data.mjs";

let is_ready: boolean = false;

async function initializeHooks(): Promise<void>
{
	if (is_ready)
	{
		return;
	}

	// eslint-disable-next-line @ts/no-invalid-void-type -- No returned value
	await new Promise<void>(
		// eslint-disable-next-line @ts/no-explicit-any -- reason native type
		(resolve: () => void, reject: (reason?: any) => void): void =>
		{
			const CHANNEL: NodeMessageChannel = new NodeMessageChannel();

			CHANNEL.port1.on(
				"message",
				(): void =>
				{
					is_ready = true;
					resolve();
				}
			);

			CHANNEL.port1.on(
				"messageerror",
				(): void =>
				{
					reject(new Error("Message error"));
				}
			);

			CHANNEL.port1.on(
				"error",
				(): void =>
				{
					reject(new Error("Error"));
				}
			);

			register<SharedData>("../hook/_index.mjs", {
				parentURL: import.meta.url,
				data: { port: CHANNEL.port2 },
				transferList: [CHANNEL.port2],
			});
		}
	);
}

export { initializeHooks };
// Stryker enable all
