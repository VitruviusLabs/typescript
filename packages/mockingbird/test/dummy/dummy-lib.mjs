import { randomUUID } from "node:crypto";

import { dummyDependency } from "./dummy-dependency.mjs";

import { dummyDependency as aliasedDependency } from "./dummy-dependency.mjs";

import * as dependency from "./dummy-dependency.mjs";

import defaultDependency from "./dummy-dependency.mjs";

import { default as otherDefaultDependency } from "./dummy-dependency.mjs";

function dummy1()
{
	return dummyDependency(randomUUID());
}

function dummy2()
{
	return aliasedDependency(randomUUID());
}

function dummy3()
{
	return dependency.dummyDependency(randomUUID());
}

function dummy4()
{
	return defaultDependency(randomUUID());
}

function dummy5()
{
	return otherDefaultDependency(randomUUID());
}

export { dummy1, dummy2, dummy3, dummy4, dummy5 };
