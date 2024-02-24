import type { BaseServerInstantiationInterface } from "../../definition/interface/base-server-instantiation.interface.mjs";

interface HTTPSServerInstantiationInterface extends BaseServerInstantiationInterface
{
    https: true;
    certificate: Buffer | string;
    key: Buffer | string;
}

export type { HTTPSServerInstantiationInterface };
