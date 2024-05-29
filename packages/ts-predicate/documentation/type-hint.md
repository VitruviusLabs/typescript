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
- bigint
- string
- array
- object
- function
- async function
- generator
- async generator
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
- bigint (N)
- string ("Message")
- string (N characters)
- array (N items)
- null-prototype object
- generic object
- instance of anonymous class
- instance of ClassName
- anonymous function
- anonymous async function
- function name
- async function name
- anonymous generator
- generator name
- anonymous async generator
- async generator name
- anonymous class
- class Name

Note:
- Strings with new lines, double quotes, or longer than 36 characters will be abbreviated to a character count.
- generator refers to a generator function.

## GetName

```ts
getName(value: any): string|undefined
```

If given a function, generator function, method, or class, return its name.<br />
If given an object, return its constructor name.<br />
If the given value doesn't have a name, return an empty string.<br />
For any other value, return undefined.
