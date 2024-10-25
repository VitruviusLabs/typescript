# Architectura - Registering Endpoints

###### [Architectura](../../README.md) > [Endpoints](./readme.md) > Registering Endpoints

This section will help you get started by registering your first endpoints!

## Directory structure

We encourage you to create a directory dedicated to your endpoints (e.g. `endpoint/`).
This is not strictly necessary, but this will help you maintain a comprehensive structure.

## Step-by-step

### 1. Create your endpoint

Let's create a simple endpoint file.

```ts
import { type ExecutionContext, BaseEndpoint, HTTPMethodEnum } from "@vitruvius-labs/architectura";

class HealthCheckEndpoint extends BaseEndpoint
{
	protected readonly method: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected readonly route: string = "/health";

	public override async execute(context: ExecutionContext): Promise<void>
	{
		await context.getResponse().text("200 - OK");
	}
}

export { HealthCheckEndpoint };
```

We are taking our rudimentary healthcheck as an example again.

As you can see, this endpoint inherits from [BaseEndpoint](../../src/core/endpoint/base.endpoint.mts).
This allows Architectura to automatically detect your endpoint when you add the directory containing this file to the registry.

> [!IMPORTANT]
> Your file name need to contain `.endpoint.` to be identified by Architectura.

### 2. Registering your endpoint

Once you have created and saved your file, all you need is the following code.
```ts
import { EndpointRegistry } from "@vitruvius-labs/architectura";

await EndpointRegistry.AddEndpointsDirectory(`${import.meta.dirname}/endpoint`); // Adapt the path to your own needs!
```

It will automatically look for all available endpoints within this directory, recursively.

You can also add your endpoint manually.
```ts
EndpointRegistry.AddEndpoint(HealthCheckEndpoint);
```
