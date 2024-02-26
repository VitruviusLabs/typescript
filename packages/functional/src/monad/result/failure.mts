import type { FailureInterface } from "./definition/interface/failure.interface.mjs";

function failure(value: Error): FailureInterface
{
	return {
		error: value,
	};
}

export { failure };
