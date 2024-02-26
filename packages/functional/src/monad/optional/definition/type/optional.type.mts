import type { NothingInterface } from "../interface/nothing.interface.mjs";
import type { SomethingInterface } from "../interface/something.interface.mjs";

type OptionalType<A> = NothingInterface | SomethingInterface<A>;

export type { OptionalType };
