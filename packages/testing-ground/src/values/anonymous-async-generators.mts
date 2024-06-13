type G = () => AsyncGenerator<number>;

type A = [G, G, G, G];

function create(): A
{
	/* eslint-disable @stylistic/generator-star-spacing -- Test different spacing */
	return [
		async function*(): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		},
		async function* (): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		},
		async function *(): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		},
		async function * (): AsyncGenerator<number>
		{
			yield await Promise.resolve(1);
		},
	];
	/* eslint-enable @stylistic/generator-star-spacing -- Test different spacing */
}

/* eslint-disable @stylistic/array-bracket-newline -- Readability */
const [
	anonymousAsyncGeneratorA,
	anonymousAsyncGeneratorB,
	anonymousAsyncGeneratorC,
	anonymousAsyncGeneratorD,
]: A = create();
/* eslint-enable @stylistic/array-bracket-newline -- Readability */

export {
	anonymousAsyncGeneratorA,
	anonymousAsyncGeneratorB,
	anonymousAsyncGeneratorC,
	anonymousAsyncGeneratorD,
};
