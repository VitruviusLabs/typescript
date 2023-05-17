import type { OldClassInstance } from "./OldClassInstance.mjs";

interface OldClassConstructor
{
	Method: () => void;
	AsyncMethod: () => Promise<void>;
	new(): OldClassInstance;
}

export type { OldClassConstructor };
