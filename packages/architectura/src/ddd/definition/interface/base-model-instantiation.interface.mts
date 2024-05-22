/**
 * Base properties needed to instantiate a new entity
 */
interface BaseModelInstantiationInterface
{
	/**
	 * @remarks
	 * If missing, a new UUID will be generated.
	 * Set it to bypass random generation if needed,
	 * or in your tests to have a predictable UUID.
	 */
	uuid?: string;
}

export type { BaseModelInstantiationInterface };
