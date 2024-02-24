import type { BaseServerInstantiationInterface } from "../../definition/interface/base-server-instantiation.interface.mjs";

interface HTTPServerInstantiationInterface extends BaseServerInstantiationInterface
{
    https: false;
}

export type { HTTPServerInstantiationInterface };
