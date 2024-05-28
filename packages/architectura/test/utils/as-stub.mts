import type { SinonStub } from "sinon";

function asStub<A extends ReadonlyArray<unknown>, R>(value: (...args: A) => R): SinonStub
{
	// @ts-expect-error: Avoid type errors
	return value;
}

export { asStub };
