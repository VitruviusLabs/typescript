function create(): () => void
{
	// eslint-disable-next-line @typescript/no-empty-function -- Dummy
	return function(): void {};
}

const VALUE: () => void = create();

export { VALUE as anonymousFunction };
