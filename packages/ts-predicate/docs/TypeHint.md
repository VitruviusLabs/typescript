# TypeHint

## GetBaseType

```ts
getBaseType(value: any): string
```

Return a string depending on the type of the given value.

Possible values:

- undefined
- null
- NaN
- boolean
- number
- string
- array
- object
- function
- generator
- class

Note: generator refers to a generator function.

## GetDetailedType

```ts
getDetailedType(value: any): string
```

Return a string depending on the type of the given value.<br />
Provide more details than `GetBaseType`.

Possible values:

- undefined
- null
- NaN
- boolean (true or false)
- number (N)
- string (N characters)
- array (N items)
- anonymous object
- object anonymous class
- object ClassName
- anonymous function
- function name
- anonymous generator
- generator name
- anonymous class
- class Name

Note: generator refers to a generator function.

## GetName

```ts
getName(value: any): string|undefined
```

If given a function, generator function, method, or class, return its name.<br />
If given an object, return its constructor name.<br />
If the given value doesn't have a name, return an empty string.<br />
For any other value, return undefined.
