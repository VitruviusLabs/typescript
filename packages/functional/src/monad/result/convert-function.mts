import type { ResultType } from "./_index.mjs";
import { convertPromise } from "./convert-promise.mjs";

function convertFunction<A, B>(callable: (value: A) => B | Error | PromiseLike<B | Error>): (value: A) => Promise<ResultType<B>>
{
	return async (value: A): Promise<ResultType<B>> =>
	{
		const PROMISE: B | Error | PromiseLike<B | Error> = callable(value);

		return await convertPromise(PROMISE);
	};
}

export { convertFunction };
