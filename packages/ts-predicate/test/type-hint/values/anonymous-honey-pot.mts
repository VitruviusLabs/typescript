/* eslint-disable -- honeypot */
function create(): () => void
{
	return function(): Array<unknown>
	{
		const anonymousGeneratorTrap = function*(): Generator<number>
		{
			yield 1;
		};

		const anonymousAsyncFunctionTrap = async function(): Promise<void>
		{
			await Promise.resolve();
		}

		const anonymousAsyncGeneratorTrap = async function*(): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		}

		const AnonymousClass = class {};

		function namedFunctionTrap(): void {}

		function* namedGeneratorTrap(): Generator<number>
		{
			yield 1;
		}

		async function namedAsyncFunctionTrap(): Promise<void>
		{
			await Promise.resolve();
		}

		async function* namedAsyncGeneratorTrap(): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		}

		class NamedClass {}

		function NamedConstructibleTrap(): void {}

		return [
			anonymousGeneratorTrap,
			anonymousAsyncFunctionTrap,
			anonymousAsyncGeneratorTrap,
			AnonymousClass,
			namedFunctionTrap,
			namedGeneratorTrap,
			namedAsyncFunctionTrap,
			namedAsyncGeneratorTrap,
			NamedClass,
			NamedConstructibleTrap,
		];
	};
}
/* eslint-enable -- honeypot */

const anonymousHoneyPot: () => void = create();

export { anonymousHoneyPot };
