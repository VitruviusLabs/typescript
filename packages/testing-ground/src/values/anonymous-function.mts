function create(): () => void
{
	// eslint-disable-next-line @ts/no-empty-function -- Dummy
	return function(): void {};
}

const VALUE: () => void = create();

export { VALUE as anonymousFunction };
