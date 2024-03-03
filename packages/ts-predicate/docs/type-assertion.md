# TypeAssertion

## isDefined

```ts
isDefined(value: unknown): void
```

Asserts that the value is not nullish.

## IsBoolean

```ts
isBoolean(value: unknown): void
```

Asserts that the value is a boolean.

## IsNumber

```ts
isNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN.

## IsInteger

```ts
isInteger(value: unknown): void
```

Asserts that the value is a safe integer.

## IsFiniteNumber

```ts
isFiniteNumber(value: unknown): void
```

Asserts that the value is a number, but not NaN nor +/-Infinity.

## IsBigInt

```ts
isBigInt(value: unknown): void
```

Asserts that the value is a big integer.

## IsString

```ts
isString(value: unknown): void
```

Asserts that the value is a string.

## IsArray

```ts
isArray(value: unknown, constraints?: ArrayConstraints | Test): void
```

Asserts that the value is an array.

The optional parameter `constraints` accept an object described as below.

```ts
interface ArrayConstraints<T>
{
	minLength?: number;
	itemTest?: Test<T>;
}

type Test<T> =
	| (item: unknown) => asserts item is T
	| (item: unknown) => item is T
;
```

If `minLength` is provided, it'll asserts that the value has at least that many items.

If `itemTest` is provided, it'll asserts that the predicate hold true for every item.

## IsPopulatedArray

```ts
isPopulatedArray(value: unknown, constraints?: ArrayConstraints | Test): void
```

Like `isArray`, but asserts that the array is never empty too.

## IsRecord

```ts
isRecord(value: unknown, constraints?: RecordConstraints | Test): void
```

Asserts that the value is a record: a direct instance of Object.

Symbol keys are ignored when validating record items.

The optional parameter `constraints` accepts an object described as below.

```ts
interface RecordConstraints<T>
{
	itemTest?: Test<T>;
}

type Test<T> =
	| (item: unknown) => asserts item is T
	| (item: unknown) => item is T
;
```

If `itemTest` is provided, it'll asserts that the predicate hold true for every item.

## IsObject

```ts
isObject(value: unknown): void
```

Asserts that the value is an object.

## IsInstanceOf

```ts
isInstanceOf(value: unknown, constructor_class: ConstructorFunction): void
```

Asserts that the value is an instance of that class.

## IsFunction

```ts
isFunction(value: unknown): void
```

Asserts that the value is a function, generator function, method, or class.

## IsCallable

```ts
isCallable(value: unknown): void
```

Asserts that the value is a function, but not a constructible one
(it cannot create an object by using `new`).

## HasAllowedKeys

```ts
hasAllowedKeys(value: object, allowed_keys: Array<string>): void
```

Asserts that the value only has allowed keys.

## HasNullableProperty

```ts
hasNullableProperty(value: object, property: string): void
```

Asserts that the value is an object with the property defined, though it may be
nullish.

## HasProperty

```ts
hasProperty(value: object, property: string): void
```

Asserts that the value is an object with the property defined.

## IsStructuredData

```ts
isStructuredData<T>(value: object, descriptor: StructuredDataDescriptor<T>, options?: StructuredDataOptions): void
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

isStructuredData(
	value,
	{
		name: {
			test: isString,
		},
		birthTimestamp: {
			optional: true,
			test: isNumber,
		},
		tagId: {
			nullable: true,
			test: isString,
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

# ValidationError

To distinguish between unexpected errors and validation errors, you can check that the caught error is an instance of `ValidationError`.

Any custom assertion must throw a `ValidationError` unless an unexpected error occurred.


# UnknownError

When a provided callable throws anything but an instance of `Error`, an instance of `UnknownError` will be created.

You can get the original thrown value from the `reason` property.
