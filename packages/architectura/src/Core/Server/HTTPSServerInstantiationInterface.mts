import type { BaseServerInstantiationInterface } from "./BaseServerInstantiationInterface.mjs";

interface HTTPSServerInstantiationInterface extends BaseServerInstantiationInterface
{
    https: true;
    certificate: Buffer|string;
    key: Buffer|string;
}

export type { HTTPSServerInstantiationInterface };
