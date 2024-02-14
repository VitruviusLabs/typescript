# ts-predicate

## Presentation

This lib provide a custom module loader to help write tests for modules.

It is compatible with the native nodejs test runners.

## Getting started

Choose your favourite package manager.

```bash
pnpm add @vitruvius-labs/mockingbird
```

```bash
yarn add @vitruvius-labs/mockingbird
```

```bash
npm install @vitruvius-labs/mockingbird
```

## Documentation

To run your tests, you need to enable the use of the mockingbird loader.

```bash
node --loader=mockingbird --test test1.js test2.mjs custom_test_dir/ 
```

To use a mock in your test, use the `mockingbird()` function

```ts
mockingbird<TestedModule>(
	module_identifier: string,
	meta_url: string,
	mocks: Record<string, MockedDependency>
): TestedModule;

interface MockedDependency
{
	default: unknown;
	[imported: string]: unknown;
}
```

`module_identifier` is the module you want to test. Usually provided by the relative file path to it.

`meta_url` is simply the value of `import.meta.url`. It is used to resolve paths.

`mocks` is a mapping of the module dependencies to replace and with what to replace them.

If you have aliases in your imports, you must name the imported items by original name.

The default import for a dependency can be filled under the `default` name.

## Import syntax

Unsupported syntax for imports:

```ts
import defaultExport, { export1 } from "module-name";

import defaultExport, * as name from "module-name";
```

You can replace them with these syntax:

```ts
import { default as defaultExport, export1 } from "module-name";

// "defaultExport" can be accessed with "name.default"
import * as name from "module-name";
```

## Example of use

Module file
```ts
import { randomUUID as seed } from "node:crypto";
import * as formatter from "./formatter.mjs";
import validateId from "./validateId.mjs";

function generateId(): string
{
	const ID: string = formatter.formatId(seed());

	if (!validateId(ID))
	{
		throw new Error(`Invalid ID: ${ID}`);
	}

	return ID;
}

export { generateId };
```

Test file
```ts
type TestedModule = typeof import("../src/my-module.mjs");

const MODULE: TestedModule = mockingbird<TestedModule>(
	"../src/my-module.mjs",
	import.meta.url,
	{
		"node:crypto": {
			randomUUID: (): string =>
			{
				return "fixed-uuid";
			}
		},
		"./validateId.mjs": {
			default: (): boolean =>
			{
				return true;
			}
		},
	}
);

assert.doesNotThrow((): void => { MODULE.generateId(); });
assert.strictEqual(MODULE.generateId(), "fixed-uuid");
```
