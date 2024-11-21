import type { SinonStub } from "sinon";

interface BaseMockInterface<T extends object, ExcludedStubs = never>
{
	instance: T;
	/**
	 * List all public methods for stubbing
	 *
	 * @remarks
	 * By default, all stubs are called through
	 *
	 * Add private/static methods stubs to your definition by doing:
	 * ```ts
	 * stubs: BaseMockInterface<MyType>["stubs"] & {
	 *     StaticMethod: SinonStub;
	 *     privateMethod: SinonStub;
	 * };
	 * ```
	 */
	stubs: {
		// eslint-disable-next-line @ts/no-unsafe-function-type -- Generic type
		[K in keyof T as (T[K] extends Function ? (K extends ExcludedStubs ? never : K) : never)]: SinonStub;
	};
	resetAllStubs: () => void;
	restoreAllStubs: () => void;
	callThroughAllStubs: () => void;
}

export type { BaseMockInterface };
