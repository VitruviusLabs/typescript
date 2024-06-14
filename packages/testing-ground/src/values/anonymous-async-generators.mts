type G = () => AsyncGenerator<number>;

type A = [G, G, G, G];

function create(): A
{
	/* eslint-disable @style/generator-star-spacing -- Test different spacing */
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
	/* eslint-enable @style/generator-star-spacing -- Test different spacing */
}

/* eslint-disable @style/array-bracket-newline -- Readability */
const [
	anonymousAsyncGeneratorA,
	anonymousAsyncGeneratorB,
	anonymousAsyncGeneratorC,
	anonymousAsyncGeneratorD,
]: A = create();
/* eslint-enable @style/array-bracket-newline -- Readability */

export {
	anonymousAsyncGeneratorA,
	anonymousAsyncGeneratorB,
	anonymousAsyncGeneratorC,
	anonymousAsyncGeneratorD,
};
