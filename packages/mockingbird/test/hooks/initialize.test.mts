import { match, fail } from "node:assert";

import { describe, it } from "node:test";

import type { MessagePort } from "node:worker_threads";

import { type SharedData } from "../../src/index.mjs";

import { initialize } from "../../src/hooks/_index.mjs";

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
                const FAKE_PORT: MessagePort = {
                    postMessage: (value: string): void =>
                    {
                        message = value;
                    }
                };

                const SHARED_DATA: SharedData = { port: FAKE_PORT };

                initialize(SHARED_DATA);

                if (message === undefined)
                {
                    fail("Expected a string");
                }

                match(message, /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/);
            }
        );
    }
);
