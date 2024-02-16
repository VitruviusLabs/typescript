import type { HTTPSServerInstantiationInterface } from "./HTTPSServerInstantiationInterface.mjs";

import type { HTTPServerInstantiationInterface } from "./HTTPServerInstantiationInterface.mjs";

type ServerInstantiationType = (
    | HTTPServerInstantiationInterface
    | HTTPSServerInstantiationInterface
);

export type { ServerInstantiationType };
