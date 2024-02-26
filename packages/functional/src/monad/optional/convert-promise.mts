import type { OptionalType } from "./definition/type/optional.type.mjs";
import { convertValue } from "./convert-value.mjs";
import { nothing } from "./nothing.mjs";

async function convertPromise<A>(promise: A | PromiseLike<A>): Promise<OptionalType<A>>
{
	try
	{
		const VALUE: A = await promise;

		return convertValue(VALUE);
	}
	catch
	{
		return nothing();
	}
}

export { convertPromise };
