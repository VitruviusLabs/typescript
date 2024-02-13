
// import { describe, it } from "node:test";

// import { ExecutionContext } from "../../src/Core/ExecutionContext.mjs";

// import { Kernel } from "../../src/Core/Kernel.mjs";

// import type { ExecutionContextInstantiationInterface } from "../../src/Core/ExecutionContext/ExecutionContextInstantiationInterface.mjs";


// describe(
// 	"ExecutionContext",
// 	(): void =>
// 	{
// 		describe(
// 			"Create",
// 			(): void =>
// 			{
// 				it(
// 					"should return an instance of ExecutionContext when called with a correct object",
// 					(): void =>
// 					{
// 						const INSTANTIATION_OBJECT: ExecutionContextInstantiationInterface = {
// 							request: mockExpressRequest(),
// 							response: mockExpressResponse()
// 						};

// 						const INSTANCE: ExecutionContext = ExecutionContext.Create(INSTANTIATION_OBJECT);

// 						expect(INSTANCE).to.be.instanceOf(ExecutionContext);
// 					}
// 				);
// 			}
// 		);

// 		describe(
// 			"GetRequest",
// 			(): void =>
// 			{
// 				it(
// 					"should return undefined when the ExecutionContext is undefined in Kernel",
// 					(): void =>
// 					{
// 						const REQUEST: Request|undefined = ExecutionContext.GetRequest();

// 						expect(REQUEST).to.be.undefined;
// 					}
// 				);

// 				it(
// 					"should return the current request when the ExecutionContext is defined in Kernel",
// 					(): void =>
// 					{
// 						const MOCKED_REQUEST: Request = mockExpressRequest();
// 						const INSTANTIATION_OBJECT: ExecutionContextInstantiationInterface = {
// 							request: MOCKED_REQUEST,
// 							response: mockExpressResponse()
// 						};

// 						const EXECUTION_CONTEXT: ExecutionContext = ExecutionContext.Create(INSTANTIATION_OBJECT);

// 						Kernel.GetContextAccessor().run(
// 							EXECUTION_CONTEXT,
// 							(): void =>
// 							{
// 								const REQUEST: Request|undefined = ExecutionContext.GetRequest();

// 								expect(REQUEST).to.deep.equal(MOCKED_REQUEST);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);

// 		describe(
// 			"GetResponse",
// 			(): void =>
// 			{
// 				it(
// 					"should return undefined when the ExecutionContext is undefined in Kernel",
// 					(): void =>
// 					{
// 						const RESPONSE: Response|undefined = ExecutionContext.GetResponse();

// 						expect(RESPONSE).to.be.undefined;
// 					}
// 				);

// 				it(
// 					"should return the current request when the ExecutionContext is defined in Kernel",
// 					(): void =>
// 					{
// 						const MOCKED_RESPONSE: Response = mockExpressResponse();
// 						const INSTANTIATION_OBJECT: ExecutionContextInstantiationInterface = {
// 							request: mockExpressRequest(),
// 							response: MOCKED_RESPONSE
// 						};

// 						const EXECUTION_CONTEXT: ExecutionContext = ExecutionContext.Create(INSTANTIATION_OBJECT);

// 						Kernel.GetContextAccessor().run(
// 							EXECUTION_CONTEXT,
// 							(): void =>
// 							{
// 								const RESPONSE: Response|undefined = ExecutionContext.GetResponse();

// 								expect(RESPONSE).to.deep.equal(MOCKED_RESPONSE);
// 							}
// 						);
// 					}
// 				);
// 			}
// 		);

// 		describe(
// 			"getRequest",
// 			(): void =>
// 			{
// 				it(
// 					"should return the request property when called",
// 					(): void =>
// 					{
// 						const MOCKED_REQUEST: Request = mockExpressRequest();
// 						const INSTANTIATION_OBJECT: ExecutionContextInstantiationInterface = {
// 							request: MOCKED_REQUEST,
// 							response: mockExpressResponse()
// 						};

// 						const INSTANCE: ExecutionContext = ExecutionContext.Create(INSTANTIATION_OBJECT);

// 						expect(INSTANCE.getRequest()).to.deep.equal(MOCKED_REQUEST);
// 					}
// 				);
// 			}
// 		);

// 		describe(
// 			"getResponse",
// 			(): void =>
// 			{
// 				it(
// 					"should return the request property when called",
// 					(): void =>
// 					{
// 						const MOCKED_RESPONSE: Response = mockExpressResponse();
// 						const INSTANTIATION_OBJECT: ExecutionContextInstantiationInterface = {
// 							request: mockExpressRequest(),
// 							response: MOCKED_RESPONSE
// 						};

// 						const INSTANCE: ExecutionContext = ExecutionContext.Create(INSTANTIATION_OBJECT);

// 						expect(INSTANCE.getResponse()).to.deep.equal(MOCKED_RESPONSE);
// 					}
// 				);
// 			}
// 		);
// 	}
// );
