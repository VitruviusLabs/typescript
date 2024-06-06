import type { BaseServerInstantiationInterface } from "./base-server-instantiation.interface.mjs";

/** @internal */
interface UnsafeServerInstantiationInterface extends BaseServerInstantiationInterface
{
	https: false;
}

export type { UnsafeServerInstantiationInterface };
