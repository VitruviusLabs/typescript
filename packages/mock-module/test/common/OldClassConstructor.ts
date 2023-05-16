import type { OldClassInstance } from "./OldClassInstance.js";

interface OldClassConstructor
{
	// eslint-disable-next-line @typescript-eslint/naming-convention -- Dummy
	Method: () => void;

	// eslint-disable-next-line @typescript-eslint/naming-convention -- Dummy
	AsyncMethod: () => Promise<void>;
	new(): OldClassInstance;
}

export type { OldClassConstructor };
