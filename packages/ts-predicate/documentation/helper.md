# Helper

## IsSimilar

```ts
isSimilar(a: any, b: any): boolean
```

Return true in the following cases :

- The same value has been passed as both arguments.
- Similar primitive values have been passed as arguments.
- Deeply similar arrays or records have been passed as arguments.

Otherwise, return false.

## GetConstructorOf

```ts
getConstructorOf(value: T): ConstructorOf<T>
```

Return the constructor class for the given object.

Throws if the object has no prototype or no constructor in its prototype.

Allows instantiating the returned value if it's not abstract.

## Keys

```ts
keys(value: T): Array<keyof T>
```

Return the keys of the given object typed as the keys.

It presumes that no extraneous keys were added from a child class or derived type.

## NormalizeErrorTree

```ts
normalizeErrorTree(error: Error): NormalizedError
```

Return a normalized error tree structure.

```ts
interface NormalizedError
{
	message: string;
	causes: Array<NormalizedError>;
}
```

Useful when using `TypeAssertion` functions to provide a response explaining what was wrong in the request.

`causes` is filled with the normalized errors of an `AggregateError`, or the normalized cause of an `Error` if it exists.

## StringifyErrorTree

```ts
stringifyErrorTree(error: Error | NormalizedError): string
```

Convert an `Error` or `NormalizedError` into a printable string.

An example of output:

```
The value is an object, but some properties are incorrect.
├─── The value has an extraneous property "firstNome".
├─── The value has an extraneous property "LastName".
├─── The required property "firstName" is missing.
├─── The required property "lastName" is missing.
├─── The property "birthDate" has an incorrect value.
│    └─── The value must be an instance of Date.
└─── The property "hobbies" has an incorrect value.
     └─── The value is an array, but its content is incorrect.
          └─── The value at index 1 is incorrect.
               └─── The value must be a string.
```

Useful when using `TypeAssertion` functions to print what's wrong in the console.

## ToError

```ts
toError(reason: unknown): Error
```

if the parameter `reason` is an instance of `Error` it is returned as is,
otherwise an instance of `UnknownError` is returned.

`UnknownError` extends `Error` and has a property `reason` with the original value.
