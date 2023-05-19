import type { OldClassConstructor } from "./types/OldClassConstructor.mjs";

// @ts-expect-error: old notation
const OldDummyClass: OldClassConstructor = function OldDummyClass(): void { };

OldDummyClass.Method = function (): void { };

OldDummyClass.AsyncMethod = async function (): Promise<void> { };

OldDummyClass.prototype.method = function (): void { };

OldDummyClass.prototype.asyncMethod = async function (): Promise<void> { };

export { OldDummyClass };
