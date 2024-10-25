# Architectura

Architectura is a light-weight framework using no external dependency.
It facilitates the implementation of a Domain-Driven Design software architecture.
It provides a simple development API and blazing fast performances.

## Forewords - Read first

Architectura is an opinionated, non-intrusive framework.

### Opinionated

Architectura is opinionated because it follows and incites users to follow a Domain-Driven Design software architecture.
It is also opinionated because it is dependency-free (outside of the Vitruvius Labs ecosystem) and enforces extremely strict typing.
The opinion of the team behind Architectura is to provide a framework with premium quality standards.
Architectura also follows the SOLID principles; however, we do not believe that dependency injection is the appropriate answer to the Dependency Inversion Principle.
To that end, Architectura does not embark any dependency injection tool.

> [!IMPORTANT]
> Note regarding dependency injection.
> Whilst you can add any dependency injection third party package, we invite you to reconsider before doing so.
> Dependency injection has many downsides and pitfalls that are often brushed over. This can rapidly make the technical debt of your project spiral out of control.
> We encourage you to learn how to implement dependency inversion in a more conventional, rigorous way than rely on magic.
> Again, Architectura does not enforce this idea on you, you are still free to use any package that you consider appropriate to your project.

### Non-intrusive

Architectura is non-intrusive because you can easily onboard yourself on it and offboard.

> Customers stick with terrible, non-functional solutions because they are prisoners of it. It is a form of sunk-cost fallacy.
> \- *Nicolas "SmashingQuasar" Lebacq, co-creator of Architectura*

The objective is not to retain the user base by introducing unique patterns, a large number of dependencies or even an interlinking of services.
The objective is to convince the user base that Architectura is the right fit for their project and needs.
If they realise it wasn't due to their software needs sliding out of the scope of Architectura, they are not prisoners and can easily offboard themselves from it.

## Getting started

To get started with Architectura, you do not need much.
In fact, you need as little as this code:

```ts
import { Server } from "@vitruvius-labs/architectura";

const server: Server = await Server.Create({
	https: false,
	port: 80,
});

server.start();
```

It will create and start an HTTP server listening on port 80, but it won't do anything without endpoints.

> [!IMPORTANT]
> Architectura supports native Node.js HTTPS servers. Always use HTTPS in production.
> This example is provided as-is for simplicity. Refer to the corresponding documentation to know how to setup your server.

Architectura does minimal work when it comes to the server.
It uses the native Node.js server technology and wraps it within a unified `Server` class for simplification purposes.

## Endpoints concept

Architectura differentiate itself from other framework by the use of endpoints.
We think the MVC design pattern is often used improperly. Bloated controllers are far too common.

Architectura offers a self-contained way to express endpoints.
When you declare an endpoint, all the informations necessary to its understanding is contained in a single file.

Here is an example of an endpoint handling a rudimentary application healthcheck:

```ts
import { type ExecutionContext, HTTPMethodEnum } from "@vitruvius-labs/architectura";
import { BaseEndpoint } from "@vitruvius-labs/architectura";

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

As you can see, this endpoint is entirely self-contained.
The route is directly visible as a property of the endpoint, as well as the HTTP verb (`GET` here).
The content of the endpoint is also completely visible in one place.

> [!IMPORTANT]
> This is a rudimentary example. Always take time to factor your code accordingly.
> Do not hesitate to add new methods to endpoints to make maintaining your code easier.

The basic concept of the endpoint in Architectura, is that it will always call the `execute` method that must be asynchronous.
It will automatically map to the absolute route provided and use the corresponding HTTP verb.
By using this approach, new developers can quickly understand what they are looking out with minimal cognitive load.
It also has the benefit of making the removal of any route trivial.
This is an important part regarding application security.
Being able to safely remove a route without letting opened channels is a way to ensure you keep a clear understanding what you expose publicly.

Then you only need to add the endpoint to the endpoint registry to activate it.
It can be done before or after starting the server, but we recommend doing it before.

```ts
import { EndpointRegistry } from "@vitruvius-labs/architectura";
import { HealthCheckEndpoint } from "./endpoint/healthcheck.endpoint.mjs";

EndpointRegistry.AddEndpoint(HealthCheckEndpoint);
```

If you want to know more about endpoints within Architectura, please refer to the [Endpoints](_docs/endpoints/readme.md) documentation.

## Domains structure

Architectura articulates around the use of domains.
As with most feature within Architectura, you are not forced to use domains.
You are instead encouraged to do so to help structure your code base.

> [!IMPORTANT]
> Explaining what a domain is is out of the scope of this documentation.
> If you would like to know more about domains in the context of Domain-Driven Design, please refer to the reference book from Eric Evans called *Domain-Driven Design: Tackling Complexity in the Heart of Software*.

Domains are classes that inherit from the `BaseDomain` class. (see `src/ddd/base.domain.mts`)

This class only serves as a basic structure and will allow Architectura to detect your domains at run-time.

> [!NOTE]
> This would ideally be an interface instead of a class; however, TypeScript interfaces have no reality in JavaScript.
> To circumvent this limitation, the next most proper entity is a class.

Here is an example of a basic domain file that inherits from the `BaseDomain` class:

```ts
import { BaseDomain, EndpointRegistry } from "@vitruvius-labs/architectura";

class MyDomain extends BaseDomain
{
	public static override async Initialize(): Promise<void>
	{
		await super.Initialize();

		await EndpointRegistry.AddEndpointsDirectory(`${import.meta.dirname}/endpoint`);
	}
}

export { MyDomain };
```

On it's own, this class only load the domain endpoints in the sibling directory `endpoint`.
It may include our previous health check endpoint.

If you are familiar with NestJS, domains are somewhat similar to modules.
Within each of your domain, you should define the `Initialize` method.
This method is used to ensure you have a centralised way to access anything needed for your code for the given domain.

Let's take an example.

> [!NOTE]
> This will use an example naming convention, feel free to use any nomenclature you prefer.

If you work within a specific domain that embarks an entity called `Dog` that you will then stored inside a database.
This entity will most likely have a model called `dog.model.mts`, a factory called `dog.factory.mts` and a repository called `dog.repository.mts`.
It would make sense to create a `GetDogFactory` method on your domain to make sure the factory is accessed in a unified way everywhere within your code.

You can automate the loading of your domains.
It can be done before or after starting the server, but we recommend doing it before.
```ts
import { DomainService } from "@vitruvius-labs/architectura";

await DomainService.LoadMultipleFromRootDirectory(`${import.meta.dirname}/domain`);
```

This code will load your domains in the `domain` sibling directory.

If you want to know more about domains within Architectura specifically, please refer to the [Domains](_docs/domains/readme.md) documentation.
