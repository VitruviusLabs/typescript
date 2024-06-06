import type { SinonStub } from "sinon";
import type { BaseMockInterface } from "./definition/interface/base-mock.interface.mjs";

/**
 * Add generic methods to a mock object.
 */
function baseMock<T extends BaseMockInterface<object>>(mock: Omit<T, "callThroughAllStubs" | "resetAllStubs" | "restoreAllStubs">): T
{
	// @ts-expect-error: Meta-programming
	return {
		resetAllStubs: (): void =>
		{
			Object.values(mock.stubs).forEach(
				(stub: SinonStub): void =>
				{
					stub.reset();
				}
			);
		},
		restoreAllStubs: (): void =>
		{
			Object.values(mock.stubs).forEach(
				(stub: SinonStub): void =>
				{
					stub.restore();
				}
			);
		},
		callThroughAllStubs: (): void =>
		{
			Object.values(mock.stubs).forEach(
				(stub: SinonStub): void =>
				{
					stub.callThrough();
				}
			);
		},
		...mock,
	};
}

export { baseMock };
