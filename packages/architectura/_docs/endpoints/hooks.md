# Architectura - Hooks

## Introduction

Architectura let's you register hooks to enrich your endpoints with pre or post processing, and error handling.

## Execution order

The regular flow is:
- Pre hooks are run sequentially
- The endpoint is executed
- Post hooks are run sequentially

When the server catch a thrown error from either regular hooks or the endpoint, it'll run the error hooks sequentially.

## Creating a pre hook

```ts
import { BasePreHook } from "@vitruvius-labs/architectura";

class MyPreHook extends BasePreHook
{
	public override execute(context: ExecutionContext): void
	{
		// Do things here
	}
}

export { MyPreHook };
```

## Creating a post hook

```ts
import { BasePostHook } from "@vitruvius-labs/architectura";

class MyPostHook extends BasePostHook
{
	public override execute(context: ExecutionContext): void
	{
		// Do things here
	}
}

export { MyPostHook };
```

## Creating an error hook

How to create an error hook
```ts
import { BaseErrorHook } from "@vitruvius-labs/architectura";

class MyErrorHook extends BaseErrorHook
{
	public override execute(context: ExecutionContext, error: unknown): void
	{
		// Do things here
	}
}

export { MyErrorHook };
```

## Registering Hooks

There are two means of managing hooks. You can either specify hooks endpoint by endpoint, or define them globally.

### Endpoint hooks

#### Property based

You can list the hooks in the corresponding properties of your endpoint

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override readonly preHooks: Array<BasePreHook> = [new MyPreHook()];
	protected override readonly postHooks: Array<BasePostHook> = [new MyPostHook()];
	protected override readonly errorHooks: Array<BaseErrorHook> = [new MyErrorHook()];
}
```

#### Method based

If you want more flexibility, you can define the getter methods instead.

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override getPreHooks(): Array<BasePreHook>
	{
		return [new MyPreHook()];
	}

	protected override getPostHooks(): Array<BasePostHook>
	{
		return [new MyPostHook()];
	}

	protected override getErrorHooks(): Array<BaseErrorHook>
	{
		return [new MyErrorHook()];
	}
}
```

### Global hooks

#### Load from a directory

```ts
import { HookRegistry } from "@vitruvius-labs/architectura";

HookRegistry.AddHooksDirectory(`${import.meta.dirname}/hook`);
```

#### Add global hooks individually

```ts
HookRegistry.AddPreHook(MyPreHook);
HookRegistry.AddPostHook(MyPostHook);
HookRegistry.AddErrorHook(MyErrorHook);
```

#### Disable global hook for a specific endpoint

You can disable a global hook from a specific endpoint. Similarly to how you register them by either a property or a getter.

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [MyPreHook];

	protected override getExcludedGlobalPostHooks(): Array<typeof BasePostHook>
	{
		return [MyPostHook];
	}
}
```

## Predefined hooks

Architectura provide predefined hooks.

- [JWTPreHook](./authentication.md#JWTPreHook)
- [SessionPreHook](./authentication.md#SessionPreHook)
