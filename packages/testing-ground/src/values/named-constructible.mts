import type { OldClassConstructor } from "../definition/interface/old-class-constructor.mjs";

/* eslint-disable @typescript/no-empty-function,func-names -- Test dummy */

// @ts-expect-error: old notation
// eslint-disable-next-line func-style -- old notation
const NamedConstructible: OldClassConstructor = function NamedConstructible(): void {};

NamedConstructible.AsyncMethod = async function AsyncMethod(): Promise<void> {};

NamedConstructible.Method = function Method(): void {};

NamedConstructible.prototype.asyncMethod = async function asyncMethod(): Promise<void> {};

NamedConstructible.prototype.method = function method(): void {};

/* eslint-enable @typescript/no-empty-function,func-names -- Test dummy */

export { NamedConstructible };
