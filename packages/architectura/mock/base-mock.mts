import type { SinonStub } from "sinon";
import type { BaseMockInterface } from "./definition/interface/base-mock.interface.mjs";

function baseMock<T extends BaseMockInterface<object>>(mock: Omit<T, "callThroughAllStubs" | "reflect" | "resetAllStubs" | "restoreAllStubs">): T
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
