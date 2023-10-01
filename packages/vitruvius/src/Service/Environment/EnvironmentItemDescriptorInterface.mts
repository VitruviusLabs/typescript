/* eslint-disable @typescript-eslint/no-magic-numbers -- This is a very specific case that requires using 0 and 1 */
import type { TypeNameType } from "../../TypeScript/TypeNameType.mjs";

interface EnvironmentItemDescriptorInterface<A extends [string, unknown]>
{
	identifier: A[0];
	type: TypeNameType<A[1]>;
	defaultValue?: A[1];
}

export type { EnvironmentItemDescriptorInterface };
/* eslint-enable @typescript-eslint/no-magic-numbers -- This is a very specific case that requires using 0 and 1 */
