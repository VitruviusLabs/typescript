function create(): new () => object
{
	/* eslint-disable @ts/no-empty-function -- Dummy */
	// @ts-expect-error: old notation
	return function(): void {};
	/* eslint-enable @ts/no-empty-function -- Dummy */
}

const VALUE: new () => object = create();

export { VALUE as AnonymousConstructible };
