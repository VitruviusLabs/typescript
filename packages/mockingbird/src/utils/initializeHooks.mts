
import { register } from "node:module";

// eslint-disable-next-line @typescript-eslint/no-shadow -- Native class
import { MessageChannel } from "node:worker_threads";

import type { SharedData } from "../Type/SharedData.mjs";

let is_ready: boolean = false;

async function initializeHooks(): Promise<void>
{
	if (is_ready)
	{
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- No returned value
	await new Promise<void>(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason native type
		(resolve: () => void, reject: (reason?: any) => void): void =>
		{
			const CHANNEL: MessageChannel = new MessageChannel();

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

			register<SharedData>("../hooks/_index.mjs", {
				parentURL: import.meta.url,
				data: { port: CHANNEL.port2 },
				transferList: [CHANNEL.port2],
			});
		}
	);
}

export { initializeHooks };
