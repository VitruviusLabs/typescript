import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { ModuleFormat } from "../../src/Type/ModuleFormat.mjs";

import { resolve } from "../../src/hooks/_index.mjs";

import { prefix } from "../../src/utils/prefix.mjs";

import { deepFreeze } from "../common/deepFreeze.mjs";

import type { ResolveContext } from "../../src/Type/ResolveContext.mjs";

import type { ResolveResult } from "../../src/Type/ResolveResult.mjs";

describe(
	"resolve",
	(): void =>
	{
		it(
			"should ignore node modules",
			(): void =>
			{
				const CONTEXT: ResolveContext = {
					conditions: [],
					importAssertion: {},
					parentUrl: undefined,
				};

				deepFreeze(CONTEXT);

				const RESULT: unknown = resolve(
					"node:crypto",
					CONTEXT,
					(module_identifier: string, context: ResolveContext): ResolveResult =>
					{
						if (module_identifier !== "node:crypto")
						{
							return {
								shortCircuit: false,
								url: "altered module identifier",
								format: ModuleFormat.BUILT_IN
							};
						}

						if (context !== CONTEXT)
						{
							return {
								shortCircuit: false,
								url: "altered context",
								format: ModuleFormat.BUILT_IN
							};
						}

						return {
							shortCircuit: false,
							url: "pristine result",
							format: ModuleFormat.BUILT_IN
						};
					}
				);

				deepStrictEqual(RESULT, {
					shortCircuit: false,
					url: "pristine result",
					format: ModuleFormat.BUILT_IN
				});
			}
		);

		it(
			"should ignore file modules",
			(): void =>
			{
				const CONTEXT: ResolveContext = {
					conditions: [],
					importAssertion: {},
					parentUrl: undefined,
				};

				deepFreeze(CONTEXT);

				const RESULT: unknown = resolve(
					"./dummy.mjs",
					CONTEXT,
					(module_identifier: string, context: ResolveContext): ResolveResult =>
					{
						if (module_identifier !== "./dummy.mjs")
						{
							return {
								shortCircuit: false,
								url: "altered module identifier",
								format: ModuleFormat.BUILT_IN
							};
						}

						if (context !== CONTEXT)
						{
							return {
								shortCircuit: false,
								url: "altered context",
								format: ModuleFormat.BUILT_IN
							};
						}

						return {
							shortCircuit: false,
							url: "pristine result",
							format: ModuleFormat.BUILT_IN
						};
					}
				);

				deepStrictEqual(RESULT, {
					shortCircuit: false,
					url: "pristine result",
					format: ModuleFormat.BUILT_IN
				});
			}
		);

		it(
			"should short-circuit mocked modules",
			(): void =>
			{
				const CONTEXT: ResolveContext = {
					conditions: [],
					importAssertion: {},
					parentUrl: undefined,
				};

				const MODULE_IDENTIFIER: string = `${prefix}dummy`;

				const RESULT: unknown = resolve(
					MODULE_IDENTIFIER,
					CONTEXT,
					(): ResolveResult =>
					{
						return {
							shortCircuit: false,
							url: "should never be",
							format: ModuleFormat.BUILT_IN
						};
					}
				);

				deepStrictEqual(RESULT, {
					shortCircuit: true,
					url: MODULE_IDENTIFIER,
					format: ModuleFormat.MODULE
				});
			}
		);
	}
);
