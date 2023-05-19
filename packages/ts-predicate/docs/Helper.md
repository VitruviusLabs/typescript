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

## normalizeErrorTree

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

## stringifyErrorTree

```ts
stringifyErrorTree(error: Error | NormalizedError): string
```

Convert an Error or a normalized error tree structure into a printable string.

An example of output:

```
The value is an object, but some properties are incorrect.
├─── The value has an extraneous property "firstNome".
├─── The value has an extraneous property "LastName".
├─── The required property "firstName" is missing.
├─── The required property "lastName" is missing.
├─── The property "birthDate" have an incorrect value.
│    └─── The value must be an instance of Date.
└─── The property "hobbies" have an incorrect value.
     └─── The value is an array, but its content is incorrect.
          └─── The value at index 1 is incorrect.
               └─── The value must be a string.
```

Useful when using `TypeAssertion` functions to print what's wrong into the console.
