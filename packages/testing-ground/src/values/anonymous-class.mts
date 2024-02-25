function create(): new () => object
{
	// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- Dummy
	return class {};
}

const VALUE: new () => object = create();

export { VALUE as AnonymousClass };
