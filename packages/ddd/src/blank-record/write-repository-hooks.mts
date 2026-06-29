import type { BlankRecord } from "./blank-record.mjs";

/* eslint-disable @ts/no-empty-function */
/* eslint-disable @ts/no-unused-vars */
/* eslint-disable @ts/class-methods-use-this */

abstract class WriteRepositoryHooks<M extends BlankRecord<M>>
{
	// @ts-expect-error -- Parameters for overrides
	public async onPreRegister(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPostRegister(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPreUpdate(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPostUpdate(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPreRestore(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPostRestore(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPreArchive(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPostArchive(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPreDestroy(instance: M): Promise<void> {}

	// @ts-expect-error -- Parameters for overrides
	public async onPostDestroy(instance: M): Promise<void> {}
}

export { WriteRepositoryHooks };
