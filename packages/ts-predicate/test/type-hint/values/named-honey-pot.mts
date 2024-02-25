/* eslint-disable -- honeypot */
function namedHoneyPot(): Array<unknown>
{
	const anonymousFunctionTrap = function(): void {};

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
		anonymousFunctionTrap,
		anonymousGeneratorTrap,
		anonymousAsyncFunctionTrap,
		anonymousAsyncGeneratorTrap,
		AnonymousClass,
		namedGeneratorTrap,
		namedAsyncFunctionTrap,
		namedAsyncGeneratorTrap,
		NamedClass,
		NamedConstructibleTrap,
	];
}
/* eslint-enable -- honeypot */

export { namedHoneyPot };
