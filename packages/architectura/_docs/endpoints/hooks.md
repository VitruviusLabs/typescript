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

There are two means of managing hooks.
You can either specify hooks endpoint by endpoint, or define them globally with the possibility of disabling them for specific endpoints.

### Instance vs constructor

You can either register a hook instance or a hook constructor.
- If you register an instance, it'll be reused each time and should likely be stateless.
- If you register a constructor, it'll be instantiated each time with no parameter.

It's safer to register them as constructors.

### Endpoint hooks

#### Property based

You can list the hooks in the corresponding properties of your endpoint

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override readonly preHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [MyPreHook];
	protected override readonly postHooks: Array<BasePostHook | ConstructorOf<BasePostHook>> = [MyPostHook];
	protected override readonly errorHooks: Array<BaseErrorHook | ConstructorOf<BaseErrorHook>> = [MyErrorHook];
}
```

#### Method based

If you want more flexibility, you can define the getter methods instead.

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override getPreHooks(): Array<BasePreHook | ConstructorOf<BasePreHook>>
	{
		return [new MyPreHook()];
	}

	protected override getPostHooks(): Array<BasePostHook | ConstructorOf<BasePostHook>>
	{
		return [new MyPostHook()];
	}

	protected override getErrorHooks(): Array<BaseErrorHook | ConstructorOf<BaseErrorHook>>
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

#### Disable global hooks for a specific endpoint

You can disable a global hook from a specific endpoint.

By property:

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override readonly excludedGlobalPreHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [MyPreHook];
	protected override readonly excludedGlobalPostHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [MyPostHook];
	protected override readonly excludedGlobalErrorHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [MyErrorHook];
}
```

By method:

```ts
class MyEndpoint extends BaseEndpoint
{
	protected override getExcludedGlobalPreHooks(): Array<BasePreHook | ConstructorOf<BasePreHook>>
	{
		return [MyPreHook];
	}

	protected override getExcludedGlobalPostHooks(): Array<BasePostHook | ConstructorOf<BasePostHook>>
	{
		return [MyPostHook];
	}

	protected override getExcludedGlobalErrorHooks(): Array<BaseErrorHook | ConstructorOf<BaseErrorHook>>
	{
		return [MyErrorHook];
	}
}
```

## Predefined hooks

Architectura provide predefined hooks.

- [JWTPreHook](./authentication.md#JWTPreHook)
- [SessionPreHook](./authentication.md#SessionPreHook)
