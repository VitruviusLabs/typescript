/* eslint-disable @stylistic/generator-star-spacing -- Test different spacing */
async function*namedAsyncGeneratorA(): AsyncGenerator<number>
{
	yield await Promise.resolve(1);
}

async function* namedAsyncGeneratorB(): AsyncGenerator<number>
{
	yield await Promise.resolve(1);
}

async function *namedAsyncGeneratorC(): AsyncGenerator<number>
{
	yield await Promise.resolve(1);
}

async function * namedAsyncGeneratorD(): AsyncGenerator<number>
{
	yield await Promise.resolve(1);
}
/* eslint-enable @stylistic/generator-star-spacing -- Test different spacing */

export {
	namedAsyncGeneratorA,
	namedAsyncGeneratorB,
	namedAsyncGeneratorC,
	namedAsyncGeneratorD,
};
