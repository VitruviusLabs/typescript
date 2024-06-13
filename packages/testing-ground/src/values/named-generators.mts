/* eslint-disable @stylistic/generator-star-spacing -- Test different spacing */
function*namedGeneratorA(): Generator<number>
{
	yield 1;
}

function* namedGeneratorB(): Generator<number>
{
	yield 1;
}

function *namedGeneratorC(): Generator<number>
{
	yield 1;
}

function * namedGeneratorD(): Generator<number>
{
	yield 1;
}
/* eslint-enable @stylistic/generator-star-spacing -- Test different spacing */

export {
	namedGeneratorA,
	namedGeneratorB,
	namedGeneratorC,
	namedGeneratorD,
};
