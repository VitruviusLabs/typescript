import type { FailureInterface } from "../interface/failure.interface.mjs";
import type { SuccessInterface } from "../interface/success.interface.mjs";

type ResultType<A> = FailureInterface | SuccessInterface<A>;

export type { ResultType };
