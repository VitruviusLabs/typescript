import { default as assert } from 'node:assert/strict';

import { describe, it } from 'node:test';

import { Dispatcher } from "../../src/Service/Dispatcher.mjs";

describe(
	"Dispatcher",
	(): void =>
	{
		describe(
			"GetEndpoints",
			(): void =>
			{
				it(
					"should return the ENDPOINTS static property as an empty array when none were registered",
					(): void =>
					{
						// @ts-expect-error - We need to access this private property for test purposes.
						assert.deepStrictEqual(Dispatcher.ENDPOINTS, new Map());
						assert.deepStrictEqual(Dispatcher.GetEndpoints(), new Map());
					}
				);

				it(
					"should return the ENDPOINTS static property when some were registered",
					async (): Promise<void> =>
					{
						await Dispatcher.RegisterEndpoints();

						// @ts-expect-error - We need to access this private property for test purposes.
						assert.deepStrictEqual(Dispatcher.GetEndpoints(), Dispatcher.ENDPOINTS);
					}
				);
			}
		);

		// describe(
		// 	"RegisterEndpoints",
		// 	(): void =>
		// 	{
		// 		it(
		// 			"should call the static method Dispatcher.ParseDirectoryForEndpoints with the appropriate path when called",
		// 			async (): Promise<void> =>
		// 			{
		// 				// @ts-expect-error - This is a private method but we need to access it for test purposes.
		// 				const PARSE_DIRECTORY_FOR_ENDPOINTS_SPY: SinonSpy = spy(Dispatcher, "ParseDirectoryForEndpoints");
		// 				const COMPUTE_ROOT_DIRECTORY_SPY: SinonSpy = spy(FileSystem, "ComputeRootDirectory");

		// 				await Dispatcher.RegisterEndpoints();

		// 				/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions*/
		// 				const EXPECTED_PATH: string = `${await COMPUTE_ROOT_DIRECTORY_SPY.returnValues[0]}/build/Endpoint`;

		// 				expect(PARSE_DIRECTORY_FOR_ENDPOINTS_SPY.calledWithExactly(EXPECTED_PATH)).to.be.true;

		// 				PARSE_DIRECTORY_FOR_ENDPOINTS_SPY.restore();
		// 				COMPUTE_ROOT_DIRECTORY_SPY.restore();
		// 			}
		// 		);
		// 	}
		// );
	}
);
