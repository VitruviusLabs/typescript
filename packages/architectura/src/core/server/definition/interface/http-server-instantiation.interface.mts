import type { BaseServerInstantiationInterface } from "./base-server-instantiation.interface.mjs";

/** @internal */
interface HTTPServerInstantiationInterface extends BaseServerInstantiationInterface
{
	https: false;
}

export type { HTTPServerInstantiationInterface };
