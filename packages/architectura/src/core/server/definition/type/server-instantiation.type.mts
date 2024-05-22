import type { HTTPServerInstantiationInterface } from "../interface/http-server-instantiation.interface.mjs";
import type { HTTPSServerInstantiationInterface } from "../interface/https-server-instantiation.interface.mjs";

/** @internal */
type ServerInstantiationType = (
	| HTTPServerInstantiationInterface
	| HTTPSServerInstantiationInterface
);

export type { ServerInstantiationType };
