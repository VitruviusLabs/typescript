import { DummyClass } from "./DummyClass.mjs";

import { OldDummyClass } from "./OldDummyClass.mjs";

import { BaseType } from "./types/BaseType.mjs";

import { GroupType } from "./types/GroupType.mjs";

import type { OldClassInstance } from "./types/OldClassInstance.mjs";

const DUMMY: DummyClass = new DummyClass();

const OLD_DUMMY: OldClassInstance = new OldDummyClass();

function expandTypes(types: Array<BaseType | GroupType>): Array<BaseType>
{
	const TYPES: Array<BaseType> = [];

	for (const TYPE of types)
	{
		switch (TYPE)
		{
			case GroupType.PRIMITIVE:

				TYPES.push(
					BaseType.NULLISH,
					BaseType.BOOLEAN,
					BaseType.INTEGER,
					BaseType.REAL,
					BaseType.INFINITY,
					BaseType.BIG_INT,
					BaseType.STRING
				);

				break;

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
				{},
				{ answer: 42 },
			];

		case BaseType.INSTANTIATED:

			return [
				Object.create(null),
				DUMMY,
				OLD_DUMMY,
				new (class { })(),
			];

		case BaseType.CALLABLE:

			return [
				(): void => { },
				async function (): Promise<void> { },
				DummyClass.Method,
				DummyClass.AsyncMethod,
				DUMMY.method,
				DUMMY.asyncMethod,
				OldDummyClass.AsyncMethod,
				OLD_DUMMY.asyncMethod,
			];

		case BaseType.CONSTRUCTIBLE:

			return [
				class { },
				function (): void { },
				DummyClass,
				OldDummyClass,
				OldDummyClass.Method,
				OLD_DUMMY.method,
			];
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
		BaseType.BIG_INT,
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

export
{
	BaseType,
	DummyClass,
	getInvertedValues,
	getValues,
	GroupType,
	OldDummyClass,
};
