function create(): new () => object
{
	// eslint-disable-next-line @ts/no-extraneous-class -- Dummy
	return class {};
}

const VALUE: new () => object = create();

export { VALUE as AnonymousClass };
