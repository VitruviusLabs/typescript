import type { BaseServerInstantiationInterface } from "./base-server-instantiation.interface.mjs";

interface HTTPServerInstantiationInterface extends BaseServerInstantiationInterface
{
    https: false;
}

export type { HTTPServerInstantiationInterface };
