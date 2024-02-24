import type { HTTPSServerInstantiationInterface } from "./https-server-instantiation.interface.mjs";

import type { HTTPServerInstantiationInterface } from "../../definition/interface/http-server-instantiation.interface.mjs";

type ServerInstantiationType = (
    | HTTPServerInstantiationInterface
    | HTTPSServerInstantiationInterface
);

export type { ServerInstantiationType };
