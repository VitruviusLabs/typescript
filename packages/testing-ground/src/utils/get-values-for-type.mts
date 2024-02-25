/* eslint-disable */
import { BaseType } from "../definition/_index.mjs";
import * as values from "../values/_index.mjs";

function getValuesForType(type: BaseType): Array<unknown>
{
	switch (type)
	{
		case BaseType.NULLISH:
			return [undefined, null, Number.NaN];

		case BaseType.BOOLEAN:
			return [false, true];

		case BaseType.INTEGER:
			return [
				0,
				-0,
				1,
				-1,
				Number.MIN_SAFE_INTEGER + 4,
				Number.MAX_SAFE_INTEGER - 4,
			];

		case BaseType.REAL:
			return [
				Number.MIN_SAFE_INTEGER - 4,
				Number.MAX_SAFE_INTEGER + 4,
				Number.MIN_VALUE,
				-Number.MIN_VALUE,
				Number.MAX_VALUE,
				-Number.MAX_VALUE,
			];

		case BaseType.INFINITY:
			return [
				Number.POSITIVE_INFINITY,
				Number.NEGATIVE_INFINITY,
			];

		case BaseType.BIG_INT:
			return [
				BigInt(0),
				BigInt(1),
				BigInt(-1),
				BigInt(Number.MIN_SAFE_INTEGER + 4),
				BigInt(Number.MAX_SAFE_INTEGER - 4),
				BigInt(Number.MIN_SAFE_INTEGER - 4),
				BigInt(Number.MAX_SAFE_INTEGER + 4),
			];

		case BaseType.STRING:
			return [
				"",
				"42",
				"Hello, World!",
			];

		case BaseType.SYMBOL:
			return [
				Symbol(),
				Symbol(42),
				Symbol("local"),
				Symbol.for("global"),
				Symbol.iterator,
			];

		case BaseType.ARRAY:
			return [
				[],
				[1, 2, 3],
			];

		case BaseType.RECORD:
			return [
				Object.create(null),
				{},
				{ answer: 42 },
			];

		case BaseType.INSTANTIATED:
			return [
				new values.AnonymousClass(),
				new values.AnonymousConstructible(),
				new values.NamedClass(),
				new values.NamedConstructible(),
			];

		case BaseType.CALLABLE:
		{
			const namedAsyncCallable = async (): Promise<void> => {};
			const namedCallable = (): void => {};

			return [
				async (): Promise<void> => {},
				async function (): Promise<void> {},
				(): void => {},
				namedAsyncCallable,
				async function namedAsyncFunction() {},
				namedCallable,
				new (class { async asyncMethod(): Promise<void> {} })().asyncMethod,
				(class { static async AsyncMethod(): Promise<void> {} }).AsyncMethod,
				new (class { method(): void {} })().method,
				(class { static Method(): void {} }).Method,
			];
		}

		case BaseType.CONSTRUCTIBLE:
			return [
				function*(): Generator<number> { yield 1; },
				function* namedGenerator(): Generator<number> { yield 1; },
				class {},
				function (): void {},
				class NamedClass {},
				function NamedConstructible() {},
			];
	}
}

export { getValuesForType };
