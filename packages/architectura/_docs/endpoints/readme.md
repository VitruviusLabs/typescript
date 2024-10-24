# Architectura - Endpoints

###### [Architectura](../../README.md) > Endpoints

This section details the endpoints system of the Architectura framework.
Specifically this page will give you an overview of the design philosophy around endpoints.
If you want to get even more information, you can explore the sub-sections.

## Navigation

- [Documentation home](../../README.md)
- [Registering endpoints](registering_endpoints.md)

## Table of contents

- [Rationale](#rationale)
- [Endpoint structure](#endpoint-structure)
	- [Self-contained](#self-contained)
	- [Non-ambiguous](#non-ambiguous)
- [How endpoints associate with domains](#how-endpoints-associate-with-domains)

## Rationale

The most traditional approach to implementing routes tied to actions is to follow the MVC pattern.

Let's take an example of a simple e-commerce website:

```mermaid
graph TD;
	System --> CustomerController
	CustomerController --> RegisterAction
	CustomerController --> DeleteAction
	System --> CartController
	CartController --> AddProductAction
	CartController --> CheckoutAction
```

This architecture will lead to problems for multiple reasons:
- You might share code between actions within the same controller. This is not a problem on it's own; however, you might be tempted to store your central code within the controller. If you need to reuse it outside of your controller, this will create a challenge.
- Since you are limited to the scope of your controller, when the number of actions grow, you will start to face new challenges:
	- Your file will become increasingly bigger and difficult to maintain. It is likely for your file to rapidly exceed a 1 000 lines.
		- This might incite you to create a mapping of your actions to external services, increasing cognitive complexity and potentially relying on magic resolution.
	- With a growing number of actions per controller, it will become increasingly more difficult to understand what a controller handles precisely.
- Each action being tied to their controller, their route is implicit. You might not be using strictly the name of the controller as direct route. For example, `CustomerController` would be `/customer` but could also be manually mapped as `/my-customers`. This makes routing more abstract and more difficult to quickly grasp for a newly arrived or more junior developer.

Architectura rejects this approach and propose an endpoint based approach.

Let's take an example for the same e-commerce website with only endpoints (we will see an example with domains right after!):

```mermaid
	graph TD;
	System --> RegisterCustomerEndpoint
	System --> DeleteCustomerEndpoint
	System --> AddProductToCartEndpoint
	System --> CheckoutCartEndpoint
```

This software architecture is more streamlined. It allows developers to quickly understand how the code is structured.
There is a notable challenge from this architecture: With time and feature increase, the purely horizontal approach will create a hard to maintain code base. **This is where domains come to play, but we will get to that later.**

## Endpoint structure

As a reference, here is a class diagram of how any endpoint works within Architectura.

```mermaid
classDiagram
class AbstractEndpoint
AbstractEndpoint : enum method
AbstractEndpoint : string route
AbstractEndpoint : execute(context)
AbstractEndpoint <|-- MyEndpoint
class MyEndpoint
MyEndpoint : enum method
MyEndpoint : string route
MyEndpoint : execute(context)
```

### Self-contained

As we explained previously, an endpoint is self-contained in Architectura.
This means all information necessary to the understanding of a specific endpoint is contained within the file declaring the endpoint.

Let's take an example of a simple endpoint handling a rudimentary application healthcheck:


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

This structure makes the intention clear: We want to run the code within the `execute` method when the `/health` route is called with the `GET` HTTP verb. There is no magic, no ambiguity, no abstraction.

If you were to delete this endpoint, this route would be permanently removed from your application. You wouldn't need to go through a routing file, a controller file to look for the action, and so on. You just need to delete this file and you are done.

This has multiple benefits:
- It makes onboarding developers considerably faster on your application.
- It encourages you to get a more unit-based approach to your software by making you consider your endpoint as a single unit of an application rather than a derivate member of a controller.
- It helps you maintain a secure application by giving you full control over what you expose to the internet.

### Non-ambiguous

The endpoints approach reduces ambiguity within your code. Since you are not relying on resolution magic, your intent is clear. As we stated, you want to run the code within the `execute` method when the `/health` route is called with a `GET` HTTP verb.

Reducing ambiguity helps maintaining a clean code base and reduces cognitive load. It allows you to focus on the most important parts of your code base, instead of trying to understand the basics of what you are looking at.

## How endpoints associate with domains

Using purely endpoints has shortcomings. Mainly because this will eventually lead to a situation where it becomes unclear what is where.
This is why Architectura encourages you to separate your business logic among distinct domains.

Let's take the previous diagram again on how endpoints architecture looks like.

```mermaid
	graph TD;
	System --> RegisterCustomerEndpoint
	System --> DeleteCustomerEndpoint
	System --> AddProductToCartEndpoint
	System --> CheckoutCartEndpoint
```

If we were to add 5 more endpoints, this structure will look as follows.

```mermaid
	graph TD;
	System --> RegisterCustomerEndpoint
	System --> DeleteCustomerEndpoint
	System --> AddProductToCartEndpoint
	System --> CheckoutCartEndpoint
	System --> ResetPasswordEndpoint
	System --> ConfirmEmailEndpoint
	System --> RemoveProductFromCartEndpoint
	System --> AddVoucherEndpoint
	System --> RemoveVoucherEndpoint
```

It is indeed starting to look confusing, difficult to maintain, and overall not sustainable.

We are going to look at how this would look when separated within domains.

```mermaid
	graph TD;
	System --> CustomerDomain
	CustomerDomain --> RegisterCustomerEndpoint
	CustomerDomain --> DeleteCustomerEndpoint
	CustomerDomain --> ResetPasswordEndpoint
	CustomerDomain --> ConfirmEmailEndpoint
	System --> CartDomain
	CartDomain --> AddProductToCartEndpoint
	CartDomain --> CheckoutCartEndpoint
	CartDomain --> RemoveProductFromCartEndpoint
	CartDomain --> AddVoucherEndpoint
	CartDomain --> RemoveVoucherEndpoint
```

This is starting to look more structured! If we were to only use one domain level, we would simply postpone the problem we previously exposed.
This is why Architectura supports an infinite number of levels of domains.
You could improve the previous structure by adding a new domain level.


```mermaid
	graph TD;
	System --> CustomerDomain
	CustomerDomain --> AdminCustomerDomain
	CustomerDomain --> PublicCustomerDomain
	AdminCustomerDomain --> DeleteCustomerEndpoint
	PublicCustomerDomain --> RegisterCustomerEndpoint
	PublicCustomerDomain --> ResetPasswordEndpoint
	PublicCustomerDomain --> ConfirmEmailEndpoint
	System --> CartDomain
	CartDomain --> CartProductDomain
	CartDomain --> CartVoucherDomain
	CartDomain --> CartProcessDomain
	CartProductDomain --> AddProductToCartEndpoint
	CartProductDomain --> CheckoutCartEndpoint
	CartVoucherDomain --> RemoveProductFromCartEndpoint
	CartVoucherDomain --> AddVoucherEndpoint
	CartProcessDomain --> RemoveVoucherEndpoint
```

This new level of domain helps simplify your logic. It makes your intent clear for yourself and others.
