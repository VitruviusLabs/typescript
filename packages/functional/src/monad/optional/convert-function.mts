import { convertPromise } from "./convert-promise.mjs";
import type { OptionalType } from "./definition/_index.mjs";

function convertFunction<A, B>(callable: (value: A) => B | PromiseLike<B>): (value: A) => Promise<OptionalType<B>>
{
	return async (value: A): Promise<OptionalType<B>> =>
	{
		const PROMISE: B | PromiseLike<B> = callable(value);

		return await convertPromise(PROMISE);
	};
}

export { convertFunction };
