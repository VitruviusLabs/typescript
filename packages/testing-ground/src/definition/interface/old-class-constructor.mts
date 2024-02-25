import type { OldClassInstance } from "./old-class-instance.mjs";

interface OldClassConstructor
{
	AsyncMethod: () => Promise<void>;
	Method: () => void;
	prototype: OldClassInstance;
	new(): OldClassInstance;
}

export type { OldClassConstructor };
