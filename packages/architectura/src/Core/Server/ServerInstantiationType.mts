import type { HTTPSServerInstantiationInterface } from "./HTTPSServerInstantiationInterface.mjs";

import type { HTTPServerInstantiationInterface } from "../../definition/interface/http-server-instantiation.interface.mjs";

type ServerInstantiationType = (
    | HTTPServerInstantiationInterface
    | HTTPSServerInstantiationInterface
);

export type { ServerInstantiationType };
