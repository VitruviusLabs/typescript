import { convertIntoError } from "../../helper/_index.mjs";
import type { ResultType } from "./definition/type/result.type.mjs";
import { convertValue } from "./convert-value.mjs";
import { failure } from "./failure.mjs";

async function convertPromise<A>(promise: A | Error | PromiseLike<A | Error>): Promise<ResultType<A>>
{
	try
	{
		const VALUE: A | Error = await promise;

		if (VALUE instanceof Error)
		{
			return failure(VALUE);
		}

		return convertValue(VALUE);
	}
	catch (error: unknown)
	{
		return failure(convertIntoError(error));
	}
}

export { convertPromise };
