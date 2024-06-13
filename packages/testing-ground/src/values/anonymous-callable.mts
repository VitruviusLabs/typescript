function create(): () => void
{
	// eslint-disable-next-line @typescript/no-empty-function -- Dummy
	return (): void => {};
}

const VALUE: () => void = create();

export { VALUE as anonymousCallable };
