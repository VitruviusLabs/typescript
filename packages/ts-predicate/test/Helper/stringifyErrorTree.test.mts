import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper, type NormalizedError } from "../../src/index.mjs";

// See error-output.txt
const EXPECTED_RESULT: string = `root error
├─── error 1
│    ├─── error 1-1
│    │    ├─── error 1-1-1
│    │    └─── error 1-1-2
│    └─── error 1-2
├─── error 2
│    └─── error 2-1
│         ├─── error 2-1-1
│         └─── error 2-1-2
└─── error 3
     ├─── error 3-1
     │    └─── error 3-1-1
     │         └─── error 3-1-1-1
     └─── error 3-2
`;

describe(
	"Helper.stringifyError",
	(): void =>
	{
		it(
			"should generate a string representing the provided normalized tree structure",
			(): void =>
			{
				const STRUCTURE: NormalizedError = {
					message: "root error",
					causes: [
						{
							message: "error 1",
							causes: [
								{
									message: "error 1-1",
									causes: [
										{
											message: "error 1-1-1",
											causes: []
										},
										{
											message: "error 1-1-2",
											causes: []
										}
									]
								},
								{
									message: "error 1-2",
									causes: []
								}
							]
						},
						{
							message: "error 2",
							causes: [
								{
									message: "error 2-1",
									causes: [
										{
											message: "error 2-1-1",
											causes: []
										},
										{
											message: "error 2-1-2",
											causes: []
										}
									]
								}
							]
						},
						{
							message: "error 3",
							causes: [
								{
									message: "error 3-1",
									causes: [
										{
											message: "error 3-1-1",
											causes: [
												{
													message: "error 3-1-1-1",
													causes: []
												}
											]
										}
									]
								},
								{
									message: "error 3-2",
									causes: []
								}
							]
						}
					],
				};

				const RESULT: unknown = Helper.stringifyErrorTree(STRUCTURE);

				strictEqual(RESULT, EXPECTED_RESULT);
			}
		);

		it(
			"should generate a string representing the error tree structure of the provided Error",
			(): void =>
			{
				const ERROR: Error = new AggregateError(
					[
						new AggregateError(
							[
								new AggregateError(
									[
										new Error("error 1-1-1"),
										new Error("error 1-1-2"),
									],
									"error 1-1"
								),
								new Error("error 1-2")
							],
							"error 1"
						),
						new Error(
							"error 2",
							{
								cause: new AggregateError(
									[
										new Error("error 2-1-1"),
										new Error("error 2-1-2"),
									],
									"error 2-1"
								)
							}
						),
						new AggregateError(
							[
								new Error(
									"error 3-1",
									{
										cause: new Error(
											"error 3-1-1",
											{
												cause: new Error("error 3-1-1-1")
											}
										)
									}
								),
								new Error("error 3-2"),
							],
							"error 3"
						),
					],
					"root error"
				);

				const RESULT: unknown = Helper.stringifyErrorTree(ERROR);

				strictEqual(RESULT, EXPECTED_RESULT);
			}
		);
	}
);
