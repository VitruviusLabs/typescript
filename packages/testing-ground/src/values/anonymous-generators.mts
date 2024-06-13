type G = () => Generator<number>;

type A = [G, G, G, G];

function create(): A
{
	/* eslint-disable @stylistic/generator-star-spacing -- Test different spacing */
	return [
		function*(): Generator<number>
		{
			yield 1;
		},
		function* (): Generator<number>
		{
			yield 1;
		},
		function *(): Generator<number>
		{
			yield 1;
		},
		function * (): Generator<number>
		{
			yield 1;
		},
	];
	/* eslint-enable @stylistic/generator-star-spacing -- Test different spacing */
}

/* eslint-disable @stylistic/array-bracket-newline -- Readability */
const [
	anonymousGeneratorA,
	anonymousGeneratorB,
	anonymousGeneratorC,
	anonymousGeneratorD,
]: A = create();
/* eslint-enable @stylistic/array-bracket-newline -- Readability */

export {
	anonymousGeneratorA,
	anonymousGeneratorB,
	anonymousGeneratorC,
	anonymousGeneratorD,
};
