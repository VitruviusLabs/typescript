function alpha(): void { }

async function beta(): Promise<void> { }

function trapDummy(): void
{
	function TrapDummyClass(): void { }

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Test
	function* trapDummyGenerator()
	{
		yield 1;
	}

	// @ts-expect-error: old notation
	new TrapDummyClass();
	trapDummyGenerator();
}

/* eslint-disable no-restricted-syntax, @typescript-eslint/typedef, @typescript-eslint/explicit-function-return-type -- Dummy */

const ANONYMOUS_TRAP_DUMMY = (
	() =>
	{
		return function (): void
		{
			function TrapDummyClass(): void { }

			function* trapDummyGenerator()
			{
				yield 1;
			}

			// @ts-expect-error: old notation
			new TrapDummyClass();
			trapDummyGenerator();
		};
	}
)();

const ANONYMOUS_CLASS = (
	() =>
	{
		return class { };
	}
)();

const ANONYMOUS_CONSTRUCTIBLE = (
	() =>
	{
		return function (): void { };
	}
)();

const ANONYMOUS_CALLABLE = (
	() =>
	{
		return (): void => { };
	}
)();

const ANONYMOUS_ASYNC_CALLABLE = (
	() =>
	{
		return async (): Promise<void> => { };
	}
)();

const ANONYMOUS_FUNCTION = (
	() =>
	{
		return function (): void { };
	}
)();

const ANONYMOUS_ASYNC_FUNCTION = (
	() =>
	{
		return async function (): Promise<void> { };
	}
)();

const GENERATOR_A = (
	() =>
	{
		return function*()
		{
			yield 1;
		};
	}
)();

const GENERATOR_B = (
	() =>
	{
		return function* ()
		{
			yield 1;
		};
	}
)();

const GENERATOR_C = (
	() =>
	{
		return function *()
		{
			yield 1;
		};
	}
)();

const GENERATOR_D = (
	() =>
	{
		return function * ()
		{
			yield 1;
		};
	}
)();

/* eslint-enable no-restricted-syntax, @typescript-eslint/typedef, @typescript-eslint/explicit-function-return-type -- Dummy */

/* eslint-disable @typescript-eslint/explicit-function-return-type -- Generator Dummy */

function*namedGenerator1()
{
	yield 1;
}

function* namedGenerator2()
{
	yield 1;
}

function *namedGenerator3()
{
	yield 1;
}

function * namedGenerator4()
{
	yield 1;
}

/* eslint-enable @typescript-eslint/explicit-function-return-type -- Generator Dummy */

export
{
	alpha,
	ANONYMOUS_ASYNC_CALLABLE,
	ANONYMOUS_ASYNC_FUNCTION,
	ANONYMOUS_CALLABLE,
	ANONYMOUS_CLASS,
	ANONYMOUS_CONSTRUCTIBLE,
	ANONYMOUS_FUNCTION,
	ANONYMOUS_TRAP_DUMMY,
	beta,
	GENERATOR_A,
	GENERATOR_B,
	GENERATOR_C,
	GENERATOR_D,
	namedGenerator1,
	namedGenerator2,
	namedGenerator3,
	namedGenerator4,
	trapDummy
};
