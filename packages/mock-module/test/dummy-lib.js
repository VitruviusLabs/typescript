import { randomUUID } from "crypto";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- This is NOT Typescript.
function dummy()
{
	return randomUUID();
}

export { dummy };
