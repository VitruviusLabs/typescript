import { fail, match } from "node:assert";
import { describe, it } from "node:test";
import type { MessagePort as NodeMessagePort } from "node:worker_threads";
import { initialize } from "../../src/hook/_index.mjs";
import type { SharedData } from "../../src/definition/interface/shared-data.mjs";

describe(
	"initialize",
	(): void =>
	{
		it(
			"should tell the main thread that the hooks are ready",
			(): void =>
			{
				let message: string | undefined = undefined;

				// @ts-expect-error: Fake port
				const FAKE_PORT: NodeMessagePort = {
					postMessage: (value: string): void =>
					{
						message = value;
					},
				};

				const SHARED_DATA: SharedData = { port: FAKE_PORT };

				initialize(SHARED_DATA);

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Mutated in the hook
				if (message === undefined)
				{
					fail("Expected a string");
				}

				match(message, /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/);
			}
		);
	}
);
