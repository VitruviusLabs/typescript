import type { HTTPServerInstantiationInterface } from "../../definition/interface/http-server-instantiation.interface.mjs";

import type { HTTPSServerInstantiationInterface } from "../../definition/interface/https-server-instantiation.interface.mjs";


type ServerInstantiationType = (
    | HTTPServerInstantiationInterface
    | HTTPSServerInstantiationInterface
);

export type { ServerInstantiationType };
