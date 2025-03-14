# Test

When validating a composite value, you may provide tests for its constituents.

```ts
type Test<T> =
	| (item: unknown) => asserts item is T
	| (item: unknown) => item is T
;
```

# TypeAssertion

## AssertNullish

```ts
assertNullish(value: unknown): void
```

Asserts that the value is nullish.

## AssertDefined

```ts
assertDefined(value: unknown): void
```

Asserts that the value is not nullish.

## AssertBoolean

```ts
assertBoolean(value: unknown): void
```

Asserts that the value is a boolean.

## AssertNumber

```ts
assertNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN.

## AssertInteger

```ts
assertInteger(value: unknown): void
```

Asserts that the value is a safe integer.

## AssertFiniteNumber

```ts
assertFiniteNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN nor +/-Infinity.

## AssertBigInt

```ts
assertBigInt(value: unknown): void
```

Asserts that the value is a big integer.

## AssertString

```ts
assertString(value: unknown): void
```

Asserts that the value is a string.

## AssertEnumValue

```ts
assertEnumValue(value: unknown, enum_values: Array<string|number>, enum_name?: string): void
```

Asserts that the value is among a list.

The optional parameter `enum_name` let you provide the actual enum name.

## AssertArray

```ts
assertArray(value: unknown, constraints?: ArrayConstraints | Test): void
```

Asserts that the value is an array.

The optional parameter `constraints` accept an object described as below.

```ts
interface ArrayConstraints<T>
{
	minLength?: number;
	itemTest?: Test<T>;
}
```

If `minLength` is provided, it'll asserts that the value has at least that many items.

If `itemTest` is provided, it'll asserts that the predicate hold true for every item.

## AssertPopulatedArray

```ts
assertPopulatedArray(value: unknown, constraints?: ArrayConstraints | Test): void
```

Like `assertArray`, but asserts that the array is never empty too.

## AssertRecord

```ts
assertRecord(value: unknown, constraints?: RecordConstraints | Test): void
```

Asserts that the value is a record: a direct instance of Object.

Symbol keys are ignored when validating record items.

The optional parameter `constraints` accepts an object described as below.

```ts
interface RecordConstraints<T>
{
	itemTest?: Test<T>;
}
```

If `itemTest` is provided, it'll asserts that the predicate hold true for every item.

## AssertObject

```ts
assertObject(value: unknown): void
```

Asserts that the value is an object.

## AssertInstanceOf

```ts
assertInstanceOf(value: unknown, constructor_class: ConstructorFunction): void
```

Asserts that the value is an instance of that class.

## AssertCallable

```ts
assertCallable(value: unknown): void
```

Asserts that the value is a callable.

## AssertConstructor

```ts
assertConstructor(value: unknown): void
```

Asserts that the value is a constructor.

> [!IMPORTANT]
> Because, callables and constructors are all functions,
> `assertCallable` and `assertConstructor` can lead to false positives.

## AssertAllowedKeys

```ts
assertAllowedKeys(value: object, allowed_keys: Array<string>): void
```

Asserts that the value only has allowed keys.

## AssertNullableProperty

```ts
assertNullableProperty(value: object, property: string): void
```

Asserts that the value is an object with the property defined, though it may be
nullish.

## AssertProperty

```ts
assertProperty<T>(value: object, property: string, test?: Test<T>): void
```

Asserts that the value is an object with the property defined.

## AssertStructuredData

```ts
assertStructuredData<T>(value: object, descriptor: StructuredDataDescriptor<T>, options?: StructuredDataOptions): void
```

Asserts that the value is specifically a structured data object.
The descriptor is enforced into matching the asserted type.

For each possible property, you can specify a boolean flag `optional` if the property
can be omitted and a flag `nullable` if the property value can be nullish.

Example of use

```ts
interface ICat
{
	name: string;
	birthTimestamp?: number;
	tagId: string | undefined;
}

assertStructuredData(
	value,
	{
		name: {
			test: assertString,
		},
		birthTimestamp: {
			optional: true,
			test: assertNumber,
		},
		tagId: {
			nullable: true,
			test: assertString,
		},
	},
);
```

The optional parameter `options` accepts an object described below.

```ts
interface StructuredDataOptions
{
	allowExtraneousProperties?: boolean;
}
```

If `allowExtraneousProperties` is set to `true`, it'll allow properties that are not listed in the descriptor.

## AssertUnion

```ts
assertUnion(value: unknown, tests: Array<TestFunction>): void
```

Test a value against the union of different test functions. As long as one pass, it passes.

## Unary

```ts
unary(test_function: ((value: unknown, options: Options) => void), ...parameters: Array<Options>): ((value: unknown) => void)
```

Helper function for creating closures of test functions with their configuration options.
