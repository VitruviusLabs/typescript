/* eslint-disable -- Test */
class NamedClass
{
	public static async*AsyncGeneratorMethodA(): AsyncGenerator<number> { yield await Promise.resolve(1); }
	public static async* AsyncGeneratorMethodB(): AsyncGenerator<number> { yield await Promise.resolve(1); }
	public static async *AsyncGeneratorMethodC(): AsyncGenerator<number> { yield await Promise.resolve(1); }
	public static async * AsyncGeneratorMethodD(): AsyncGenerator<number> { yield await Promise.resolve(1); }
	public static async AsyncMethod(): Promise<void> {}
	public static*GeneratorMethodA(): Generator<number> { yield 1; }
	public static* GeneratorMethodB(): Generator<number> { yield 1; }
	public static *GeneratorMethodC(): Generator<number> { yield 1; }
	public static * GeneratorMethodD(): Generator<number> { yield 1; }
	public static Method(): void {}
	public async * asyncGeneratorMethod(): AsyncGenerator<number> { yield await Promise.resolve(1); }
	public async asyncMethod(): Promise<void> {}
	public * generatorMethod(): Generator<number> { yield 1; }
	public method(): void {}
}
/* eslint-enable -- Test */

export { NamedClass };
