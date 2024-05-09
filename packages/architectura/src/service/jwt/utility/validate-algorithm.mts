import { getHashes } from "node:crypto";

/** @internal */
function validateAlgorithm(algorithm: string): void
{
	if (algorithm === "none")
	{
		throw new Error("You must choose an algorithm.");
	}

	const AVAILABLE_HASHES: Array<string> = getHashes();

	if (!AVAILABLE_HASHES.includes(algorithm))
	{
		throw new Error(`Unsupported algorithm "${algorithm}", please use one of the following: "${AVAILABLE_HASHES.join('", "')}".`);
	}
}

export { validateAlgorithm };
