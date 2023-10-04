import type { BaseServerInstantiationInterface } from "./BaseServerInstantiationInterface.mjs";

interface HTTPServerInstantiationInterface extends BaseServerInstantiationInterface {
    https: false;
}

export type { HTTPServerInstantiationInterface };
