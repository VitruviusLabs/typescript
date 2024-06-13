function create(): new () => object
{
	/* eslint-disable @typescript/no-empty-function -- Dummy */
	// @ts-expect-error: old notation
	return function(): void {};
	/* eslint-enable @typescript/no-empty-function -- Dummy */
}

const VALUE: new () => object = create();

export { VALUE as AnonymousConstructible };
