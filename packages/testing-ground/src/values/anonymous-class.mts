function create(): new () => object
{
	// eslint-disable-next-line @typescript/no-extraneous-class -- Dummy
	return class {};
}

const VALUE: new () => object = create();

export { VALUE as AnonymousClass };
