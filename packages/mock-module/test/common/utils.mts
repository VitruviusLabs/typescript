/* eslint-disable max-classes-per-file -- Test */

import { BaseType } from "./BaseType.mjs";

import { DummyClass } from "./DummyClass.mjs";

import { GroupType } from "./GroupType.mjs";

import { OldDummyClass } from "./OldDummyClass.mjs";

import type { OldClassInstance } from "./OldClassInstance.mjs";

const DUMMY: DummyClass = new DummyClass();

const OLD_DUMMY: OldClassInstance = new OldDummyClass();

function expandTypes(types: Array<BaseType | GroupType>): Array<BaseType>
{
	const TYPES: Array<BaseType> = [];

	for (const TYPE of types)
	{
		switch (TYPE)
		{
			case GroupType.NUMBER:

				TYPES.push(BaseType.INTEGER, BaseType.REAL, BaseType.INFINITY);

				break;

			case GroupType.FINITE:

				TYPES.push(BaseType.INTEGER, BaseType.REAL);

				break;

			case GroupType.OBJECT:

				TYPES.push(BaseType.ARRAY, BaseType.RECORD, BaseType.INSTANTIATED);

				break;

			case GroupType.FUNCTION_CLASS:

				TYPES.push(BaseType.CALLABLE, BaseType.CONSTRUCTIBLE);

				break;

			default:

				TYPES.push(TYPE);
		}
	}

	return TYPES;
}

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
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				-1,
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				Number.MIN_SAFE_INTEGER + 4,
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				Number.MAX_SAFE_INTEGER - 4,
			];

		case BaseType.REAL:

			return [
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				Number.MIN_SAFE_INTEGER - 4,
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
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

		case BaseType.STRING:

			return [
				"",
				"42",
				"Hello, World!",
			];

		case BaseType.SYMBOL:

			return [
				// eslint-disable-next-line symbol-description -- Test
				Symbol(),
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				Symbol(42),
				Symbol("local"),
				Symbol.for("global"),
				Symbol.iterator,
			];

		case BaseType.ARRAY:

			return [
				[],
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				[1, 2, 3],
			];

		case BaseType.RECORD:

			return [
				Object.create(null),
				{},
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Test
				{ answer: 42 },
			];

		case BaseType.INSTANTIATED:

			return [
				DUMMY,
				OLD_DUMMY,
				new (class { })(),
			];

		case BaseType.CALLABLE:

			return [
				// eslint-disable-next-line @typescript-eslint/no-empty-function -- anonymous function
				(): void => { },
				// eslint-disable-next-line @typescript-eslint/no-empty-function -- anonymous function
				async function (): Promise<void> { },
				// eslint-disable-next-line @typescript-eslint/unbound-method -- static method
				DummyClass.Method,
				// eslint-disable-next-line @typescript-eslint/unbound-method -- static method
				DummyClass.AsyncMethod,
				// eslint-disable-next-line @typescript-eslint/unbound-method -- method
				DUMMY.method,
				// eslint-disable-next-line @typescript-eslint/unbound-method -- method
				DUMMY.asyncMethod,
				OldDummyClass.AsyncMethod,
				OLD_DUMMY.asyncMethod,
			];

		case BaseType.CONSTRUCTIBLE:

			return [
				class { },
				// eslint-disable-next-line @typescript-eslint/no-empty-function -- anonymous function
				function (): void { },
				DummyClass,
				OldDummyClass,
				OldDummyClass.Method,
				OLD_DUMMY.method,
			];

		default:

			throw new Error("Impossible case");
	}
}

function getValues(...included_types: Array<BaseType | GroupType>): Array<unknown>
{
	return expandTypes(included_types).flatMap(getValuesForType);
}

function getInvertedValues(...excluded_types: Array<BaseType | GroupType>): Array<unknown>
{
	const ALL_TYPES: Array<BaseType> = [
		BaseType.NULLISH,
		BaseType.BOOLEAN,
		BaseType.INTEGER,
		BaseType.REAL,
		BaseType.INFINITY,
		BaseType.STRING,
		BaseType.SYMBOL,
		BaseType.ARRAY,
		BaseType.RECORD,
		BaseType.INSTANTIATED,
		BaseType.CALLABLE,
		BaseType.CONSTRUCTIBLE,
	];

	const EXCLUDED_TYPES: Array<BaseType> = expandTypes(excluded_types);

	const INCLUDED_TYPES: Array<BaseType> = ALL_TYPES.filter(
		(type: BaseType): boolean =>
		{
			return !EXCLUDED_TYPES.includes(type);
		}
	);

	return getValues(...INCLUDED_TYPES);
}

function testError(value: unknown): true
{
	if (!(value instanceof Error))
	{
		throw new Error("Not an Error object");
	}

	if (value.message.length === 0)
	{
		throw new Error("Error message is empty");
	}

	return true;
}

export
{
	BaseType,
	DummyClass,
	getInvertedValues,
	getValues,
	GroupType,
	OldDummyClass,
	testError,
};

/* eslint-enable max-classes-per-file -- Test */
