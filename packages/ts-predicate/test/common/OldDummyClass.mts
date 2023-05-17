import type { OldClassConstructor } from "./OldClassConstructor.mjs";

// @ts-expect-error: old notation
// eslint-disable-next-line func-style, func-names, @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-empty-function -- Dummy
const OldDummyClass: OldClassConstructor = function OldDummyClass() { };

// eslint-disable-next-line @typescript-eslint/no-empty-function -- Dummy
OldDummyClass.Method = function (): void { };

// eslint-disable-next-line @typescript-eslint/no-empty-function -- Dummy
OldDummyClass.AsyncMethod = async function (): Promise<void> { };

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-empty-function -- Dummy
OldDummyClass.prototype.method = function (): void { };

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-empty-function -- Dummy
OldDummyClass.prototype.asyncMethod = async function (): Promise<void> { };

export { OldDummyClass };
