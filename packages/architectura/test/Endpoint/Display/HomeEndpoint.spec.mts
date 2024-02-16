// import { describe, it } from 'node:test';
// import { default as assert } from 'node:assert/strict'

// import { ExecutionContext } from "../../../src/Core/ExecutionContext.mjs";

// import { Kernel } from "../../../src/Core/Kernel.mjs";

// import { HomeEndpoint } from "../../../src/Endpoint/Display/HomeEndpoint.mjs";

// describe(
// 	"HomeEndpoint",
// 	(): void =>
// 	{
// 		describe(
// 			"Execute",
// 			(): void =>
// 			{
// 				it(
// 					"should the send appropriate response when called inside an async hook",
// 					async (): Promise<void> =>
// 					{
// 						const FAKE_SEND: SinonSpy = fake();
// 						const EXECUTION_CONTEXT: ExecutionContext = ExecutionContext.Create(
// 							{
// 								request: mockExpressRequest(),
// 								response: {
// 									...mockExpressResponse(),
// 									send: FAKE_SEND
// 								} as unknown as Response
// 							}
// 						);

// 						await Kernel.GetContextAccessor().run(
// 							EXECUTION_CONTEXT,
// 							HomeEndpoint.Execute.bind(HomeEndpoint)
// 						);

// 					}
// 				);

// 				it(
// 					"should not be able to send a response when called outside of an async hook",
// 					async (): Promise<void> =>
// 					{
// 						const GET_RESPONSE_SPY: SinonSpy = spy(ExecutionContext, "GetResponse");

// 						await HomeEndpoint.Execute();

// 						expect(GET_RESPONSE_SPY.returned(undefined)).to.be.true;
// 						GET_RESPONSE_SPY.restore();
// 					}
// 				);
// 			}
// 		);
// 	}
// );
